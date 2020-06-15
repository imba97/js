// koe_open_url_click_num 记录点击次数 默认 0
if (typeof koe_open_url_click_num === 'undefined')
  var koe_open_url_click_num = 0;

// koe_open_url_timer 延迟 计时器
if (typeof koe_open_url_timer === 'undefined') var koe_open_url_timer = null;

// 如果有计时器则删除（因为每次点击需要重置计时器）
if (koe_open_url_timer !== null) clearTimeout(koe_open_url_timer);

// [if-0] koe_open_url_data_id 链接的 id
// 第一次点击时把文本链接转为可点链接
if (typeof koe_open_url_data_id === 'undefined') {
  // 默认 0
  var koe_open_url_data_id = 0;
  // 用正则表达式匹配简介的HTML 并重新赋值为 带有a标签的链接
  document.querySelector('#v_desc .info').innerHTML = document
    .querySelector('#v_desc .info')
    .innerHTML.replace(
      /([^"]|^)((?:https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g,
      function (m1, m2, m3) {
        /* 
          replace 函数
          第一个参数用的是匹配链接的正则表达式
          第二个用了一个 callback 函数，参数分别是正则整个匹配的结果和括号匹配结果
        */
        koe_open_url_data_id++;
        // 返回a标签 并设置 class 和 data-id
        return (
          m2 +
          '<a class="koe_open_url_class" data-id="' +
          koe_open_url_data_id +
          '" href="' +
          m3 +
          '" target="_blank">' +
          m3 +
          '</a>'
        );
      }
    );
  // 获取所有转换好的链接
  var koe_open_url_class = document.querySelectorAll('.koe_open_url_class');

  // 如果只有一个链接 则直接打开
  if (koe_open_url_class.length === 1) {
    window.open(koe_open_url_class[0].getAttribute('href'));
  }

  // [if-0] 非第一次点击则切换超链接 并打开
} else {
  // [if-1] 如果只有一个链接 则直接打开
  if (koe_open_url_class.length === 1) {
    window.open(koe_open_url_class[0].getAttribute('href'));
    // [if-1] 否则会在多个链接中切换
  } else {
    // 判断点击次数 如果大于等于链接数 就让它等于 1 否则 +1
    koe_open_url_click_num =
      koe_open_url_click_num >= koe_open_url_data_id
        ? 1
        : ++koe_open_url_click_num;
    // 清除链接文字颜色
    koe_open_url_clear_color();
    // 获取当前选中的链接 更改文本颜色
    var koe_open_url_a = document.querySelector(
      '.koe_open_url_class[data-id="' + koe_open_url_click_num + '"]'
    );
    koe_open_url_a.style.color = '#F66';
    // 开启 1秒延迟
    koe_open_url_timer = setTimeout(function () {
      // 时间到后打开链接、重置点击次数、清除颜色
      window.open(koe_open_url_a.getAttribute('href'));
      koe_open_url_click_num = 0;
      koe_open_url_clear_color();
    }, 1000);
  }
}
// 清除颜色 选取所有链接 把 style color 设置为空
if (typeof koe_open_url_clear_color === 'undefined') {
  function koe_open_url_clear_color() {
    koe_open_url_class.forEach(function (element) {
      element.style.color = '';
    });
  }
}
void 0;
