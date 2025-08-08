// Barn Software Header Navigation Script

class BarnHeaderNavigation {
    constructor() {
        this.initializeHeader();
        this.initializeNavigation();
        this.initializeMobileMenu();
        this.initializeActionButtons();
        this.bindEvents();
    }

    initializeHeader() {
        // Check if header already exists to prevent double headers
        if (document.querySelector('.modern-header')) {
            console.log('Header already exists, skipping initialization');
            return;
        }

        // Get current page to determine if print button should be hidden
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const hidePrintPages = ['startnewcrop.html', 'dailymortality.html'];
        const shouldHidePrint = hidePrintPages.includes(currentPage);

        // Create header HTML structure
        const headerHTML = `
            <header class="modern-header">
                <div class="header-container">
                    <div class="logo-section">
                        <button class="nav-btn" id="backButton" title="Go Back">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <button class="nav-btn" id="mainMenuButton" title="Main Menu">
                            <i class="fas fa-home"></i>
                        </button>
                        <img src="rosefarm.JPG" alt="Rose Farm Management" class="main-logo-img">
                    </div>
                    <nav class="nav-container">
                        <div class="nav-links">
                            <a href="dailymortality.html" class="nav-item" data-page="dailymortality.html" title="Daily Mortality">
                                <i class="fas fa-chart-line nav-icon"></i>
                                <span class="nav-label">Daily Mortality</span>
                            </a>
                            <a href="vistorlog.html" class="nav-item" data-page="vistorlog.html" title="Visitor Log">
                                <i class="fas fa-users nav-icon"></i>
                                <span class="nav-label">Visitors</span>
                            </a>
                            <a href="mortalitycard.html" class="nav-item" data-page="mortalitycard.html" title="Mortality Card">
                                <i class="fas fa-clipboard-list nav-icon"></i>
                                <span class="nav-label">Mortality Records</span>
                            </a>
                            <a href="flocklog.html" class="nav-item" data-page="flocklog.html" title="Flock Log">
                                <i class="fas fa-feather-alt nav-icon"></i>
                                <span class="nav-label">Flock</span>
                            </a>
                            <a href="shippingform.html" class="nav-item" data-page="shippingform.html" title="Shipping Form">
                                <i class="fas fa-shipping-fast nav-icon"></i>
                                <span class="nav-label">Shipping</span>
                            </a>
                            <a href="startnewcrop.html" class="nav-item" data-page="startnewcrop.html" title="Start New Crop">
                                <i class="fas fa-seedling nav-icon"></i>
                                <span class="nav-label">New Crop</span>
                            </a>
                        </div>
                    </nav>
                    <div class="action-buttons">
                        <button class="action-btn secondary" id="saveFormButton" title="Save Changes">
                            <i class="fas fa-save"></i>
                            <span>Save</span>
                        </button>
                        ${shouldHidePrint ? '' : `
                        <button class="action-btn primary" id="printPDFButton" title="Print as PDF">
                            <i class="fas fa-file-pdf"></i>
                            <span>Print PDF</span>
                        </button>
                        `}
                    </div>
                    <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle mobile menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div class="mobile-nav-menu" id="mobileNavMenu">
                    <div class="mobile-nav-content">
                        <div class="mobile-nav-links">
                            <a href="dailymortality.html" class="mobile-nav-item" data-page="dailymortality.html">
                                <i class="fas fa-chart-line"></i>
                                <span>Daily Mortality</span>
                            </a>
                            <a href="vistorlog.html" class="mobile-nav-item" data-page="vistorlog.html">
                                <i class="fas fa-users"></i>
                                <span>Visitors</span>
                            </a>
                            <a href="mortalitycard.html" class="mobile-nav-item" data-page="mortalitycard.html">
                                <i class="fas fa-clipboard-list"></i>
                                <span>Mortality Records</span>
                            </a>
                            <a href="flocklog.html" class="mobile-nav-item" data-page="flocklog.html">
                                <i class="fas fa-feather-alt"></i>
                                <span>Flock</span>
                            </a>
                            <a href="shippingform.html" class="mobile-nav-item" data-page="shippingform.html">
                                <i class="fas fa-shipping-fast"></i>
                                <span>Shipping</span>
                            </a>
                            <a href="startnewcrop.html" class="mobile-nav-item" data-page="startnewcrop.html">
                                <i class="fas fa-seedling"></i>
                                <span>New Crop</span>
                            </a>
                        </div>
                        <div class="mobile-actions">
                            <button class="mobile-action-item" id="mobileSaveButton">
                                <i class="fas fa-save"></i>
                                <span>Save Changes</span>
                            </button>
                            ${shouldHidePrint ? '' : `
                            <button class="mobile-action-item" id="mobilePrintButton">
                                <i class="fas fa-file-pdf"></i>
                                <span>Print PDF</span>
                            </button>
                            `}
                        </div>
                    </div>
                </div>
            </header>
            <div class="status-messages">
                <div id="saveStatus" class="status-message"></div>
                <div id="resetStatus" class="status-message"></div>
            </div>
        `;

        // Insert header at the beginning of the body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);

        // Set active nav item based on current page
        this.setActiveNavigation();
    }

    setActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');

        navItems.forEach(item => {
            const dataPage = item.getAttribute('data-page');
            if (dataPage === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    initializeNavigation() {
        this.navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
        this.navItems.forEach(item => {
            item.addEventListener('click', this.handleNavClick.bind(this));
        });
    }

    initializeMobileMenu() {
        this.mobileToggle = document.getElementById('mobileMenuToggle');
        this.mobileMenu = document.getElementById('mobileNavMenu');

        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }
    }

    initializeActionButtons() {
        this.backButton = document.getElementById('backButton');
        this.mainMenuButton = document.getElementById('mainMenuButton');
        this.saveButton = document.getElementById('saveFormButton');
        this.printButton = document.getElementById('printPDFButton');
        this.mobileSaveButton = document.getElementById('mobileSaveButton');
        this.mobilePrintButton = document.getElementById('mobilePrintButton');

        if (this.backButton) this.backButton.addEventListener('click', this.handleBack.bind(this));
        if (this.mainMenuButton) this.mainMenuButton.addEventListener('click', this.handleMainMenu.bind(this));
        if (this.saveButton) this.saveButton.addEventListener('click', this.handleSave.bind(this));
        if (this.printButton) this.printButton.addEventListener('click', this.handlePrint.bind(this));
        if (this.mobileSaveButton) this.mobileSaveButton.addEventListener('click', this.handleSave.bind(this));
        if (this.mobilePrintButton) this.mobilePrintButton.addEventListener('click', this.handlePrint.bind(this));
    }

    bindEvents() {
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleNavClick(event) {
        event.preventDefault();

        const clickedItem = event.currentTarget;
        const targetPage = clickedItem.getAttribute('data-page');

        if (targetPage) {
            // Update active state
            this.navItems.forEach(item => item.classList.remove('active'));
            clickedItem.classList.add('active');

            // Navigate to page
            window.location.href = targetPage;
        }
    }

    toggleMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle('active');

            // Toggle hamburger animation
            const spans = this.mobileToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (this.mobileMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        }
    }

    handleOutsideClick(event) {
        if (this.mobileMenu && this.mobileMenu.classList.contains('active')) {
            if (!this.mobileMenu.contains(event.target) && !this.mobileToggle.contains(event.target)) {
                this.toggleMobileMenu();
            }
        }
    }

    handleResize() {
        if (window.innerWidth > 768 && this.mobileMenu) {
            this.mobileMenu.classList.remove('active');
            const spans = this.mobileToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    }

    handleBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '../index.html';
        }
    }

    handleMainMenu() {
        window.location.href = '../index.html';
    }

    handleSave() {
        // Trigger save functionality if it exists
        if (typeof window.saveData === 'function') {
            window.saveData();
        } else {
            this.showStatusMessage('Save functionality not implemented for this page', 'warning');
        }
    }

    handlePrint() {
        // Trigger print functionality if it exists
        if (typeof window.printPDF === 'function') {
            window.printPDF();
        } else {
            window.print();
        }
    }

    showStatusMessage(message, type = 'success') {
        const statusElement = document.getElementById('saveStatus');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `status-message ${type}`;
            statusElement.style.display = 'block';

            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 3000);
        }
    }
}

// Initialize header when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    new BarnHeaderNavigation();
});

// Add Font Awesome CDN if not already present
if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);
}

// Utility functions for common operations
window.barnUtils = {
    showSuccess: function (message) {
        if (window.barnHeader) {
            window.barnHeader.showStatusMessage(message, 'success');
        }
    },

    showError: function (message) {
        if (window.barnHeader) {
            window.barnHeader.showStatusMessage(message, 'error');
        }
    },

    showWarning: function (message) {
        if (window.barnHeader) {
            window.barnHeader.showStatusMessage(message, 'warning');
        }
    },

    navigateTo: function (page) {
        window.location.href = page;
    }
}; 