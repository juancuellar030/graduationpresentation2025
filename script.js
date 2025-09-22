// script.js

function randomizeBalloons() {
    const balloons = document.querySelectorAll('.balloon');

    balloons.forEach(balloon => {
        // --- Same as before ---
        const randomLeft = Math.floor(Math.random() * 95); // Random start position (0% to 94%)
        const randomDuration = Math.random() * 8 + 10;    // Random speed (10s to 18s)
        const randomDelay = Math.random() * 10;           // Random start delay (0s to 10s)

        // --- NEW: Calculate random horizontal drift ---
        // This will produce a random number between -150 and +150
        const randomDrift = (Math.random() - 0.5) * 300;

        // Apply all the random values to the balloon's style
        balloon.style.left = `${randomLeft}%`;
        balloon.style.animationDuration = `${randomDuration}s`;
        balloon.style.animationDelay = `${randomDelay}s`;

        // --- NEW: Set the CSS variable for the animation to use ---
        balloon.style.setProperty('--horizontal-drift', `${randomDrift}px`);
    });
}

// --- Your existing event listener code (make sure it calls the function as below) ---
const studentFiles = ["students/student1.html", "students/student2.html", "students/student3.html"];
let currentStudentIndex = 0;

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
            randomizeBalloons(); // This call is still the key!
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
