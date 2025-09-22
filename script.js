// script.js

// --- NEW: Define all your balloon image sources here ---
const balloonSources = [
    'assets/images/balloon1.png',
    'assets/images/balloon2.png'
    // Add more image paths here if you have more colors!
    // e.g., 'assets/images/blue_balloon.png'
];

const studentFiles = ["students/student1.html", "students/student2.html", "students/student3.html"];
let currentStudentIndex = 0;

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
            randomizeBalloons(); // This now randomizes color AND animation
        }, 1000);
        return;
    }

    const studentFrame = document.getElementById('student-frame');
    if (event.key === 'ArrowRight') {
        currentStudentIndex = (currentStudentIndex + 1) % studentFiles.length;
        studentFrame.src = studentFiles[currentStudentIndex];
    } else if (event.key === 'ArrowLeft') {
        currentStudentIndex = (currentStudentIndex - 1 + studentFiles.length) % studentFiles.length;
        studentFrame.src = studentFiles[currentStudentIndex];
    }
});
