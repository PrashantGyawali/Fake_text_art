const video = document.createElement('video');
video.src="bg.mp4";
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const div = document.getElementById('myDiv');
let currentFrame = 0;
let isRendering = false;
let imageURL = '';

let prevTime=new Date().getTime();

function renderNextFrame() {
    if (!isRendering) return;

    video.currentTime = (currentFrame/30);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);


    imageURL = canvas.toDataURL();
    const backgroundImageURL = `url(${imageURL})`;


    div.style.backgroundImage = backgroundImageURL;

    currentFrame+=2;

    setTimeout(renderNextFrame, 1000/30);
}

video.addEventListener('loadedmetadata', function() {
  isRendering = true;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  renderNextFrame();
},{once: true});

video.addEventListener('ended', function() {
  currentFrame = 0;
});
