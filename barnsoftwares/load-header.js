// Header Loader Script
function loadSharedHeader() {
    fetch('./test.html')
        .then(response => response.text())
        .then(html => {
            // Insert the header HTML at the beginning of the body
            document.body.insertAdjacentHTML('afterbegin', html);
            
            // Initialize header functionality after insertion
            initializeHeaderFunctionality();
            
            console.log('✅ Shared header loaded successfully!');
        })
        .catch(error => {
            console.error('❌ Error loading shared header:', error);
        });
}

function initializeHeaderFunctionality() {
    // Navigation functionality
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Mobile navigation button functionality
    const mobileBackButton = document.getElementById('mobileBackButton');
    const mobileMainMenuButton = document.getElementById('mobileMainMenuButton');
    
    if (mobileBackButton) {
        mobileBackButton.addEventListener('click', function() {
            window.location.href = '../floors-dash/v-floor-b1.html';
        });
    }

    if (mobileMainMenuButton) {
        mobileMainMenuButton.addEventListener('click', function() {
            window.location.href = '../index.html';
        });
    }

    // Navigation functionality for all nav buttons
    window.navigateToPage = function(filename) {
        console.log(`Navigating to: ${filename}`);
        window.location.href = filename;
    };
}

// Load header when page is ready
function waitForPageReady() {
    if (document.body) {
        loadSharedHeader();
    } else {
        setTimeout(waitForPageReady, 10);
    }
}

// Start loading process
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForPageReady);
} else {
    waitForPageReady();
}

