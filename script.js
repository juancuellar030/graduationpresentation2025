const studentFiles = [
    "student1.html", "student2.html", "student3.html", "student4.html",
    "student5.html", "student6.html", "student7.html", "student8.html",
    "student9.html", "student10.html", "student11.html", "student12.html",
    "student13.html", "student14.html", "student15.html", "student16.html",
    "student17.html", "student18.html", "student19.html", "student20.html",
    "student21.html", "student22.html", "student23.html", "student24.html",
    "student25.html", "student26.html", "student27.html", "student28.html",
    "student29.html", "student30.html", "student31.html", "student32.html",
    "student33.html", "student34.html", "student35.html", "student36.html",
    "endscreen.html"
];
const balloonSources = ['assets/images/balloon1.png', 'assets/images/balloon2.png'];
let currentStudentIndex = 0;

// Get the elements we need to control from the main page
const studentFrame = document.getElementById('student-frame');
const flareWrapper = document.getElementById('flare-wrapper-main');

/**
 * This function positions the flare wrapper to match the SVG frame precisely
 * and positions individual flares at the exact corners of the frame
 */
function positionFlareWrapper() {
    setTimeout(() => {
        const iframeDoc = studentFrame.contentWindow.document;
        if (!iframeDoc) return;

        const frameSvg = iframeDoc.querySelector('.frame-svg');
        if (!frameSvg) return;

        const rect = frameSvg.getBoundingClientRect();
        const iframeRect = studentFrame.getBoundingClientRect();
        const absoluteTop = iframeRect.top + rect.top;
        const absoluteLeft = iframeRect.left + rect.left;

        flareWrapper.style.width = `${rect.width}px`;
        flareWrapper.style.height = `${rect.height}px`;
        flareWrapper.style.top = `${absoluteTop}px`;
        flareWrapper.style.left = `${absoluteLeft}px`;

        const flares = flareWrapper.querySelectorAll('.flare-effect');
        
        if (flares.length >= 2) {
            // FLARE 1 (Top-left corner)
            // Adjust these values to move the flare:
            // - Increase top value to move DOWN
            // - Increase left value to move RIGHT
            flares[0].style.top = '-5px';  // Negative moves UP, positive moves DOWN
            flares[0].style.left = '-5px'; // Negative moves LEFT, positive moves RIGHT
            flares[0].style.bottom = 'auto';
            flares[0].style.right = 'auto';
            flares[0].style.transform = 'translate(-50%, -50%)';
            
            // FLARE 2 (Bottom-right corner)
            // Adjust these values to move the flare:
            // - Increase bottom value to move UP
            // - Increase right value to move LEFT
            flares[1].style.top = 'auto';
            flares[1].style.left = 'auto';
            flares[1].style.bottom = '-5px'; // Negative moves DOWN, positive moves UP
            flares[1].style.right = '-5px';  // Negative moves RIGHT, positive moves LEFT
            flares[1].style.transform = 'translate(50%, 50%)';
        }
    }, 100);
}

function randomizeBalloons() {
    const balloons = document.querySelectorAll('.balloon');

    balloons.forEach(balloon => {
        const randomSource = balloonSources[Math.floor(Math.random() * balloonSources.length)];
        balloon.src = randomSource;

        const randomLeft = Math.floor(Math.random() * 95);
        const randomDuration = Math.random() * 8 + 10;
        const randomDelay = Math.random() * 10;
        const randomDrift = (Math.random() - 0.5) * 300;

        balloon.style.left = `${randomLeft}%`;
        balloon.style.animationDuration = `${randomDuration}s`;
        balloon.style.animationDelay = `${randomDelay}s`;
        balloon.style.setProperty('--horizontal-drift', `${randomDrift}px`);
    });
}

/**
 * This function gives each piece of confetti a completely
 * unique and random animation path
 */
function randomizeConfetti() {
    const confettis = document.querySelectorAll('.confetti');
    confettis.forEach(c => {
        const randomLeft = Math.random() * 100;
        const randomDuration = Math.random() * 5 + 8;
        const randomDelay = Math.random() * 10;
        const randomDrift = (Math.random() - 0.5) * 250;
        const randomRotation = (Math.random() - 0.5) * 1440;
        const randomSpinX = Math.random() * 1080 + 720;

        c.style.left = `${randomLeft}%`;
        c.style.animationDuration = `${randomDuration}s`;
        c.style.animationDelay = `${randomDelay}s`;
        c.style.setProperty('--confetti-drift', `${randomDrift}px`);
        c.style.setProperty('--confetti-rotation', `${randomRotation}deg`);
        c.style.setProperty('--confetti-spin-x', `${randomSpinX}deg`);
    });
}

/**
 * NEW: Smooth transition function for changing slides
 */
function transitionToStudent(index) {
    // Add fade-out effect
    studentFrame.style.opacity = '0';
    
    // After fade-out completes, change the source and fade back in
    setTimeout(() => {
        studentFrame.src = studentFiles[index];
        // The onload event will handle fade-in and repositioning
    }, 300);
}

// When iframe loads, fade it in and position flares
studentFrame.onload = function() {
    positionFlareWrapper();
    studentFrame.style.opacity = '1';
    // CRITICAL FIX: Refocus on the document after iframe loads
    document.body.focus();
};

document.addEventListener('keydown', (event) => {
    const curtain = document.getElementById('curtain');
    const presentationContainer = document.getElementById('presentation-container');
    const music = document.getElementById('background-music');
    // NEW: Select the memories button
    const memoriesBtn = document.getElementById('memories-btn');

    // CRITICAL: Check if we're on the endscreen - if so, don't handle navigation
    const iframe = document.getElementById('student-frame');
    if (iframe && iframe.src && iframe.src.includes('endscreen.html')) {
        return; // Let endscreen.js handle all navigation
    }

    // 1. OPENING THE CURTAIN
    // Open curtain on any key press if not already open
    if (!curtain.classList.contains('open')) {
        // Check if the key pressed is specifically the right arrow
        if (event.key === 'ArrowRight') {
            // CRITICAL FIX: Show presentation IMMEDIATELY before curtain starts opening
            presentationContainer.classList.remove('hidden');
            
            // Small delay to ensure presentation is rendered, then start curtain animation
            setTimeout(() => {
                curtain.classList.add('open');
                curtain.classList.remove('closed');
                
                // NEW: Hide the memories button when presentation starts
                if (memoriesBtn) memoriesBtn.classList.add('fade-out');

                if (window.musicManager) {
                    window.musicManager.start();
                }
                randomizeBalloons();
                randomizeConfetti();
                positionFlareWrapper();
                
                // CRITICAL FIX: Keep focus on body after opening
                document.body.focus();
            }, 50); 
        }
        return; // Exit early if curtain is not open yet
    }

    // 2. NAVIGATION CONTROLS
    if (event.key === 'ArrowRight') {
        // Move forward
        const nextIndex = (currentStudentIndex + 1) % studentFiles.length;
        currentStudentIndex = nextIndex;
        transitionToStudent(nextIndex);
        // CRITICAL FIX: Refocus after navigation
        document.body.focus();

    } else if (event.key === 'ArrowLeft') {
        // Check if we're at the first student
        if (currentStudentIndex === 0) {
            // GOING BACK TO START (Close Curtain)
            curtain.classList.remove('open');
            curtain.classList.add('closed');
            
            // NEW: Bring back the memories button
            if (memoriesBtn) memoriesBtn.classList.remove('fade-out');

            setTimeout(() => {
                presentationContainer.classList.add('hidden');
                if (window.musicManager) {
                    window.musicManager.stop();
                }
            }, 3000);
        } else {
            // Move backward to previous student
            const prevIndex = (currentStudentIndex - 1 + studentFiles.length) % studentFiles.length;
            currentStudentIndex = prevIndex;
            transitionToStudent(prevIndex);
        }
        // CRITICAL FIX: Refocus after navigation
        document.body.focus();
    }
});

// Reposition flares on window resize
window.addEventListener('resize', positionFlareWrapper);

// ===== TOUCH/SWIPE SUPPORT FOR MOBILE DEVICES =====
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

const presentationContainer = document.getElementById('presentation-container');

// Detect touch start
presentationContainer.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}, { passive: true });

// Detect touch end and determine swipe direction
presentationContainer.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const curtain = document.getElementById('curtain');
    
    // Don't handle swipes if curtain is still closed
    if (!curtain.classList.contains('open')) {
        return;
    }
    
    const horizontalDiff = touchEndX - touchStartX;
    const verticalDiff = Math.abs(touchEndY - touchStartY);
    
    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 50;
    
    // Only trigger if horizontal swipe is longer than vertical (to avoid interfering with scrolling)
    if (Math.abs(horizontalDiff) > minSwipeDistance && Math.abs(horizontalDiff) > verticalDiff) {
        if (horizontalDiff > 0) {
            // Swiped RIGHT - go to PREVIOUS student
            const prevIndex = (currentStudentIndex - 1 + studentFiles.length) % studentFiles.length;
            currentStudentIndex = prevIndex;
            transitionToStudent(prevIndex);
        } else {
            // Swiped LEFT - go to NEXT student
            const nextIndex = (currentStudentIndex + 1) % studentFiles.length;
            currentStudentIndex = nextIndex;
            transitionToStudent(nextIndex);
        }
    }
}

// CRITICAL FIX: Ensure body is always focusable and maintains focus
document.body.setAttribute('tabindex', '0');
document.body.focus();

// CRITICAL FIX: Refocus on body when clicking anywhere on the page
document.addEventListener('click', () => {
    document.body.focus();
});

// ==========================================
// MEMORIES CAROUSEL LOGIC
// ==========================================

// 1. Define your photos here
const memoryPhotos = [
    "assets/images/memory1.jpg",
    "assets/images/memory2.jpg",
    "assets/images/memory3.jpg",
    "assets/images/memory4.jpg",
    "assets/images/memory5.jpg",
    "assets/images/memory6.jpg",
    "assets/images/memory7.jpg",
    "assets/images/memory8.jpg",
    "assets/images/memory9.jpg",
    "assets/images/memory10.jpg",
    "assets/images/memory11.jpg",
    "assets/images/memory12.jpg",
    "assets/images/memory13.jpg",
    "assets/images/memory14.jpg",
    "assets/images/memory15.jpg",
    "assets/images/memory16.jpg",
    "assets/images/memory17.jpg",
    "assets/images/memory18.jpg",
    "assets/images/memory19.jpg",
    "assets/images/memory20.jpg",
    "assets/images/memory21.jpg",
    "assets/images/memory22.jpg",
    "assets/images/memory23.jpg",
    "assets/images/memory24.jpg",
    "assets/images/memory25.jpg",
    "assets/images/memory26.jpg",
    "assets/images/memory27.jpg",
    "assets/images/memory28.jpg",
    "assets/images/memory29.jpg",
    "assets/images/memory30.jpg",
    "assets/images/memory31.jpg",
    "assets/images/memory32.jpg",
    "assets/images/memory33.jpg",
    "assets/images/memory34.jpg",
    "assets/images/memory35.jpg",
    "assets/images/memory36.jpg",
    "assets/images/memory37.jpg",
    "assets/images/memory38.jpg",
    "assets/images/memory39.jpg",
    "assets/images/memory40.jpg",
    "assets/images/memory41.jpg",
    "assets/images/memory42.jpg",
    "assets/images/memory43.jpg",
    "assets/images/memory44.jpg",
    "assets/images/memory45.jpg",
    "assets/images/memory46.jpg",
    "assets/images/memory47.jpg",
    "assets/images/memory48.jpg",
    "assets/images/memory49.jpg",
    "assets/images/memory50.jpg",
    "assets/images/memory51.jpg",
    "assets/images/memory52.jpg",
    "assets/images/memory53.jpg" 
];

let currentIndex = 0;
let memoryTimeout;
let isCarouselRunning = false;

// Select Elements
const memoriesOverlay = document.getElementById('memories-overlay');
// Select both frames
const frame1 = document.querySelector('.frame-top-left');
const img1 = document.getElementById('memory-photo-1');
const frame2 = document.querySelector('.frame-bottom-right');
const img2 = document.getElementById('memory-photo-2');

function openMemories() {
    if(memoryPhotos.length === 0) return;

    // Show overlay
    memoriesOverlay.classList.remove('hidden');
    
    const music = document.getElementById('background-music');
    if (music.paused) music.play();

    isCarouselRunning = true;
    currentIndex = 0; 
    
    // Start the cycle
    runCarouselCycle();
}

function closeMemories() {
    memoriesOverlay.classList.add('hidden');
    isCarouselRunning = false;
    clearTimeout(memoryTimeout);
    
    // Reset classes
    frame1.classList.remove('active', 'exit', 'no-transition');
    frame2.classList.remove('active', 'exit', 'no-transition');
}

function runCarouselCycle() {
    if (!isCarouselRunning) return;

    // --- PHASE 1: RESET (Teleport) ---
    // Snap frames back to starting positions instantly
    frame1.classList.add('no-transition');
    frame2.classList.add('no-transition');
    
    frame1.classList.remove('exit', 'active'); // Snaps to Right
    frame2.classList.remove('exit', 'active'); // Snaps to Left
    
    // Force browser to apply the snap
    void frame1.offsetWidth;
    void frame2.offsetWidth;
    
    // Set Photos
    // Photo 1 gets current index
    img1.src = memoryPhotos[currentIndex % memoryPhotos.length];
    
    // Photo 2 gets the NEXT index (so they are different)
    // Check if we have enough photos for a second one, otherwise reuse
    let secondIndex = (currentIndex + 1) % memoryPhotos.length;
    img2.src = memoryPhotos[secondIndex];

    // --- PHASE 2: ANIMATE IN ---
    setTimeout(() => {
        if (!isCarouselRunning) return;

        // Enable animation
        frame1.classList.remove('no-transition');
        frame2.classList.remove('no-transition');
        
        // Slide In
        frame1.classList.add('active');
        frame2.classList.add('active');

        // --- PHASE 3: HOLD & EXIT ---
        memoryTimeout = setTimeout(() => {
            if (!isCarouselRunning) return;

            // Slide Out (Opposite directions)
            frame1.classList.remove('active');
            frame1.classList.add('exit'); // Goes Left
            
            frame2.classList.remove('active');
            frame2.classList.add('exit'); // Goes Right

            // --- PHASE 4: PREPARE NEXT LOOP ---
            memoryTimeout = setTimeout(() => {
                if (!isCarouselRunning) return;

                // Increment by 2 since we showed 2 photos
                currentIndex = (currentIndex + 2) % memoryPhotos.length;
                runCarouselCycle();

            }, 1500); // Wait for exit animation

        }, 4000); // Display time

    }, 50);
}

// ==========================================
// GLITTER GENERATOR
// ==========================================

function createGlitter() {
    const container = document.getElementById('glitter-container');
    if (!container) return;

    // Number of particles (increase for more intense effect)
    const particleCount = 60; 

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('glitter-particle');

        // Random Horizontal Position (0% to 100%)
        const posX = Math.random() * 100 + '%';
        
        // Random Fall Duration (Slow vs Fast) - between 5s and 12s
        const duration = Math.random() * 7 + 5 + 's';
        
        // Random Delay (so they don't all start at once) - between 0s and 10s
        const delay = Math.random() * 10 + 's';
        
        // Random Size (Small vs Large sparkles) - between 3px and 8px
        const size = Math.random() * 5 + 3 + 'px';

        // Set CSS Variables
        particle.style.setProperty('--pos-x', posX);
        particle.style.setProperty('--duration', duration);
        particle.style.setProperty('--delay', delay);
        particle.style.setProperty('--size', size);

        container.appendChild(particle);
    }
}

// Call this immediately so sparkles are ready when button is clicked
createGlitter();

// ==========================================
// MUSIC MANAGER - Sequential Playlist with Resume Support
// ==========================================

const musicTracks = [
    document.getElementById('music1'),
    document.getElementById('music2'),
    document.getElementById('music3')
];

let currentTrackIndex = 0;
let isPlaying = false;
let isFading = false;
const FADE_DURATION = 1500; // 1.5 seconds fade time

const musicToggleBtn = document.getElementById('music-toggle');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');

/**
 * Fade audio volume smoothly
 */
function fadeVolume(audio, startVolume, endVolume, duration) {
    return new Promise((resolve) => {
        if (!audio) {
            resolve();
            return;
        }

        const steps = 20;
        const stepTime = duration / steps;
        const volumeStep = (endVolume - startVolume) / steps;
        let currentStep = 0;

        audio.volume = startVolume;

        const fadeInterval = setInterval(() => {
            currentStep++;
            // Ensure volume stays within 0.0 and 1.0 bounds
            let newVol = startVolume + (volumeStep * currentStep);
            newVol = Math.max(0, Math.min(1, newVol));
            
            audio.volume = newVol;

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                audio.volume = endVolume;
                resolve();
            }
        }, stepTime);
    });
}

/**
 * Play a specific track from the beginning (Resets time)
 */
async function playTrack(index) {
    const track = musicTracks[index];
    if (!track) return;

    currentTrackIndex = index;
    
    // Reset track to beginning
    track.currentTime = 0;
    
    try {
        await track.play();
        isPlaying = true;
        
        // Fade in
        await fadeVolume(track, 0, 1, FADE_DURATION);
        
        console.log(`Now playing: Track ${index + 1}`);
    } catch (error) {
        console.error('Error playing track:', error);
    }
}

/**
 * Pause current track (KEEPS position)
 */
async function pauseCurrentTrack() {
    const track = musicTracks[currentTrackIndex];
    if (!track || !isPlaying) return;

    isFading = true;
    
    // Fade out
    await fadeVolume(track, track.volume, 0, FADE_DURATION);
    
    // Pause but DO NOT reset currentTime
    track.pause();
    
    // Reset volume to 1 so it's ready for the next fade-in
    track.volume = 1; 
    
    isPlaying = false;
    isFading = false;
    
    console.log(`Paused at ${track.currentTime.toFixed(1)}s`);
}

/**
 * Resume current track (From CURRENT position)
 */
async function resumeCurrentTrack() {
    const track = musicTracks[currentTrackIndex];
    if (!track) return;

    isFading = true;

    try {
        // Just play(), do NOT reset currentTime
        await track.play();
        isPlaying = true;
        
        // Fade in
        await fadeVolume(track, 0, 1, FADE_DURATION);
        
        isFading = false;
        console.log(`Resumed at ${track.currentTime.toFixed(1)}s`);
    } catch (error) {
        console.error('Error resuming track:', error);
        isFading = false;
    }
}

/**
 * Stop current track (RESETS position to 0)
 * Used when going back to the intro curtain
 */
async function stopCurrentTrack() {
    const track = musicTracks[currentTrackIndex];
    if (!track) return;

    if (isPlaying) {
        isFading = true;
        // Fade out
        await fadeVolume(track, track.volume, 0, FADE_DURATION);
        isFading = false;
    }
    
    // Pause and RESET position
    track.pause();
    track.currentTime = 0;
    track.volume = 1;
    
    isPlaying = false;
    
    // Remove playing state from button
    if (musicToggleBtn) {
        musicToggleBtn.classList.remove('playing');
        if (playIcon) playIcon.classList.remove('hidden');
        if (pauseIcon) pauseIcon.classList.add('hidden');
    }
    
    console.log('Stopped and reset');
}

/**
 * Play next track in sequence
 */
async function playNextTrack() {
    // Stop current track without fade
    const track = musicTracks[currentTrackIndex];
    if (track) {
        track.pause();
        track.currentTime = 0;
        track.volume = 1;
    }

    // Move to next track
    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    
    // Play new track
    await playTrack(currentTrackIndex);
}

/**
 * Main Toggle Function attached to the button
 */
async function toggleMusic() {
    if (isFading) return; // Prevent clicking while fading

    if (isPlaying) {
        // === PAUSE ===
        await pauseCurrentTrack();
        
        // Update UI
        if (playIcon) playIcon.classList.remove('hidden');
        if (pauseIcon) pauseIcon.classList.add('hidden');
        if (musicToggleBtn) musicToggleBtn.classList.remove('playing');
    } else {
        // === RESUME ===
        await resumeCurrentTrack();
        
        // Update UI
        if (playIcon) playIcon.classList.add('hidden');
        if (pauseIcon) pauseIcon.classList.remove('hidden');
        if (musicToggleBtn) musicToggleBtn.classList.add('playing');
    }
}

/**
 * Start music (called when presentation opens)
 */
async function startMusic() {
    if (!isPlaying) {
        await playTrack(0); // Start with first track
        
        // Update button UI
        if (playIcon && pauseIcon && musicToggleBtn) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            musicToggleBtn.classList.add('playing');
        }
    }
}

/**
 * Initialize music system
 */
function initMusicSystem() {
    // Set up track end listeners for sequential playback
    musicTracks.forEach((track, index) => {
        if (track) {
            track.addEventListener('ended', () => {
                console.log(`Track ${index + 1} ended, playing next...`);
                playNextTrack();
            });
        }
    });

    // Set up toggle button
    if (musicToggleBtn) {
        musicToggleBtn.onclick = toggleMusic; 
    }

    console.log('Music system initialized with', musicTracks.length, 'tracks');
}

// Initialize music system when page loads
initMusicSystem();

// Export functions for use in main script
window.musicManager = {
    start: startMusic,
    stop: stopCurrentTrack,
    toggle: toggleMusic
};

// Add this enhancement to your existing music manager code
// This adds visual feedback to the button

/**
 * Toggle play/pause with smooth fade (ENHANCED with visual feedback)
 */
async function toggleMusic() {
    if (isFading) return; // Don't allow toggle during fade

    if (isPlaying) {
        // Pause with fade out (keeps position)
        await pauseCurrentTrack();
        
        // Update button icon and remove playing state
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        musicToggleBtn.classList.remove('playing');
    } else {
        // Resume from current position
        await resumeCurrentTrack();
        
        // Update button
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        musicToggleBtn.classList.add('playing');
    }
}

/**
 * Start music (called when presentation opens) - ENHANCED
 */
async function startMusic() {
    if (!isPlaying) {
        await playTrack(0); // Start with first track
        
        // Update button to show pause icon and playing state
        if (playIcon && pauseIcon && musicToggleBtn) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            musicToggleBtn.classList.add('playing');
        }
    }
}

/**
 * Stop current track with fade out - ENHANCED
 */
async function stopCurrentTrack() {
    const currentTrack = musicTracks[currentTrackIndex];
    if (!currentTrack || !isPlaying) return;

    isFading = true;
    
    // Fade out
    await fadeVolume(currentTrack, currentTrack.volume, 0, FADE_DURATION);
    
    // Pause and reset
    currentTrack.pause();
    currentTrack.currentTime = 0;
    currentTrack.volume = 1;
    
    isPlaying = false;
    isFading = false;
    
    // Remove playing state from button
    if (musicToggleBtn) {
        musicToggleBtn.classList.remove('playing');
    }
}