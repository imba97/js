// [if-0] 第一次点击 初始化音频等
if (document.querySelector('#koe_video_aaaaaaaaa') === null) {
  // 音乐是否完成加载
  var koe_loaded_aaaaaaaaa = false;
  // 计时器
  var koe_timer_aaaaaaaaa = null;
  // 弹幕的 top
  var koe_global_top = 0;
  // style 效果
  var koe_danmakuClass = document.createElement('style');
  koe_danmakuClass.innerText =
    '.koe-danmakuBox { position: fixed; top: 0; left:0; width: 100%; height: 100%; overflow: hidden; z-index: 99999999999; } .koe-danmaku { position: absolute; margin: 0; padding: 0; -webkit-text-stroke:.8px #000; font-size: 30px; font-weight: 700; color: #FFF; white-space:nowrap; animation-fill-mode: forwards; } @keyframes move { from {  } to { left: -1080px } }; @-webkit-keyframes move { from {  } to { left: -1080px } }; @-moz-keyframes move { from {  } to { left: -1080px } }; @-o-keyframes move { from {  } to { left: -1080px } }';
  // 弹幕容器
  var koe_danmakuBox = document.createElement('div');
  koe_danmakuBox.setAttribute('class', 'koe-danmakuBox');
  // 向 body 中添加 style 和 弹幕容器
  document.body.appendChild(koe_danmakuClass);
  document.body.appendChild(koe_danmakuBox);
  // 屏幕分辨率高度
  var koe_screen_height =
    window.screen.height > 300 ? window.screen.height : 1000;
  // 弹幕高度
  var koe_danmaku_lineHeight = 35;
  // 弹幕最大行数 用屏幕分辨率高度 除以 弹幕高度
  var koe_danmaku_max = Math.floor(koe_screen_height / koe_danmaku_lineHeight);

  // 来たぁぁぁぁぁぁぁぁぁぁ
  function koe_kitaaaaaaaaaa() {
    for (var i = 0; i < 1000; i++) {
      setTimeout(function () {
        koe_global_top = 0;
        for (var j = 0; j < koe_danmaku_max; j++) {
          setTimeout('koe_add_danmaku()', koe_rand(0, 2000));
        }
      }, i * 3000);
    }
  }
  // 添加弹幕
  function koe_add_danmaku() {
    // 创建 p 标签，每个 p 标签是一行弹幕
    var koe_danmaku = document.createElement('p');
    koe_danmaku.setAttribute('class', 'koe-danmaku');
    koe_danmaku.innerText = koe_aaaaaaaaa();
    // 获取 body 宽度
    var koe_bodyWidth = document.body.clientWidth;
    // 让 p 标签的 top 等于 koe_global_top，left 等于 随机取值 最小 ( body 宽度 + 100 ) 最大 ( body 宽度 + 500 )，并且设置动画，让 left 变成 -1080px，这样弹幕就会向左移动，时长 10 秒钟
    koe_danmaku.setAttribute(
      'style',
      'top:' +
        koe_global_top +
        'px; left: ' +
        koe_rand(koe_bodyWidth + 100, koe_bodyWidth + 500) +
        'px;' +
        'animation: move linear 10s;-webkit-animation: move linear 10s;-moz-animation: move linear 10s;-o-animation: move linear 10s;'
    );
    koe_danmakuBox.appendChild(koe_danmaku);
    // 10 秒后删除这条弹幕，如果不删会造成大量内存消耗，导致卡顿
    setTimeout(function () {
      koe_danmakuBox.removeChild(koe_danmaku);
    }, 10000);
    // 让 koe_global_top 增加一个弹幕高度
    koe_global_top += koe_danmaku_lineHeight;
  }
  // 获取随机数量的“啊”，最少 10 个，最多 100 个
  function koe_aaaaaaaaa() {
    var str = '';
    for (var a = 0; a < koe_rand(10, 100); a++) {
      str += '啊';
    }
    return str;
  }
  // 生成随机数
  function koe_rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // 左上角的提示，在音乐加载完之前一直显示
  var koe_msg_aaaaaaaaa = document.createElement('p');
  koe_msg_aaaaaaaaa.innerText = '正在啊啊啊啊啊啊啊啊';
  koe_msg_aaaaaaaaa.setAttribute('id', 'koe_msg_aaaaaaaaa');
  koe_msg_aaaaaaaaa.setAttribute(
    'style',
    'position:fixed;top:0;left:0;width:300px;height:30px;line-height:30px;text-align:center;background-color:#000;color:#FFF;font-size:26px;z-index:99999999'
  );
  document.body.appendChild(koe_msg_aaaaaaaaa);

  // 是否正在播放
  var koe_played_aaaaaaaaa = true;
  // 加载音乐
  var koe_video_aaaaaaaaa = document.createElement('video');
  koe_video_aaaaaaaaa.setAttribute('id', 'koe_video_aaaaaaaaa');
  // 设置自动播放
  koe_video_aaaaaaaaa.setAttribute('autoplay', '');
  koe_video_aaaaaaaaa.setAttribute('name', 'media');
  // 监听音乐加载完成的事件
  koe_video_aaaaaaaaa.addEventListener('canplaythrough', function () {
    // 移除左上角提示
    koe_msg_aaaaaaaaa.remove();
    // 设置加载完成
    koe_loaded_aaaaaaaaa = true;
    // 开启计时器，每 0.2 秒执行一次，检查音乐播放进度
    koe_timer_aaaaaaaaa = setInterval(function () {
      // 当音乐播放到 13.5 秒时
      if (koe_video_aaaaaaaaa.currentTime > 13.5) {
        // 调用 来たぁぁぁぁぁぁぁぁぁぁ
        koe_kitaaaaaaaaaa();
        // 清除当前计时器
        clearInterval(koe_timer_aaaaaaaaa);
        // 将变量设置为空
        koe_timer_aaaaaaaaa = null;
      }
    }, 200);
  });
  // 监听暂停 让正在播放设为 false
  koe_video_aaaaaaaaa.addEventListener('pause', function () {
    koe_played_aaaaaaaaa = false;
  });
  // 监听播放 让正在播放设为 true
  koe_video_aaaaaaaaa.addEventListener('play', function () {
    koe_played_aaaaaaaaa = true;
  });
  // 添加音乐资源
  var koe_source_aaaaaaaaa = document.createElement('source');
  koe_source_aaaaaaaaa.setAttribute(
    'src',
    'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9FUUlIVkVMMHo0eDhGSFE/ZT0xVE8zR3E=.mp3'
  );
  koe_source_aaaaaaaaa.setAttribute('type', 'audio/mpeg');
  koe_video_aaaaaaaaa.appendChild(koe_source_aaaaaaaaa);
  document.body.appendChild(koe_video_aaaaaaaaa);

  // [if-0] 否则判断一下是否加载完成
} else {
  if (koe_loaded_aaaaaaaaa) {
    // 判断是否正在播放 控制暂停或继续播放
    if (koe_played_aaaaaaaaa) {
      document.querySelector('#koe_video_aaaaaaaaa').pause();
    } else {
      document.querySelector('#koe_video_aaaaaaaaa').play();
    }
  }
}
void(0);
