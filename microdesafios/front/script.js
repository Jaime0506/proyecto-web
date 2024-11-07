// Main image hover effect
const mainImage = document.getElementById('main-image');
const mainVideo = document.getElementById('main-video');

mainImage.addEventListener('mouseenter', () => {
    mainVideo.style.opacity = '1';
    mainVideo.play();
});

mainImage.addEventListener('mouseleave', () => {
    mainVideo.style.opacity = '0';
    mainVideo.pause();
});

// Levels hover effect for video playback
const levelCards = document.querySelectorAll('.level-card');

levelCards.forEach(card => {
    const image = card.querySelector('.level-image');
    const video = card.querySelector('.level-video');

    card.addEventListener('mouseenter', () => {
        image.style.opacity = '0';
        video.style.opacity = '1';
        video.play();
    });

    card.addEventListener('mouseleave', () => {
        image.style.opacity = '1';
        video.style.opacity = '0';
        video.pause();
    });
});
