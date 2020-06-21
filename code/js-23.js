if(document.querySelector('#koe_23_audio') === null) {

  // 选取页面视频
  var koe_23_videos = document.querySelectorAll('video');

  // 提示
  var koe_23_msg = document.createElement('span');
  koe_23_msg.setAttribute('style', 'position: fixed; top: 0; left: 0; padding: 3px 5px; background-color: #000; color: #FFF; font-size: 24px; z-index: 9999999');
  koe_23_msg.innerText = '眼保健操准备开始';
  document.body.appendChild(koe_23_msg);

  // 背景
  var koe_23_background = document.createElement('div');
  koe_23_background.setAttribute('style', 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #FFF; z-index: 9999999; display: none;');

  // 眼保健操 图
  var koe_23_img = document.createElement('img');
  koe_23_img.src = 'https://pic.downk.cc/item/5eeda42f14195aa5946e45fb.jpg';
  koe_23_img.setAttribute('style', 'margin: 0 auto; height: 100%; display: block;');

  // 音频
  var koe_23_audio = document.createElement('audio');
  koe_23_audio.src = 'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9KYldlRjBpWXlMWG1rUWc=.mp3';
  koe_23_audio.setAttribute('id', 'koe_23_audio');
  // 监听 音频加载完成
  koe_23_audio.addEventListener('canplaythrough', function() {
    koe_23_background.appendChild(koe_23_img);
    document.body.appendChild(koe_23_background);
  });
  // 监听 播放
  koe_23_audio.addEventListener('play', function() {
    koe_23_msg.style.display = 'none';
    koe_23_background.style.display = 'block';
  });
  // 监听 音频播放完成
  koe_23_audio.addEventListener('ended', function() {
    koe_23_msg.style.display = 'block';
    koe_23_background.style.display = 'none';
  });
  document.body.appendChild(koe_23_audio);
  // 设置 计时器 每过半小时执行一次
  setInterval(function() {
    // 暂停视频
    koe_23_videos.forEach(function(element) {
      element.pause();
    });

    // 取消全屏
    if(document.exitFullscreen) document.exitFullscreen();
    if(document.mozCancelFullScreen) document.mozCancelFullScreen();
    if(document.webkitCancelFullScreen) document.webkitCancelFullScreen();

    // 重新将音频时间设置成 0
    koe_23_audio.currentTime = 0;
    // 播放音频
    koe_23_audio.play();

  }, 1800000);

}
