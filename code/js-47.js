if(typeof koe_47_p === 'undefined') {
  var koe_47_p = document.createElement('p');
  koe_47_p.setAttribute('style', 'position: fixed; top: 50%; left: 50%; padding: 10px; font-size: 20px; color: #FFF; background-color: #000; -webkit-transform: translate(-50%, -50%); -moz-transform: translate(-50%, -50%); transform: translate(-50%, -50%); z-index: 99999999; display: none;');
  koe_47_p.ondblclick = function() {
    this.style.display = 'none';
  }
  document.body.appendChild(koe_47_p);
}
var koe_47_selected = window
  .getSelection()
  .toString()
  .replace(/(^\s+|\s+$)/, '');
if (koe_47_selected !== '') {
  var koe_47_xhr = new XMLHttpRequest();
  koe_47_xhr.open(
    'GET',
    'https://bili.imba97.cn/ji.php?kw=' + koe_47_selected,
    true
  );
  koe_47_xhr.send();
  koe_47_xhr.onreadystatechange = function () {
    if (koe_47_xhr.readyState === 4 && koe_47_xhr.status === 200) {
      var json = JSON.parse(koe_47_xhr.responseText);
      koe_47_p.innerHTML = json.data.replace(/(\\n|\\r)/g, '') + '【<a style="color: #FFF; font-weight: 700;" target="_blank" href="https://jikipedia.com/search?phrase=' + koe_47_selected + '">查看详情</a>】';
      koe_47_p.style.display = 'block';
    }
  };
} else {
  koe_47_p.style.display = 'none';
}
