// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Main application initialization
 */
const initializeApp = () => {
    setupNavigation();
    setupTabs();
    setupModals();
    setupFormHandlers();
    setupRealTimeUpdates();
    setupMobileOptimization();
};

/**
 * Navigation handling
 */
const setupNavigation = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target section
            showSection(targetSection);
        });
    });
};

/**
 * Show specific section
 */
const showSection = (sectionId) => {
    const sections = document.querySelectorAll('.app-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
};

/**
 * Tab functionality
 */
const setupTabs = () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
};

/**
 * Modal functionality
 */
const setupModals = () => {
    const modalOverlay = document.getElementById('modal-overlay');
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
};

/**
 * Open modal with content
 */
const openModal = (title, content) => {
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalOverlay = document.getElementById('modal-overlay');
    
    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modalOverlay.classList.add('active');
    
    // Focus first input
    const firstInput = modalContent.querySelector('input, select, textarea');
    if (firstInput) {
        firstInput.focus();
    }
};

/**
 * Close modal
 */
const closeModal = () => {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.classList.remove('active');
};

/**
 * Form handlers
 */
const setupFormHandlers = () => {
    // Task checkboxes
    document.querySelectorAll('.task-checkbox input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (e.target.checked) {
                taskItem.style.opacity = '0.6';
                taskItem.style.textDecoration = 'line-through';
            } else {
                taskItem.style.opacity = '1';
                taskItem.style.textDecoration = 'none';
            }
        });
    });
};

/**
 * Real-time updates
 */
const setupRealTimeUpdates = () => {
    // Simulate real-time data updates
    setInterval(() => {
        updateEnvironmentalData();
    }, 30000); // Update every 30 seconds
};

/**
 * Update environmental data
 */
const updateEnvironmentalData = () => {
    // Simulate sensor readings
    const barns = ['barn-a', 'barn-b', 'barn-c', 'barn-d'];
    barns.forEach(barnId => {
        const tempElement = document.querySelector(`[data-barn="${barnId}"] .temperature`);
        const humidityElement = document.querySelector(`[data-barn="${barnId}"] .humidity`);
        
        if (tempElement && humidityElement) {
            // Simulate small variations
            const currentTemp = parseFloat(tempElement.textContent);
            const currentHumidity = parseFloat(humidityElement.textContent);
            
            const tempVariation = (Math.random() - 0.5) * 2; // ±1°C
            const humidityVariation = (Math.random() - 0.5) * 4; // ±2%
            
            tempElement.textContent = (currentTemp + tempVariation).toFixed(1) + '°C';
            humidityElement.textContent = Math.max(0, Math.min(100, currentHumidity + humidityVariation)).toFixed(0) + '%';
        }
    });
};

/**
 * Mobile optimization
 */
const setupMobileOptimization = () => {
    // Add touch support for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Handle mobile navigation
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768) {
        navMenu.classList.add('mobile-nav');
    }
};

// Flock Management Functions
const addNewFlock = () => {
    const modalContent = `
        <form id="new-flock-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="flock-id">Flock ID</label>
                    <input type="text" id="flock-id" name="flock-id" required>
                </div>
                <div class="form-group">
                    <label for="barn-assignment">Barn Assignment</label>
                    <select id="barn-assignment" name="barn-assignment" required>
                        <option value="">Select Barn</option>
                        <option value="barn-a">Barn A</option>
                        <option value="barn-b">Barn B</option>
                        <option value="barn-c">Barn C</option>
                        <option value="barn-d">Barn D</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="start-date">Start Date</label>
                    <input type="date" id="start-date" name="start-date" required>
                </div>
                <div class="form-group">
                    <label for="bird-count">Number of Birds</label>
                    <input type="number" id="bird-count" name="bird-count" min="1" required>
                </div>
            </div>
            <div class="form-group">
                <label for="breed-type">Breed Type</label>
                <select id="breed-type" name="breed-type" required>
                    <option value="">Select Breed</option>
                    <option value="laying-hens">Laying Hens</option>
                    <option value="broilers">Broilers</option>
                    <option value="breeders">Breeders</option>
                </select>
            </div>
            <div class="form-group">
                <label for="notes">Notes</label>
                <textarea id="notes" name="notes" rows="3"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Create Flock</button>
            </div>
        </form>
    `;
    
    openModal('Add New Flock', modalContent);
    
    // Handle form submission
    document.getElementById('new-flock-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log('New flock data:', Object.fromEntries(formData));
        closeModal();
        showToast('Flock created successfully!', 'success');
    });
};

const viewFlock = (flockId) => {
    const modalContent = `
        <div class="flock-details">
            <h4>Flock ${flockId} Details</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="label">Barn:</span>
                    <span class="value">Barn A</span>
                </div>
                <div class="detail-item">
                    <span class="label">Start Date:</span>
                    <span class="value">Jan 15, 2024</span>
                </div>
                <div class="detail-item">
                    <span class="label">Age:</span>
                    <span class="value">28 days</span>
                </div>
                <div class="detail-item">
                    <span class="label">Birds:</span>
                    <span class="value">5,000</span>
                </div>
                <div class="detail-item">
                    <span class="label">Mortality Rate:</span>
                    <span class="value">0.06%</span>
                </div>
                <div class="detail-item">
                    <span class="label">Feed Consumption:</span>
                    <span class="value">450 kg/day</span>
                </div>
            </div>
            <div class="form-actions">
                <button class="btn btn-primary" onclick="printFlockReport('${flockId}')">
                    <i class="fas fa-print"></i> Print Report
                </button>
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    openModal(`Flock ${flockId} Details`, modalContent);
};

const editFlock = (flockId) => {
    // Similar to addNewFlock but with pre-filled data
    showToast('Edit functionality coming soon!', 'info');
};

// Record Management Functions
const addMortalityRecord = () => {
    const modalContent = `
        <form id="mortality-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="mortality-date">Date</label>
                    <input type="date" id="mortality-date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="mortality-flock">Flock ID</label>
                    <select id="mortality-flock" name="flock-id" required>
                        <option value="">Select Flock</option>
                        <option value="2024-001">2024-001</option>
                        <option value="2024-002">2024-002</option>
                        <option value="2024-003">2024-003</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="birds-found">Birds Found</label>
                    <input type="number" id="birds-found" name="birds-found" min="0" required>
                </div>
                <div class="form-group">
                    <label for="mortality-reason">Reason</label>
                    <select id="mortality-reason" name="reason" required>
                        <option value="">Select Reason</option>
                        <option value="natural">Natural causes</option>
                        <option value="disease">Disease</option>
                        <option value="injury">Injury</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="mortality-notes">Notes</label>
                <textarea id="mortality-notes" name="notes" rows="3"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Record</button>
            </div>
        </form>
    `;
    
    openModal('Add Mortality Record', modalContent);
    
    document.getElementById('mortality-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log('Mortality record:', Object.fromEntries(formData));
        closeModal();
        showToast('Mortality record added successfully!', 'success');
    });
};

const addFlockLogEntry = () => {
    const modalContent = `
        <form id="flock-log-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="log-date">Date</label>
                    <input type="date" id="log-date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="log-flock">Flock ID</label>
                    <select id="log-flock" name="flock-id" required>
                        <option value="">Select Flock</option>
                        <option value="2024-001">2024-001</option>
                        <option value="2024-002">2024-002</option>
                        <option value="2024-003">2024-003</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="feed-consumption">Feed Consumption (kg)</label>
                    <input type="number" id="feed-consumption" name="feed-consumption" min="0" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="water-consumption">Water Consumption (L)</label>
                    <input type="number" id="water-consumption" name="water-consumption" min="0" required>
                </div>
            </div>
            <div class="form-group">
                <label for="egg-production">Egg Production</label>
                <input type="number" id="egg-production" name="egg-production" min="0">
            </div>
            <div class="form-group">
                <label for="log-notes">Notes</label>
                <textarea id="log-notes" name="notes" rows="3"></textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Entry</button>
            </div>
        </form>
    `;
    
    openModal('Add Flock Log Entry', modalContent);
    
    document.getElementById('flock-log-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log('Flock log entry:', Object.fromEntries(formData));
        closeModal();
        showToast('Log entry added successfully!', 'success');
    });
};

const addVisitorRecord = () => {
    const modalContent = `
        <form id="visitor-form">
            <div class="form-row">
                <div class="form-group">
                    <label for="visitor-name">Visitor Name</label>
                    <input type="text" id="visitor-name" name="visitor-name" required>
                </div>
                <div class="form-group">
                    <label for="visitor-company">Company</label>
                    <input type="text" id="visitor-company" name="company">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="visit-date">Date</label>
                    <input type="date" id="visit-date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="visit-purpose">Purpose</label>
                    <select id="visit-purpose" name="purpose" required>
                        <option value="">Select Purpose</option>
                        <option value="inspection">Health Inspection</option>
                        <option value="maintenance">Equipment Maintenance</option>
                        <option value="delivery">Feed/Supply Delivery</option>
                        <option value="consultation">Consultation</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="time-in">Time In</label>
                    <input type="time" id="time-in" name="time-in" required>
                </div>
                <div class="form-group">
                    <label for="time-out">Time Out</label>
                    <input type="time" id="time-out" name="time-out">
                </div>
            </div>
            <div class="form-group">
                <label for="barns-visited">Barns Visited</label>
                <div class="checkbox-group">
                    <label><input type="checkbox" name="barns" value="barn-a"> Barn A</label>
                    <label><input type="checkbox" name="barns" value="barn-b"> Barn B</label>
                    <label><input type="checkbox" name="barns" value="barn-c"> Barn C</label>
                    <label><input type="checkbox" name="barns" value="barn-d"> Barn D</label>
                </div>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Record</button>
            </div>
        </form>
    `;
    
    openModal('Add Visitor Record', modalContent);
    
    document.getElementById('visitor-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log('Visitor record:', Object.fromEntries(formData));
        closeModal();
        showToast('Visitor record added successfully!', 'success');
    });
};

// Report Generation Functions
const generateFlockReport = () => {
    showToast('Generating flock report...', 'info');
    
    // Simulate report generation
    setTimeout(() => {
        const reportContent = generateReportHTML('Flock Performance Report');
        printReport(reportContent);
        showToast('Report generated successfully!', 'success');
    }, 2000);
};

const generateEnvironmentalReport = () => {
    showToast('Generating environmental report...', 'info');
    
    setTimeout(() => {
        const reportContent = generateReportHTML('Environmental Monitoring Report');
        printReport(reportContent);
        showToast('Report generated successfully!', 'success');
    }, 2000);
};

const generateFeedReport = () => {
    showToast('Generating feed report...', 'info');
    
    setTimeout(() => {
        const reportContent = generateReportHTML('Feed Consumption Report');
        printReport(reportContent);
        showToast('Report generated successfully!', 'success');
    }, 2000);
};

const generateComplianceReport = () => {
    showToast('Generating compliance report...', 'info');
    
    setTimeout(() => {
        const reportContent = generateReportHTML('Ontario Farming Compliance Report');
        printReport(reportContent);
        showToast('Report generated successfully!', 'success');
    }, 2000);
};

const printFlockReport = (flockId) => {
    showToast(`Generating report for Flock ${flockId}...`, 'info');
    
    setTimeout(() => {
        const reportContent = generateReportHTML(`Flock ${flockId} Report`);
        printReport(reportContent);
        showToast('Report generated successfully!', 'success');
    }, 2000);
};

// Utility Functions
const generateReportHTML = (title) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #2563eb; text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
                ${title}
            </h1>
            <div style="margin: 20px 0;">
                <p><strong>Farm:</strong> Smith Family Farm</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                <p><strong>Generated by:</strong> John Smith</p>
            </div>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Summary</h3>
                <p>This report contains comprehensive data about farm operations, including flock performance, environmental conditions, and compliance metrics.</p>
            </div>
            <div style="margin: 20px 0;">
                <h3>Key Metrics</h3>
                <ul>
                    <li>Total Active Flocks: 3</li>
                    <li>Average Temperature: 22.5°C</li>
                    <li>Average Humidity: 65%</li>
                    <li>Total Birds: 15,000</li>
                </ul>
            </div>
            <div style="margin: 20px 0;">
                <h3>Compliance Status</h3>
                <p style="color: #10b981;">✓ All requirements met</p>
                <p>This farm complies with Ontario farming regulations and standards.</p>
            </div>
        </div>
    `;
};

const printReport = (content) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>FlockView Report</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                    @media print { body { padding: 0; } }
                </style>
            </head>
            <body>
                ${content}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
};

const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
};

// Additional utility functions
const addTask = () => {
    showToast('Task functionality coming soon!', 'info');
};

const addEnvironmentalRecord = () => {
    showToast('Environmental record functionality coming soon!', 'info');
};

const addFeedRecord = () => {
    showToast('Feed record functionality coming soon!', 'info');
};

const addMedicationRecord = () => {
    showToast('Medication record functionality coming soon!', 'info');
};

const editRecord = (type, id) => {
    showToast(`Edit ${type} record ${id} functionality coming soon!`, 'info');
};

const viewBarnDetails = (barnId) => {
    showToast(`View ${barnId} details functionality coming soon!`, 'info');
};

const recordEnvironmentalData = (barnId) => {
    showToast(`Record environmental data for ${barnId} functionality coming soon!`, 'info');
};

const startNewFlock = (barnId) => {
    showToast(`Start new flock in ${barnId} functionality coming soon!`, 'info');
};

// Export functions for global access
window.FlockViewApp = {
    addNewFlock,
    viewFlock,
    editFlock,
    addMortalityRecord,
    addFlockLogEntry,
    addVisitorRecord,
    generateFlockReport,
    generateEnvironmentalReport,
    generateFeedReport,
    generateComplianceReport,
    printFlockReport,
    addTask,
    addEnvironmentalRecord,
    addFeedRecord,
    addMedicationRecord,
    editRecord,
    viewBarnDetails,
    recordEnvironmentalData,
    startNewFlock,
    openModal,
    closeModal,
    showToast
}; 