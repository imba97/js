// 判断有没有创建 style 效果
if (typeof koe_searcher_style === 'undefined') {
  // 新建 style 效果
  var koe_searcher_style = document.createElement('style');
  // 设置按钮效果
  koe_searcher_style.innerText =
    '.koe_searcher_button{ position: fixed;top:100px;padding:5px 10px;background-color: #FFF;border:1px #000 solid;border-radius:5px;font-size:30px; }';
  document.head.appendChild(koe_searcher_style);
  // 创建 stop 按钮
  var koe_searcher_stop = document.createElement('button');
  koe_searcher_stop.innerText = '停止';
  koe_searcher_stop.setAttribute('class', 'koe_searcher_button');
  koe_searcher_stop.setAttribute('style', 'left:50px;');
  document.body.appendChild(koe_searcher_stop);
  // 创建 countiue 按钮
  var koe_searcher_countiue = document.createElement('button');
  koe_searcher_countiue.innerText = '继续';
  koe_searcher_countiue.setAttribute('class', 'koe_searcher_button');
  koe_searcher_countiue.setAttribute('style', 'left:150px;display:none');
  document.body.appendChild(koe_searcher_countiue);
  // 设置计时器
  var koe_searcher_timer = null;
  // 监听 stop 按钮点击事件
  koe_searcher_stop.addEventListener('click', function () {
    // 如果没有计时器 则不继续执行
    if (koe_searcher_timer === null) return;
    // 否则 清空计时器
    clearInterval(koe_searcher_timer);
    koe_searcher_timer = null;
    // 隐藏 stop、countiue 按钮
    koe_searcher_stop.style.display = 'none';
    koe_searcher_countiue.style.display = 'none';
  });
  // 监听 countiue 按钮点击事件
  koe_searcher_countiue.addEventListener('click', function () {
    // 隐藏 countiue 按钮
    koe_searcher_countiue.style.display = 'none';
    // 让 是否继续 等于 true
    koe_searcher_is_countiue = true;
  });
}
// 获取输入的关键词
var koe_searcher_keyword = prompt('请输入关键词');
// 如果关键词 不等于 空 或 null
if (koe_searcher_keyword !== '' && koe_searcher_keyword !== null) {
  // 设置 是否继续 为 true
  var koe_searcher_is_countiue = true;
  // 根据关键词 实例化正则表达式
  var koe_searcher_reg = new RegExp('(' + koe_searcher_keyword + ')');
  // 创建计时器
  koe_searcher_timer = setInterval(function () {
    // 如果 继续执行 等于 false 直接停止
    if (!koe_searcher_is_countiue) return;
    // 选取所有需要查询的 element，并且没有 koe_searcher_class 这个 class 的，用 forEach 循环遍历
    document
      .querySelectorAll(
        '.reply-item .real-reply .content-list:not(.koe_searcher_class),.reply-item .orginal-reply:not(.koe_searcher_class),.reply-item .name-field a:not(.koe_searcher_class)'
      )
      .forEach(function (element) {
        // 如果 遍历中途 继续执行 等于 false 也直接停止
        if (!koe_searcher_is_countiue) return;
        // 添加 koe_searcher_class 这个 class，下次就不会被选取了
        element.setAttribute(
          'class',
          element.getAttribute('class') + ' koe_searcher_class'
        );
        // 如果找到关键词
        if (koe_searcher_reg.test(element.innerText)) {
          // 用字符串替换，把关键词替换成 <font> 标签，这上面设置了背景色、文本大小、文本加粗
          element.innerHTML = element.innerText.replace(
            koe_searcher_reg,
            '<font style="padding:3px;background-color:#FF0;font-size:18px;font-weight:700">$1</font>'
          );
          // 让 继续执行 等于 false
          koe_searcher_is_countiue = false;
          // 显示 countiue 按钮
          koe_searcher_countiue.style.display = 'block';
          // 设置 评论滚动到最顶端 用于后面获取 最新一个关键词所在页面位置 ( top, left )
          document.querySelector('.space-right-bottom').scrollTop = 0;
          // 获取 最新一个关键词所在位置，$ 是 jQuery 封装好的选择器，直接把原生 js 的 Element 对象传进去，调用 offset() 就会返回 { top, left }，然后取出 top 再减 200
          document.querySelector('.space-right-bottom').scrollTop = $(element).offset().top - 200;
        }
      });

    // 如果 继续执行 等于 true
    if (koe_searcher_is_countiue)
      // 让评论滚动到最底部
      document.querySelector(
        '.space-right-bottom'
      ).scrollTop = document.querySelector('.router-view').clientHeight;
  }, 1000);
}
