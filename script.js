// Add this new function to your script.js file

function randomizeBalloons() {
    const balloons = document.querySelectorAll('.balloon'); // Get all balloon elements

    balloons.forEach(balloon => {
        // Generate random values for each balloon
        const randomLeft = Math.floor(Math.random() * 95); // Random horizontal position from 0% to 95%
        const randomDuration = Math.random() * 8 + 10;    // Random speed between 10 and 18 seconds
        const randomDelay = Math.random() * 10;           // Random start delay between 0 and 10 seconds

        // Apply these random values directly to the balloon's style
        balloon.style.left = `${randomLeft}%`;
        balloon.style.animationDuration = `${randomDuration}s`;
        balloon.style.animationDelay = `${randomDelay}s`;
    });
}

// Now, find your existing event listener and modify it to call the new function.

const studentFiles = ["students/student1.html", "students/student2.html", "students/student3.html"]; // Your student files
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
            randomizeBalloons(); // <<< --- ADD THIS LINE HERE!
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
