// koe_clicked 类型 和 #koe_msg 元素是否存在，避免重复创建音乐
if (
  typeof koe_clicked === 'undefined' &&
  document.querySelector('#koe_msg') === null
) {
  koe_clicked = true;
  // [if-0] 判断是否有 video 标签，没有则创建
  if (document.querySelector('#koe_video') === null) {
    // 创建左上角提示
    var koe_msg = document.createElement('p');
    koe_msg.innerText = '正在去世';
    koe_msg.setAttribute('id', 'koe_msg');
    koe_msg.setAttribute(
      'style',
      'position:fixed;top:0;left:0;width:130px;height:30px;line-height:30px;text-align:center;background-color:#000;color:#FFF;font-size:26px;z-index:99999999'
    );
    document.body.appendChild(koe_msg);

    // 是否正在播放
    var koe_played = true;
    // 创建 video 标签
    var koe_video = document.createElement('video');
    koe_video.setAttribute('id', 'koe_video');
    koe_video.setAttribute('autoplay', '');
    koe_video.setAttribute('name', 'media');
    // 监听音乐加载成功事件
    koe_video.addEventListener('canplaythrough', function () {
      koe_msg.remove();
      document.body.setAttribute(
        'style',
        'filter: grayscale(100%); -moz-filter: grayscale(100%); -o-filter: grayscale(100%); -webkit-filter: grayscale(100%);'
      );
      koe_clicked = false;
    });
    // 监听暂停事件
    koe_video.addEventListener('pause', function () {
      // 暂停后设置页面 style 取消灰色
      document.body.setAttribute('style', '');
      koe_played = false;
      koe_clicked = false;
    });
    // 监听播放事件
    koe_video.addEventListener('play', function () {
      // 设置页面为灰色
      document.body.setAttribute(
        'style',
        'filter: grayscale(100%); -moz-filter: grayscale(100%); -o-filter: grayscale(100%); -webkit-filter: grayscale(100%);'
      );
      koe_played = true;
      koe_clicked = false;
    });
    // 添加音乐资源
    var koe_source = document.createElement('source');
    koe_source.setAttribute(
      'src',
      'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLWwtTk5nMVlSVlFJRThJclE/ZT1HbFZ5VHE=.mp3'
    );
    koe_source.setAttribute('type', 'audio/mpeg');
    koe_video.appendChild(koe_source);
    // 添加至 video 标签
    document.body.appendChild(koe_video);

    // [if-0] 有则根据是否正在播放，控制暂停和继续播放
  } else {
    if (koe_played) {
      document.querySelector('#koe_video').pause();
    } else {
      document.querySelector('#koe_video').play();
    }
  }
}
void 0;
