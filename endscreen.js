// endscreen.js - Automatic Group Carousel with Manual Override

let currentGroupIndex = 0;
let autoPlayInterval = null;
const AUTO_PLAY_DELAY = 8000; // 8 seconds per group

let groups = [];
let indicators = [];

/**
 * Initialize the carousel
 */
function initCarousel() {
    // Get elements after DOM is loaded
    groups = [
        document.getElementById('group-transicion'),
        document.getElementById('group-quinto')
    ];

    indicators = document.querySelectorAll('.indicator');

    // Verify elements exist
    if (!groups[0] || !groups[1]) {
        console.error('Groups not found!', groups);
        return false;
    }

    if (indicators.length === 0) {
        console.error('Indicators not found!');
        return false;
    }

    console.log('Carousel initialized successfully', groups);

    // Set up indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('Indicator clicked:', index);
            showGroup(index);
            resetAutoPlay();
        });
    });

    // Make sure first group is visible
    showGroup(0);

    return true;
}

/**
 * Show a specific group by index
 */
function showGroup(index) {
    console.log('Showing group:', index);
    
    // Update current index
    currentGroupIndex = index;
    
    // Hide all groups
    groups.forEach(group => {
        if (group) {
            group.classList.remove('active');
        }
    });
    
    // Show the selected group
    if (groups[index]) {
        groups[index].classList.add('active');
        console.log('Group activated:', groups[index].id);
    }
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        if (i === index) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

/**
 * Go to next group
 */
function nextGroup() {
    console.log('Next group from:', currentGroupIndex);
    const nextIndex = (currentGroupIndex + 1) % groups.length;
    showGroup(nextIndex);
    resetAutoPlay();
}

/**
 * Go to previous group
 */
function previousGroup() {
    console.log('Previous group from:', currentGroupIndex);
    const prevIndex = (currentGroupIndex - 1 + groups.length) % groups.length;
    showGroup(prevIndex);
    resetAutoPlay();
}

/**
 * Start automatic slideshow
 */
function startAutoPlay() {
    console.log('Starting autoplay');
    autoPlayInterval = setInterval(() => {
        console.log('Autoplay tick');
        nextGroup();
    }, AUTO_PLAY_DELAY);
}

/**
 * Reset automatic slideshow (restart timer)
 */
function resetAutoPlay() {
    console.log('Resetting autoplay');
    // Clear existing interval
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
    // Start new interval
    startAutoPlay();
}

/**
 * Stop automatic slideshow
 */
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    // Check if carousel is initialized
    if (!groups || groups.length === 0) {
        console.log('Carousel not initialized yet');
        return;
    }
    
    if (event.key === 'ArrowRight') {
        console.log('Arrow Right pressed');
        event.preventDefault();
        event.stopPropagation();
        nextGroup();
    } else if (event.key === 'ArrowLeft') {
        console.log('Arrow Left pressed');
        event.preventDefault();
        event.stopPropagation();
        previousGroup();
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing carousel');
        if (initCarousel()) {
            startAutoPlay();
        }
        // Hide flares when endscreen loads
        hideFlares();
    });
} else {
    // DOM already loaded
    console.log('DOM already loaded, initializing carousel');
    if (initCarousel()) {
        startAutoPlay();
    }
    // Hide flares when endscreen loads
    hideFlares();
}

/**
 * Hide the flare effects (from parent page)
 */
function hideFlares() {
    try {
        const flareWrapper = window.parent.document.getElementById('flare-wrapper-main');
        if (flareWrapper) {
            flareWrapper.style.display = 'none';
            console.log('Flares hidden');
        }
    } catch (e) {
        console.log('Could not access parent flares:', e);
    }
}