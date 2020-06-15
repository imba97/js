// 背景
var koe_16_background = document.createElement('div');
koe_16_background.setAttribute(
  'style',
  'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #FFF; overflow-x: auto; z-index: 99999;'
);

// 图片
var koe_16_img = document.createElement('div');
koe_16_img.setAttribute(
  'style',
  'margin: 50px auto; width: 800px; height: 414px; background-image: url(https://s1.hdslb.com/bfs/static/blive/blfe-live-room/static/img/room-block.abb1110.png);'
);

// 第一行字
var koe_16_text_1 = document.createElement('p');
koe_16_text_1.innerText = '这个房间已经被封禁（至 1970-01-01 00:00:00）！(╯°口°)╯(┴—┴';
koe_16_text_1.setAttribute(
  'style',
  'text-align: center; font-size: 18px; color: #666;'
);

// 第二行字
var koe_16_text_2 = document.createElement('p');
koe_16_text_2.innerHTML = '<span>3</span> 秒后将跳转至首页，如果您的浏览器没有跳转，请<a href="/" class="bili-link">点击这里</a>';
koe_16_text_2.setAttribute(
  'style',
  'margin-top: 50px; text-align: center; font-size: 16px; color: #999;'
);

// 倒计时 3 秒
var koe_16_n = 3;
var koe_16_timer = setInterval(function () {
  // 设置第二行字中 span 内容为 --koe_16_n
  koe_16_text_2.children[0].innerText = --koe_16_n;
  // 减到 0 则跳转
  if (koe_16_n === 0) {
    koe_16_text_2.innerText = '有缘再会 _(•̀ᴗ•́ 」∠ ❀)_';
    clearInterval(koe_16_timer);
    setTimeout('window.location.href = "/";', 1000);
  }
}, 1000);

// 在背景元素中添图片和两行字
koe_16_background.appendChild(koe_16_img);
koe_16_background.appendChild(koe_16_text_1);
koe_16_background.appendChild(koe_16_text_2);

// 把背景元素添加到 body 上
document.body.appendChild(koe_16_background);
// 设置 body 超出内容隐藏（隐藏滚动条）
document.body.style.overflow = 'hidden';
void 0;
