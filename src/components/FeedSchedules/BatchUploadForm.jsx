/**
 * Batch Upload Form Component
 * 
 * Simple upload form for demonstration purposes
 */

import React, { useState } from 'react';
import { DataManager } from '../../services/dataManager';
import { PDFProcessor } from '../../services/pdfProcessor';
import './BatchUploadForm.css';

export const BatchUploadForm = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState('');

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    setErrors([]);
    setUploadSuccess('');

    try {
      console.log(`🔄 Starting upload of ${files.length} files...`);
      
      // Process each file
      const processedFiles = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(((i + 1) / files.length) * 100);
        
        try {
          console.log(`📄 Processing ${file.name}...`);
          const extractedData = await PDFProcessor.extractFeedScheduleData(file);
          
          // Validate the extracted data
          if (extractedData.farm === 'Unknown') {
            throw new Error('Could not identify farm name');
          }
          if (extractedData.barn === 'Unknown') {
            throw new Error('Could not identify barn number');
          }
          if (extractedData.deliveryDates.length === 0) {
            throw new Error('No delivery dates found');
          }
          
          processedFiles.push({
            file: file,
            data: extractedData
          });
          
          console.log(`✅ Processed ${file.name}:`, extractedData);
          
        } catch (error) {
          console.error(`❌ Failed to process ${file.name}:`, error);
          setErrors(prev => [...prev, `${file.name}: ${error.message}`]);
        }
      }

      // Save all processed files
      if (processedFiles.length > 0) {
        console.log(`💾 Saving ${processedFiles.length} processed files...`);
        const saveResult = await DataManager.batchSaveFeedSchedules(processedFiles);
        
        console.log('✅ Save result:', saveResult);
        
        if (saveResult.successful.length > 0) {
          setUploadSuccess(`Successfully uploaded ${saveResult.successful.length} files!`);
          setFiles([]);
          setErrors([]);
          
          // Call success callback
          if (onUploadSuccess) {
            onUploadSuccess();
          }
        }
        
        if (saveResult.failed.length > 0) {
          const failedErrors = saveResult.failed.map(f => `${f.fileName}: ${f.error}`);
          setErrors(prev => [...prev, ...failedErrors]);
        }
      }

    } catch (error) {
      console.error('❌ Upload failed:', error);
      setErrors(prev => [...prev, `Upload failed: ${error.message}`]);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="batch-upload-form">
      <div className="upload-area">
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileSelect}
          disabled={uploading}
          className="file-input"
          id="file-input"
        />
        <label htmlFor="file-input" className="file-input-label">
          <div className="upload-icon">📁</div>
          <div className="upload-text">
            <strong>Click to select PDF files</strong>
            <span>or drag and drop multiple files here</span>
          </div>
        </label>
      </div>

      {files.length > 0 && (
        <div className="selected-files">
          <h3>Selected Files ({files.length})</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Processing... {Math.round(uploadProgress)}%
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className="btn btn-primary btn-block"
      >
        {uploading ? 'Uploading...' : 'Upload Schedules'}
      </button>

      {uploadSuccess && (
        <div className="success-message">
          <p>✅ {uploadSuccess}</p>
        </div>
      )}

      {errors.length > 0 && (
        <div className="error-messages">
          <h4>❌ Errors:</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="upload-info">
        <p>✅ The system will automatically extract:</p>
        <ul>
          <li>Farm names (VAS, EDG, APO, SIG, DFI)</li>
          <li>Barn numbers (B1, B2, B3, B4)</li>
          <li>Delivery dates</li>
          <li>Weights (in KG)</li>
        </ul>
      </div>
    </div>
  );
};
