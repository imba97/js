var videoElement = document.querySelector(
  '.bilibili-player-video video'
);
var canvas = document.createElement('canvas');
canvas.width = videoElement.videoWidth;
canvas.height = videoElement.videoHeight;
canvas
  .getContext('2d')
  .drawImage(videoElement, 0, 0, canvas.width, canvas.height);
var img = document.createElement('img');
img.src = canvas.toDataURL('image/png');
img.setAttribute(
  'style',
  'position: absolute;top:50%;left:50%;transform: translate(-50%,-50%);'
);
var win = window.open('', '_blank');
win.document.write(img.outerHTML);
win.document.body.style.backgroundColor = '#0e0e0e';
void 0;
