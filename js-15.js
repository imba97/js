// 最终请求：http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=zh_CN&q=test
// 但无法跨域，于是自己写了个PHP

// 根据浏览器获取 网络请求 对象
var koe_xhr = null;
if (window.XMLHttpRequest) koe_xhr = new XMLHttpRequest();
if (window.ActiveXObject) koe_xhr = new ActiveXObject('Microsoft.XMLHTTP');

// 如果成功获取 网络请求 对象
if (koe_xhr !== null) {
  // 监听状态变化
  koe_xhr.onreadystatechange = function () {
    // 当 redayState 等于 4 并且 status 等于 200，就是请求成功
    if (koe_xhr.readyState === 4 && koe_xhr.status === 200) {
      // 将 json 字符串 转为 json 对象
      var json = JSON.parse(koe_xhr.responseText);

      // 获取 文本 显示的元素
      var koe_xhr_text = document.querySelector('#koe_xhr_text');
      // 如果没获取到
      if (koe_xhr_text === null) {
        // 则创建
        koe_xhr_text = document.createElement('p');
        koe_xhr_text.setAttribute('id', 'koe_xhr_text');
        koe_xhr_text.setAttribute(
          'style',
          'position: fixed; top: 0; left: 0; padding: 3px; background-color: #000; color: #FFF; font-size: 26px;'
        );
        document.body.appendChild(koe_xhr_text);
      }
      // 然后设置文本内容为 翻译结果
      koe_xhr_text.innerText = json.sentences[0].trans;
    }
  };
  // 设置请求类型、请求链接、是否异步
  koe_xhr.open(
    'GET',
    'https://bili.imba97.cn/translate.php?kw=' + window.getSelection().toString(),
    true
  );
  // 发送请求
  koe_xhr.send(null);
}
