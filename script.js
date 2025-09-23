const studentFiles = ["students/student1.html", "students/student2.html", "students/student3.html"];
const balloonSources = ['assets/images/balloon1.png', 'assets-images/balloon2.png'];
let currentStudentIndex = 0;

// Get the elements we need to control from the main page
const studentFrame = document.getElementById('student-frame');
const flareWrapper = document.getElementById('flare-wrapper-main');

/**
 * This is the new, critical function. It measures the photo frame inside
 * the iframe and moves the flare wrapper to match it perfectly.
 */
function positionFlareWrapper() {
    // Get the document inside the iframe
    const iframeDoc = studentFrame.contentWindow.document;
    if (!iframeDoc) return; // Exit if the iframe document isn't ready

    // Find the photo container element within the iframe
    const photoContainer = iframeDoc.querySelector('.photo-container');
    if (!photoContainer) return; // Exit if the photo container isn't found

    // Get the exact size and position of the photo container relative to the viewport
    const rect = photoContainer.getBoundingClientRect();

    // Apply this position to our main flare wrapper
    flareWrapper.style.width = `${rect.width}px`;
    flareWrapper.style.height = `${rect.height}px`;
    flareWrapper.style.top = `${rect.top}px`;
    flareWrapper.style.left = `${rect.left}px`;
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
