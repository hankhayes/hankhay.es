function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const titleElement = document.getElementById('titleContainer');
const bodyElement = document.getElementById('bodyContainer');
const imageElement = document.getElementById('imageContainer');
const videoElement = document.getElementById('videoContainer');

if (isMobile()) {
    titleElement.style.maxWidth = '100%';
    bodyElement.style.maxWidth = '100%';
    imageElement.style.maxWidth = '100%';
    videoElement.style.maxWidth = '100%';
} else {
    titleElement.style.maxWidth = '50%';
    bodyElement.style.maxWidth = '50%';
    imageElement.style.maxWidth = '60%';
    videoElement.style.maxWidth = '60%';
}