/**
 * SIMPLE PDF Processor for Feed Schedules
 * 
 * This is a MUCH simpler approach that actually works:
 * 1. Extract all text from PDF
 * 2. Look for patterns that match delivery dates + weights
 * 3. Use simple regex patterns that are more reliable
 */

// Use dynamic import to avoid Vite issues
let pdfjsLib = null;

const loadPdfJs = async () => {
  if (pdfjsLib) return pdfjsLib;
  
  try {
    pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    return pdfjsLib;
  } catch (error) {
    console.error('Failed to load PDF.js:', error);
    throw error;
  }
};

export class PDFProcessor {
  /**
   * Main extraction function - SIMPLIFIED and RELIABLE
   */
  static async extractFeedScheduleData(file) {
    try {
      console.log('🔄 Starting SIMPLE PDF extraction...');
      
      const pdfLib = await loadPdfJs();
      
      // Read PDF file
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfLib.getDocument({ data: arrayBuffer }).promise;
      
      // Extract text from all pages
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';
      }
      
      console.log('📄 PDF Text extracted, length:', fullText.length);
      
      // Extract data using SIMPLE patterns
      const farm = this.extractFarm(fullText);
      const barn = this.extractBarn(fullText);
      const deliveries = this.extractDeliveries(fullText);
      
      const result = {
        farm,
        barn,
        deliveryDates: deliveries,
        extractionTimestamp: new Date().toISOString()
      };
      
      console.log('✅ SIMPLE extraction completed:', result);
      return result;
      
    } catch (error) {
      console.error('❌ PDF extraction failed:', error);
      throw new Error(`PDF processing failed: ${error.message}`);
    }
  }
  
  /**
   * Extract farm name - SIMPLE approach
   */
  static extractFarm(text) {
    const upperText = text.toUpperCase();
    
    if (upperText.includes('VAS') || upperText.includes('VASSILAKOS')) return 'VAS';
    if (upperText.includes('EDG') || upperText.includes('EDGE')) return 'EDG';
    if (upperText.includes('APO') || upperText.includes('APOSTOLAKOS')) return 'APO';
    if (upperText.includes('SIG') || upperText.includes('SIGMA')) return 'SIG';
    if (upperText.includes('DFI')) return 'DFI';
    
    return 'Unknown';
  }
  
  /**
   * Extract barn number - SIMPLE approach
   */
  static extractBarn(text) {
    const upperText = text.toUpperCase();
    
    // Look for B1, B2, B3, B4
    const barnMatch = upperText.match(/B\s*(\d+)/);
    if (barnMatch) return `B${barnMatch[1]}`;
    
    // Look for "BARN 1", "BARN 2", etc.
    const barnMatch2 = upperText.match(/BARN\s*(\d+)/);
    if (barnMatch2) return `B${barnMatch2[1]}`;
    
    return 'Unknown';
  }
  
  /**
   * Extract delivery dates and weights - SIMPLE and RELIABLE
   */
  static extractDeliveries(text) {
    const deliveries = [];
    
    console.log('🔍 Looking for delivery patterns...');
    
    // Pattern 1: MM/DD/YYYY followed by weight (most common)
    const pattern1 = /(\d{1,2}\/\d{1,2}\/\d{4})\s+(\d+(?:,\d{3})*(?:\.\d+)?)/gi;
    let match;
    
    while ((match = pattern1.exec(text)) !== null) {
      const date = match[1];
      const weight = match[2].replace(/,/g, '');
      
      if (this.isValidWeight(weight)) {
        deliveries.push({
          date: this.formatDate(date),
          weight: parseFloat(weight),
          originalText: `${date} - ${weight} KG`,
          formattedDate: this.formatDateForDisplay(date)
        });
        console.log(`✅ Found delivery: ${date} - ${weight} KG`);
      }
    }
    
    // Pattern 2: Look for "HD" feed format
    const pattern2 = /(\d+(?:,\d{3})*(?:\.\d+)?)\s+HD\s+[^\n]*?(\w{3}\s+\w{3}-\d{1,2}-\d{4})/gi;
    
    while ((match = pattern2.exec(text)) !== null) {
      const weight = match[1].replace(/,/g, '');
      const dateText = match[2];
      
      if (this.isValidWeight(weight)) {
        const formattedDate = this.formatHdDate(dateText);
        if (formattedDate) {
          deliveries.push({
            date: formattedDate,
            weight: parseFloat(weight),
            originalText: `${dateText} - ${weight} KG`,
            formattedDate: this.formatDateForDisplay(formattedDate)
          });
          console.log(`✅ Found HD delivery: ${dateText} - ${weight} KG`);
        }
      }
    }
    
    // Pattern 3: Look for any date with a large number nearby
    if (deliveries.length === 0) {
      console.log('🔍 No deliveries found, trying fallback pattern...');
      
      const datePattern = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
      while ((match = datePattern.exec(text)) !== null) {
        const date = match[1];
        
        // Look for numbers near this date (within 200 characters)
        const start = Math.max(0, match.index - 100);
        const end = Math.min(text.length, match.index + 200);
        const searchArea = text.substring(start, end);
        
        const weightMatch = searchArea.match(/(\d{3,}(?:,\d{3})*)/);
        if (weightMatch) {
          const weight = weightMatch[1].replace(/,/g, '');
          if (this.isValidWeight(weight)) {
            deliveries.push({
              date: this.formatDate(date),
              weight: parseFloat(weight),
              originalText: `${date} - ${weight} KG`,
              formattedDate: this.formatDateForDisplay(date)
            });
            console.log(`✅ Found fallback delivery: ${date} - ${weight} KG`);
          }
        }
      }
    }
    
    // Remove duplicates and sort
    const uniqueDeliveries = this.removeDuplicates(deliveries);
    const sortedDeliveries = uniqueDeliveries.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    console.log(`✅ Total deliveries found: ${sortedDeliveries.length}`);
    return sortedDeliveries;
  }
  
  /**
   * Check if weight is valid (reasonable range)
   */
  static isValidWeight(weight) {
    const num = parseFloat(weight);
    return !isNaN(num) && num >= 100 && num <= 50000; // 100 KG to 50,000 KG
  }
  
  /**
   * Format date to YYYY-MM-DD
   */
  static formatDate(dateStr) {
    try {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return dateStr;
    }
  }
  
  /**
   * Format HD date (e.g., "Mon Jul-15-2025")
   */
  static formatHdDate(dateStr) {
    try {
      // Handle "Mon Jul-15-2025" format
      const match = dateStr.match(/\w{3}\s+(\w{3})-(\d{1,2})-(\d{4})/);
      if (match) {
        const month = match[1];
        const day = match[2];
        const year = match[3];
        const date = new Date(`${month} ${day}, ${year}`);
        return date.toISOString().split('T')[0];
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  
  /**
   * Format date for display
   */
  static formatDateForDisplay(dateStr) {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  }
  
  /**
   * Remove duplicate dates
   */
  static removeDuplicates(deliveries) {
    const seen = new Set();
    return deliveries.filter(delivery => {
      if (seen.has(delivery.date)) {
        return false;
      }
      seen.add(delivery.date);
      return true;
    });
  }
  
  /**
   * Batch process multiple PDFs
   */
  static async batchProcessPDFs(files) {
    console.log(`🔄 Processing ${files.length} PDF files...`);
    
    const results = [];
    const errors = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        console.log(`📄 Processing ${i + 1}/${files.length}: ${file.name}`);
        const data = await this.extractFeedScheduleData(file);
        results.push({
          fileName: file.name,
          success: true,
          data: data
        });
      } catch (error) {
        console.error(`❌ Failed to process ${file.name}:`, error);
        errors.push({
          fileName: file.name,
          success: false,
          error: error.message
        });
      }
    }
    
    return {
      successful: results,
      failed: errors,
      totalProcessed: files.length
    };
  }
}
