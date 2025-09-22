// script.js (replace your old code with this)

const studentFiles = ["student1.html", "student2.html", "student3.html"]; // Add all your student files here
let currentStudentIndex = 0;

document.addEventListener('keydown', (event) => {
    const curtain = document.getElementById('curtain');
    const presentationContainer = document.getElementById('presentation-container');
    const music = document.getElementById('background-music');

    // Open the curtain if it's not already open
    if (!curtain.classList.contains('open')) {
        curtain.classList.add('open');
        setTimeout(() => {
            curtain.style.display = 'none';
            presentationContainer.classList.remove('hidden');
            music.play(); // Start music after curtains open
        }, 1000); // Match the transition duration in CSS
        return; // Stop further execution
    }

    // Navigate between students once curtains are open
    const studentFrame = document.getElementById('student-frame');
    if (event.key === 'ArrowRight') {
        currentStudentIndex = (currentStudentIndex + 1) % studentFiles.length; // Move to the next student, loop at the end
        studentFrame.src = studentFiles[currentStudentIndex];
    } else if (event.key === 'ArrowLeft') {
        currentStudentIndex = (currentStudentIndex - 1 + studentFiles.length) % studentFiles.length; // Move to the previous student, loop at the beginning
        studentFrame.src = studentFiles[currentStudentIndex];
    }
});
