function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const titleElement = document.getElementById('titleContainer');
const headerElement = document.getElementById('headerContainer');
const bodyElement = document.getElementById('bodyContainer');

if (isMobile()) {
    titleElement.style.maxWidth = '100%';
    headerElement.style.maxWidth = '100%';
    bodyElement.style.maxWidth = '100%';
} else {
    titleElement.style.maxWidth = '60%';
    headerElement.style.maxWidth = '60%';
    bodyElement.style.maxWidth = '60%';
}