const studentFiles = ["students/student1.html", "students/student2.html", "students/student3.html"];
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
    // Wait for iframe content to fully load and position
    setTimeout(() => {
        const iframeDoc = studentFrame.contentWindow.document;
        if (!iframeDoc) return;

        // Target the SVG frame instead of the photo container
        const frameSvg = iframeDoc.querySelector('.frame-svg');
        if (!frameSvg) return;

        // Get the SVG frame's position and dimensions
        const rect = frameSvg.getBoundingClientRect();
        
        // Get the iframe's position relative to the main document
        const iframeRect = studentFrame.getBoundingClientRect();
        
        // Calculate the absolute position of the SVG frame in the main document
        const absoluteTop = iframeRect.top + rect.top;
        const absoluteLeft = iframeRect.left + rect.left;

        // Position the flare wrapper to match the SVG frame exactly
        flareWrapper.style.width = `${rect.width}px`;
        flareWrapper.style.height = `${rect.height}px`;
        flareWrapper.style.top = `${absoluteTop}px`;
        flareWrapper.style.left = `${absoluteLeft}px`;
        
        // Now position individual flares at the precise corners
        const flares = flareWrapper.querySelectorAll('.flare-effect');
        
        if (flares.length >= 2) {
            // Calculate the frame border thickness (estimate based on typical photo frame proportions)
            const borderThickness = Math.min(rect.width, rect.height) * 0.06; // Approximately 4% of the smaller dimension
            
            // First flare: top-left corner (positioned at the inner corner of the frame border)
            flares[0].style.top = `${borderThickness}px`;
            flares[0].style.left = `${borderThickness}px`;
            flares[0].style.transform = 'translate(-50%, -50%)';
            
            // Second flare: bottom-right corner (positioned at the inner corner of the frame border)
            flares[1].style.top = `${rect.height - borderThickness}px`;
            flares[1].style.left = `${rect.width - borderThickness}px`;
            flares[1].style.transform = 'translate(-50%, -50%)';
        }
    }, 100); // Increased delay to ensure iframe content is fully rendered
}

function randomizeBalloons() {
    const balloons = document.querySelectorAll('.balloon');

    balloons.forEach(balloon => {
        // --- NEW: Randomly pick a color for this balloon ---
        const randomSource = balloonSources[Math.floor(Math.random() * balloonSources.length)];
        balloon.src = randomSource; // Set the image source

        // --- All the previous randomization logic remains the same ---
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

studentFrame.onload = positionFlareWrapper;

document.addEventListener('keydown', (event) => {
    const curtain = document.getElementById('curtain');
    const presentationContainer = document.getElementById('presentation-container');
    const music = document.getElementById('background-music');

    if (!curtain.classList.contains('open')) {
        curtain.classList.add('open');
        setTimeout(() => {
            curtain.style.display = 'none';
            presentationContainer.classList.remove('hidden');
            music.play();
            randomizeBalloons();
            // Run the positioning for the very first slide
            positionFlareWrapper();
        }, 1000);
        return;
    }

    if (event.key === 'ArrowRight') {
        currentStudentIndex = (currentStudentIndex + 1) % studentFiles.length;
        studentFrame.src = studentFiles[currentStudentIndex];
    } else if (event.key === 'ArrowLeft') {
        currentStudentIndex = (currentStudentIndex - 1 + studentFiles.length) % studentFiles.length;
        studentFrame.src = studentFiles[currentStudentIndex];
    }
});

// Also, let's reposition the flares if the window is resized
window.addEventListener('resize', positionFlareWrapper);
