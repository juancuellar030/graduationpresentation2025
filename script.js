// --- START OF FILE script.js ---

const studentFiles = ["students/student1.html", "students/student2.html", "students/student3.html"];
const balloonSources = ['assets/images/balloon1.png', 'assets/images/balloon2.png'];
let currentStudentIndex = 0;

// Get the elements we need to control from the main page
const studentFrame = document.getElementById('student-frame');
const flareWrapper = document.getElementById('flare-wrapper-main');

function positionFlareWrapper() {
    // ... (Your excellent flare positioning logic remains unchanged)
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
            flares[0].style.top = '0px';
            flares[0].style.left = '0px';
            flares[0].style.bottom = 'auto';
            flares[0].style.right = 'auto';
            flares[0].style.transform = 'translate(-50%, -50%)';
            flares[1].style.top = 'auto';
            flares[1].style.left = 'auto';
            flares[1].style.bottom = '0px';
            flares[1].style.right = '0px';
            flares[1].style.transform = 'translate(50%, 50%)';
        }
    }, 100);
}

function randomizeBalloons() {
    // ... (Your balloon randomization logic remains unchanged)
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
 * NEW: This function gives each piece of confetti a completely
 * unique and random animation path, just like in the video.
 */
function randomizeConfetti() {
    const confettis = document.querySelectorAll('.confetti');
    confettis.forEach(c => {
        const randomLeft = Math.random() * 100; // Random start position (0% to 100%)
        const randomDuration = Math.random() * 5 + 8; // Random fall speed (8s to 13s)
        const randomDelay = Math.random() * 10; // Random start time (0s to 10s)
        const randomDrift = (Math.random() - 0.5) * 250; // Random drift (-125px to 125px)
        const randomRotation = (Math.random() - 0.5) * 1440; // Random tumble (-720deg to 720deg)

        c.style.left = `${randomLeft}%`;
        c.style.animationDuration = `${randomDuration}s`;
        c.style.animationDelay = `${randomDelay}s`;
        c.style.setProperty('--confetti-drift', `${randomDrift}px`);
        c.style.setProperty('--confetti-rotation', `${randomRotation}deg`);
    });
}


// --- Event Listeners ---
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
            randomizeConfetti(); // <<< --- ADD THIS LINE HERE
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
window.addEventListener('resize', positionFlareWrapper);
