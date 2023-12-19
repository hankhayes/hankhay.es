function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const titleElement = document.getElementById('titleContainer');
const headerElement = document.getElementById('headerContainer');
const bodyElement = document.getElementById('bodyContainer');
const imageElement = document.getElementById('imageContainer');

if (isMobile()) {
    titleElement.style.maxWidth = '100%';
    headerElement.style.maxWidth = '100%';
    bodyElement.style.maxWidth = '100%';
    imageElement.style.maxWidth = '100%'
} else {
    titleElement.style.maxWidth = '75%';
    headerElement.style.maxWidth = '75%';
    bodyElement.style.maxWidth = '75%';
    imageElement.style.maxWidth = '75%'
}