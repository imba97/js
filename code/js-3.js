// 设置一个变量 存储选择器字符串
var koe_selector = '';
// 在空间页
if (/^https:\/\/space\.bilibili\.com\/\d+/.test(window.location.href))
  koe_selector = '#h-avatar';
// 在视频页
else if (/^https:\/\/www\.bilibili\.com\/video/.test(window.location.href))
  koe_selector = '.up-face';
// 用正则表达式匹配高清图，在用 window.open() 打开
window.open(
  /^(\/\/.*\/bfs\/face\/([a-z0-9]|member\/noface)+\.(jpe?g|png|gif))/.exec(
    document.querySelector(koe_selector).getAttribute('src')
  )[1]
);
