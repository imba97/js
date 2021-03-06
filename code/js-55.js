(function () {
  // 已获取的评论 ID
  var rpids = [];
  var options = {};

  var box = document.querySelector('#bnj2021');
  var list = document.querySelector('.bnj2021-list');

  if (box === null) {
    var style = document.createElement('style');
    style.innerText =
      '#bnj2021 { position: fixed; top: 0; left: 0; z-index: 9999999; } .bnj2021-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.75; background-color: #000; z-index: -1; } .bnj2021-list { list-style: none; } .bnj2021-list li { color: #FFF; font-size: 30px; } ';
    document.head.appendChild(style);

    box = document.createElement('div');
    box.setAttribute('id', 'bnj2021');

    var bg = document.createElement('div');
    bg.setAttribute('class', 'bnj2021-bg');

    list = document.createElement('ul');
    list.setAttribute('class', 'bnj2021-list');
    list.innerHTML = '<li>已开启</li>';

    box.appendChild(bg);
    box.appendChild(list);

    document.body.appendChild(box);

    setInterval(function () {
      request();
    }, 10000);
  }

  function view() {
    list.innerHTML = '<li>已开启</li>';
    Object.keys(options).forEach(function (key) {
      var li = document.createElement('li');
      li.innerHTML =
        '第' +
        key +
        '题预测：A: ' +
        options[key].A +
        ', B: ' +
        options[key].B +
        ', C: ' +
        options[key].C +
        ', D: ' +
        options[key].D;
      list.appendChild(li);
    });
  }

  function request() {
    var xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      'https://api.bilibili.com/x/v2/reply?jsonp=jsonp&type=1&oid=373561162&sort=0&ps=30&pn=1',
      true
    );
    xhr.withCredentials = true;
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        json.data.replies.forEach(function (item, index) {
          if (rpids.indexOf(item.rpid) === -1) {
            var reg = /第?(一|二|三|四|五|六|七|八|九|十|0-9)题([^abcdABCD])(a|b|c|d|A|B|C|D)/.exec(
              item.content.message
            );
            console.log(reg);
            if (reg !== null) {
              var number = 0;
              switch (reg[1]) {
                case '一':
                  number = 1;
                  break;
                case '二':
                  number = 2;
                  break;
                case '三':
                  number = 3;
                  break;
                case '四':
                  number = 4;
                  break;
                case '五':
                  number = 5;
                  break;
                case '六':
                  number = 6;
                  break;
                case '七':
                  number = 7;
                  break;
                case '八':
                  number = 8;
                  break;
                case '九':
                  number = 9;
                  break;
                case '十':
                  number = 10;
                  break;
              }

              if (typeof options[number] === 'undefined') {
                options[number] = {
                  A: 0,
                  B: 0,
                  C: 0,
                  D: 0
                };
              }

              var opt = reg[3].toUpperCase();
              options[number][opt] += 1;
            }
            rpids.push(item.rpid);
          }
        });
        console.log(options);
        view();
      }
    };
  }
})();
void 0;
