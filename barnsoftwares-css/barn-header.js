// Barn Header Navigation - Professional Multi-Million Dollar App

class BarnHeaderNavigation {
    constructor() {
        this.currentFarm = this.detectCurrentFarm();
        this.initializeHeader();
        this.initializeNavigation();
        this.initializeMobileMenu();
        this.initializeActionButtons();
        this.bindEvents();
    }

    detectCurrentFarm() {
        // Detect farm based on current page or URL parameters
        const pathname = window.location.pathname;
        if (pathname.includes('vassilakos') || pathname.includes('vas')) return 'vassilakos';
        if (pathname.includes('edg')) return 'edg';
        if (pathname.includes('apostolakos') || pathname.includes('apo')) return 'apostolakos';
        if (pathname.includes('sigma') || pathname.includes('sig')) return 'sigma';
        if (pathname.includes('dfi')) return 'dfi';
        return 'vassilakos'; // Default to Vassilakos
    }

    getFarmTheme() {
        const farmThemes = {
            vassilakos: { color: '#2563eb', name: 'Vassilakos Farm' },
            edg: { color: '#059669', name: 'EDG Farm' },
            apostolakos: { color: '#7c3aed', name: 'Apostolakos Farm' },
            sigma: { color: '#ea580c', name: 'Sigma Farm' },
            dfi: { color: '#0891b2', name: 'DFI Farm' }
        };
        return farmThemes[this.currentFarm] || farmThemes.vassilakos;
    }

    initializeHeader() {
        // Check if header already exists to prevent duplicates
        if (document.querySelector('.modern-header')) {
            return;
        }

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
                            <a href="#" class="nav-item" data-page="dailymortality.html" title="Daily Mortality">
                                <i class="fas fa-chart-line nav-icon" style="color: #dc2626"></i>
                                <span class="nav-label">Daily Mortality</span>
                            </a>
                            <a href="#" class="nav-item" data-page="highdensity.html" title="High Density">
                                <i class="fas fa-layer-group nav-icon" style="color: #e91e63"></i>
                                <span class="nav-label">High Density</span>
                            </a>
                            <a href="#" class="nav-item" data-page="vistorlog.html" title="Visitor Log">
                                <i class="fas fa-users nav-icon" style="color: #7c3aed"></i>
                                <span class="nav-label">Visitors</span>
                            </a>
                            <a href="#" class="nav-item" data-page="mortalitycard.html" title="Mortality Card">
                                <i class="fas fa-clipboard-list nav-icon" style="color: #ea580c"></i>
                                <span class="nav-label">Mortality Records</span>
                            </a>
                            <a href="#" class="nav-item" data-page="flocklog.html" title="Flock Log">
                                <i class="fas fa-feather-alt nav-icon" style="color: #059669"></i>
                                <span class="nav-label">Flock</span>
                            </a>
                            <a href="#" class="nav-item" data-page="shippingform.html" title="Shipping Log">
                                <i class="fas fa-shipping-fast nav-icon" style="color: #2563eb"></i>
                                <span class="nav-label">Shipping</span>
                            </a>
                            <a href="#" class="nav-item" data-page="startnewcrop.html" title="Start New Crop">
                                <i class="fas fa-seedling nav-icon" style="color: #0891b2"></i>
                                <span class="nav-label">New Crop</span>
                            </a>
                        </div>
                    </nav>
                    <div class="action-buttons">
                        <button class="action-btn secondary" id="saveFormButton" title="Save Changes">
                            <i class="fas fa-save"></i>
                            <span>Save</span>
                        </button>
                        <button class="action-btn primary" id="printPDFButton" title="Print as PDF" style="display: none;">
                            <i class="fas fa-file-pdf"></i>
                            <span>Print PDF</span>
                        </button>
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
                            <a href="#" class="mobile-nav-item" data-page="dailymortality.html">
                                <i class="fas fa-chart-line" style="color: #dc2626"></i>
                                <span>Daily Mortality</span>
                            </a>
                            <a href="#" class="mobile-nav-item" data-page="highdensity.html">
                                <i class="fas fa-layer-group" style="color: #e91e63"></i>
                                <span>High Density</span>
                            </a>
                            <a href="#" class="mobile-nav-item" data-page="vistorlog.html">
                                <i class="fas fa-users" style="color: #7c3aed"></i>
                                <span>Visitors</span>
                            </a>
                            <a href="#" class="mobile-nav-item" data-page="mortalitycard.html">
                                <i class="fas fa-clipboard-list" style="color: #ea580c"></i>
                                <span>Mortality Records</span>
                            </a>
                            <a href="#" class="mobile-nav-item" data-page="flocklog.html">
                                <i class="fas fa-feather-alt" style="color: #059669"></i>
                                <span>Flock</span>
                            </a>
                            <a href="#" class="mobile-nav-item" data-page="shippingform.html">
                                <i class="fas fa-shipping-fast" style="color: #2563eb"></i>
                                <span>Shipping</span>
                            </a>
                            <a href="#" class="mobile-nav-item" data-page="startnewcrop.html">
                                <i class="fas fa-seedling" style="color: #0891b2"></i>
                                <span>New Crop</span>
                            </a>
                        </div>
                        <div class="mobile-action-items">
                            <button class="mobile-action-item" id="mobileSaveButton">
                                <i class="fas fa-save"></i>
                                <span>Save</span>
                            </button>
                            <button class="mobile-action-item" id="mobilePrintButton" style="display: none;">
                                <i class="fas fa-file-pdf"></i>
                                <span>Print PDF</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `;

        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    initializeNavigation() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        this.setActiveNavigation();
    }

    initializeMobileMenu() {
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.mobileNavMenu = document.getElementById('mobileNavMenu');
        this.mobileMenuOpen = false;
    }

    initializeActionButtons() {
        this.saveButton = document.getElementById('saveFormButton');
        this.printButton = document.getElementById('printPDFButton');
        this.mobileSaveButton = document.getElementById('mobileSaveButton');
        this.mobilePrintButton = document.getElementById('mobilePrintButton');
        
        // Show print button only for specific pages
        this.updatePrintButtonVisibility();
    }

    updatePrintButtonVisibility() {
        const currentPage = window.location.pathname.split('/').pop();
        const pagesWithPrint = ['vistorlog.html', 'flocklog.html', 'mortalitycard.html', 'shippingform.html'];
        const shouldShowPrint = pagesWithPrint.includes(currentPage);
        
        if (this.printButton) {
            this.printButton.style.display = shouldShowPrint ? 'flex' : 'none';
        }
        if (this.mobilePrintButton) {
            this.mobilePrintButton.style.display = shouldShowPrint ? 'flex' : 'none';
        }
    }

    bindEvents() {
        // Navigation events
        this.navItems.forEach(item => {
            item.addEventListener('click', this.handleNavClick.bind(this));
        });
        
        this.mobileNavItems.forEach(item => {
            item.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Mobile menu events
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Action button events
        this.backButton = document.getElementById('backButton');
        this.mainMenuButton = document.getElementById('mainMenuButton');
        
        if (this.backButton) this.backButton.addEventListener('click', this.handleBack.bind(this));
        if (this.mainMenuButton) this.mainMenuButton.addEventListener('click', this.handleMainMenu.bind(this));
        if (this.saveButton) this.saveButton.addEventListener('click', this.handleSave.bind(this));
        if (this.printButton) this.printButton.addEventListener('click', this.handlePrint.bind(this));
        if (this.mobileSaveButton) this.mobileSaveButton.addEventListener('click', this.handleSave.bind(this));
        if (this.mobilePrintButton) this.mobilePrintButton.addEventListener('click', this.handlePrint.bind(this));

        // Global events
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop();
        this.navItems.forEach(item => {
            const page = item.dataset.page;
            if (page === currentPage) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    handleNavClick(event) {
        event.preventDefault();
        event.stopPropagation();

        const clickedItem = event.currentTarget;
        const page = clickedItem.dataset.page;

        // Update active states
        this.navItems.forEach(item => item.classList.remove('active'));
        clickedItem.classList.add('active');

        // Update counterpart
        const counterpart = document.querySelector(
            clickedItem.classList.contains('nav-item')
                ? `.mobile-nav-item[data-page="${page}"]`
                : `.nav-item[data-page="${page}"]`
        );
        if (counterpart) {
            counterpart.classList.add('active');
        }

        // Close mobile menu
        this.closeMobileMenu();

        // Navigate to page
        if (page) {
            this.navigateToPage(page);
        }
    }

    toggleMobileMenu() {
        const isActive = this.mobileMenuToggle.classList.contains('active');
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileMenuToggle.classList.add('active');
        this.mobileNavMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        this.mobileMenuToggle.classList.remove('active');
        this.mobileNavMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleOutsideClick(event) {
        if (this.mobileNavMenu && this.mobileMenuToggle &&
            !this.mobileNavMenu.contains(event.target) &&
            !this.mobileMenuToggle.contains(event.target) &&
            this.mobileNavMenu.classList.contains('active')) {
            this.closeMobileMenu();
        }
    }

    handleResize() {
        if (window.innerWidth > 768 && this.mobileNavMenu.classList.contains('active')) {
            this.closeMobileMenu();
        }
    }

    handleSave() {
        this.showStatusMessage('Changes saved successfully!', 'success');
    }

    handlePrint() {
        this.showStatusMessage('Printing...', 'success');
        setTimeout(() => {
            window.print();
        }, 500);
    }

    handleBack() {
        this.closeMobileMenu();
        if (window.history.length > 1) {
            window.history.back();
        } else {
            // Navigate to the main dashboard
            const currentPath = window.location.pathname;
            const basePath = currentPath.substring(0, currentPath.indexOf('/barnsoftwares'));
            window.location.href = basePath + '/flockview-app-cursor-notoffical.html';
        }
    }

    handleMainMenu() {
        this.closeMobileMenu();
        // Navigate to the main dashboard
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.indexOf('/barnsoftwares'));
        window.location.href = basePath + '/flockview-app-cursor-notoffical.html';
    }

    navigateToPage(page) {
        // Get the current directory path
        const currentPath = window.location.pathname;
        const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);

        // Construct the full path to the target page
        const targetPath = currentDir + page;

        console.log('Navigating to:', targetPath);

        // Show loading message
        this.showStatusMessage('Loading page...', 'success');

        // Navigate after a short delay to show the message
        setTimeout(() => {
            window.location.href = targetPath;
        }, 300);
    }

    showStatusMessage(message, type = 'success') {
        const statusContainer = document.querySelector('.status-messages');
        if (!statusContainer) return;

        const statusElement = document.createElement('div');
        statusElement.className = `status-message ${type}`;
        statusElement.textContent = message;

        statusContainer.appendChild(statusElement);

        setTimeout(() => {
            statusElement.classList.add('show');
        }, 100);

        setTimeout(() => {
            statusElement.classList.remove('show');
            setTimeout(() => {
                if (statusElement.parentNode) {
                    statusElement.parentNode.removeChild(statusElement);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new BarnHeaderNavigation();
    });
} else {
    new BarnHeaderNavigation();
}

// Global utility functions
window.barnUtils = {
    navigateTo: function (page) {
        // Get the current directory path
        const currentPath = window.location.pathname;
        const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
        const targetPath = currentDir + page;
        window.location.href = targetPath;
    }
}; 