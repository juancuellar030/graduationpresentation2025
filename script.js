document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const curtain = document.getElementById('curtain');
        const studentCarousel = document.getElementById('student-carousel');
        curtain.classList.add('open');
        setTimeout(() => {
            curtain.style.display = 'none';
            studentCarousel.classList.remove('hidden');
        }, 1000); // Match the transition duration in CSS
    }
});
