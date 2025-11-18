const studentFiles = [
    "student1.html", "student2.html", "student3.html", "student4.html",
    "student5.html", "student6.html", "student7.html", "student8.html",
    "student9.html", "student10.html", "student11.html", "student12.html",
    "student13.html", "student14.html", "student15.html", "student16.html",
    "student17.html", "student18.html", "student19.html", "student20.html",
    "student21.html", "student22.html", "student23.html", "student24.html",
    "student25.html", "student26.html", "student27.html", "student28.html",
    "student29.html", "student30.html", "student31.html", "student32.html",
    "student33.html", "student34.html", "student35.html", "student36.html"
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
};

document.addEventListener('keydown', (event) => {
    const curtain = document.getElementById('curtain');
    const presentationContainer = document.getElementById('presentation-container');
    const music = document.getElementById('background-music');

    // Open curtain on any key press if not already open
    if (!curtain.classList.contains('open')) {
        curtain.classList.add('open');
        setTimeout(() => {
            curtain.style.display = 'none';
            presentationContainer.classList.remove('hidden');
            music.play();
            randomizeBalloons();
            randomizeConfetti();
            positionFlareWrapper();
        }, 1000);
        return;
    }

    // Navigation controls
    if (event.key === 'ArrowRight') {
        // Move forward
        const nextIndex = (currentStudentIndex + 1) % studentFiles.length;
        currentStudentIndex = nextIndex;
        transitionToStudent(nextIndex);
    } else if (event.key === 'ArrowLeft') {
        // Move backward
        const prevIndex = (currentStudentIndex - 1 + studentFiles.length) % studentFiles.length;
        currentStudentIndex = prevIndex;
        transitionToStudent(prevIndex);
    }
});

// Reposition flares on window resize
window.addEventListener('resize', positionFlareWrapper);