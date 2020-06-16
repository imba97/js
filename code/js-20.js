// https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9IZklDRkRSYl9kYVJydnc/ZT1vQnZIRXY=.mp4

if (document.querySelector('#koe_20_background') === null) {

  var koe_20_videos = document.querySelectorAll('video:not(.koe_20_video),audio');

  var koe_20_background = document.createElement('div');
  koe_20_background.setAttribute('id', 'koe_20_background');
  koe_20_background.setAttribute(
    'style',
    'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000; z-index: 9999999; display: none;'
  );

  var koe_20_video = document.createElement('video');

  koe_20_video.setAttribute('autoplay', '');
  koe_20_video.setAttribute('name', 'media');
  koe_20_video.setAttribute(
    'style',
    'position: fixed; top: 0; left: 0; width: 100%; height: 100%;'
  );

  koe_20_video.addEventListener('ended', function () {
    document.body.removeChild(koe_20_background);
  });

  koe_20_video.addEventListener('canplaythrough', function () {
    koe_20_background.style.display = 'block';
    koe_20_videos.forEach(function(element){element.pause()});
  });

  // 添加音乐资源
  var koe_20_source = document.createElement('source');
  koe_20_source.setAttribute(
    'src',
    'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9IZklDRkRSYl9kYVJydnc/ZT1vQnZIRXY=.mp4'
  );
  koe_20_source.setAttribute('type', 'video/mp4');
  koe_20_video.appendChild(koe_20_source);
  koe_20_background.appendChild(koe_20_video);
  document.body.appendChild(koe_20_background);
}
