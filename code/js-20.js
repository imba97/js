// 判断 背景 没被创建
if (document.querySelector('#koe_20_background') === null) {

  // 选取所有 video 和 audio 标签
  var koe_20_videos = document.querySelectorAll('video,audio');

  // 创建 背景 div
  var koe_20_background = document.createElement('div');
  // 设置 背景 id
  koe_20_background.setAttribute('id', 'koe_20_background');
  // 设置 背景 style，覆盖这个网页、黑色背景、最顶层、不显示
  koe_20_background.setAttribute(
    'style',
    'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000; z-index: 9999999; display: none;'
  );

  // 创建 video 标签
  var koe_20_video = document.createElement('video');

  // 设置 自动播放、name、style
  koe_20_video.setAttribute('autoplay', '');
  koe_20_video.setAttribute('name', 'media');
  koe_20_video.setAttribute(
    'style',
    'position: fixed; top: 0; left: 0; width: 100%; height: 100%;'
  );

  // 监听视频播放结束 删除 背景
  koe_20_video.addEventListener('ended', function () {
    document.body.removeChild(koe_20_background);
  });

  // 监听视频加载完成 让背景显示、让页面的 video 和 audio 暂停播放
  koe_20_video.addEventListener('canplaythrough', function () {
    koe_20_background.style.display = 'block';
    koe_20_videos.forEach(function(element){element.pause()});
  });

  // 添加资源
  var koe_20_source = document.createElement('source');
  // 视频地址
  koe_20_source.setAttribute(
    'src',
    'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9IZklDRkRSYl9kYVJydnc/ZT1vQnZIRXY=.mp4'
  );
  // 设置格式
  koe_20_source.setAttribute('type', 'video/mp4');
  // 将 资源 添加至 视频标签 中
  koe_20_video.appendChild(koe_20_source);
  // 将 视频 添加至 背景 中
  koe_20_background.appendChild(koe_20_video);
  // 将 背景 添加至 body 中
  document.body.appendChild(koe_20_background);
}
