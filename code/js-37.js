/*

audio

开盖儿：https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9UNHlNQjJnc2RXa3k1WEE=.mp3

chronosphere ready：https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9SRXhaWW1mcWN1ZDNBNVE=.mp3

释放中循环声：https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9TQ3RiNjJQQXFMNFdSdWc=.mp3

chronosphere ready 释放：https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9RLTV6RXJ2NGtKMFNSTUE=.mp3

chronosphere activated：https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9QdWY1R05ydW5vUFptcnc=.mp3

img

ass♂：https://pic.downk.cc/item/5efb496114195aa594a42110.png

loop_image：https://pic.downk.cc/item/5efb4d6014195aa594a5b1fa.gif

close：https://pic.downk.cc/item/5efb4d6014195aa594a5b1fd.gif

open：https://pic.downk.cc/item/5efb4d6014195aa594a5b201.gif

特效 1 创建：https://pic.downk.cc/item/5efb53b814195aa594a8044e.gif

特效 1 loop：https://pic.downk.cc/item/5efb546314195aa594a83f51.gif

特效 1 结束：https://pic.downk.cc/item/5efb53b814195aa594a80452.gif

特效 2：https://pic.downk.cc/item/5eff2e4714195aa5941dc372.gif

*/

if (typeof Chronosphere === 'undefined') {
  function Chronosphere() {
    // setup
    this.baseSetup = {
      is_ready: false,
      is_select_target: false,
      is_activated: false,
      select_target: {
        x: 0,
        y: 0,
      },
      scroll: {
        top: 0,
        left: 0,
      },
      size: {
        width: 500,
        height: 500,
      },
      timeout: {
        ready_before: 2000,
        open: 1200,
        effe_1: 1000,
        effe_2: 1600,
      },
      chronosphere_style: document.createElement('style'),
      progress_style: document.createElement('style'),
      iframe: document.createElement('iframe'),
      select_target_mouseover: function () {},
      select_target_mouseout: function () {},
    };
    // 判断媒体是否加载完成
    this.mediaIsLoaded = {};

    // 存放媒体 dom
    this.mediaDom = {};

    // 图片、音频 信息
    this.mediaInfo = [
      {
        type: 'img',
        name: 'mouse',
        src: 'https://test.imba97.cn/chronosphere/mouse.png',
      },
      {
        type: 'img',
        name: 'ass♂',
        src: 'https://test.imba97.cn/chronosphere/ass♂.png',
      },
      {
        type: 'img',
        name: 'open',
        src: 'https://test.imba97.cn/chronosphere/open.gif',
      },
      {
        type: 'img',
        name: 'loop',
        src: 'https://test.imba97.cn/chronosphere/loop.gif',
      },
      {
        type: 'img',
        name: 'close',
        src: 'https://test.imba97.cn/chronosphere/close.gif',
      },
      {
        type: 'img',
        name: 'effe_1_create',
        src: 'https://test.imba97.cn/chronosphere/effe_1_create.gif',
      },
      {
        type: 'img',
        name: 'effe_1_loop',
        src: 'https://test.imba97.cn/chronosphere/effe_1_loop.gif',
      },
      {
        type: 'img',
        name: 'effe_1_end',
        src: 'https://test.imba97.cn/chronosphere/effe_1_end.gif',
      },
      {
        type: 'img',
        name: 'effe_2_1',
        src: 'https://test.imba97.cn/chronosphere/effe_2_1.gif',
      },
      {
        type: 'img',
        name: 'effe_2_2',
        src: 'https://test.imba97.cn/chronosphere/effe_2_2.gif',
      },
      {
        type: 'audio',
        name: 'before_ready',
        src: 'https://test.imba97.cn/chronosphere/before_ready.mp3',
      },
      {
        type: 'audio',
        name: 'ready',
        src: 'https://test.imba97.cn/chronosphere/ready.mp3',
      },
      {
        type: 'audio',
        name: 'loop_sound',
        src: 'https://test.imba97.cn/chronosphere/loop_sound.mp3',
      },
      {
        type: 'audio',
        name: 'use_ready',
        src: 'https://test.imba97.cn/chronosphere/use_ready.mp3',
      },
      {
        type: 'audio',
        name: 'activated',
        src: 'https://test.imba97.cn/chronosphere/activated.mp3',
      },
    ];

    // 其他 dom 信息
    this.otherDomInfo = [
      {
        type: 'div',
        name: 'base',
      },
      {
        type: 'p',
        name: 'progress',
      },
      {
        type: 'p',
        name: 'progress_text',
        innerText: '超时空传输中 0%',
      },
      {
        type: 'div',
        name: 'select_target',
      },
      {
        type: 'div',
        name: 'div',
      },
      {
        type: 'div',
        name: 'target_div',
      },
    ];

    // 其他 dom
    this.otherDom = {};

    this.requestUrl =
      'https://bili.imba97.cn/chronosphere.php?url=' + window.location.href;
    this.xhr = new XMLHttpRequest();
    var self = this;
    this.xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var json = JSON.parse(this.responseText);
        console.log(json);
        if (json.type === 'get') {
          self.createIframe(json.url);
        }
      }
    };
  }

  /**
   * 初始化：添加 style、添加其他 dom
   */
  Chronosphere.prototype.init = function () {
    // 添加 style
    this.baseSetup.chronosphere_style.innerText = `

      .chronosphere {
        display: none;
      }

      .chronosphere_mouse {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 200;
      }

      .chronosphere_base,
      .chronosphere_select_target {
        position: fixed;
        z-index: 9999999;
        display: none;
        overflow: hidden;
      }

      .chronosphere_base {
        bottom: 0;
        right: 0;
        width: 580px;
        height: 350px;
      }

      .chronosphere_select_target {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: none;
      }

      .chronosphere_ass♂,
      .chronosphere_open,
      .chronosphere_loop,
      .chronosphere_close {
        position: absolute;
        z-index: 100;
      }

      .chronosphere_effe_1_create,
      .chronosphere_effe_1_loop,
      .chronosphere_effe_1_end,
      .chronosphere_effe_2_1,
      .chronosphere_effe_2_2 {
        position: absolute;
        z-index: 9999990;
      }

      .chronosphere_ass♂,
      .chronosphere_open {
        display: block;
      }

      .chronosphere_ass♂ {
        top: 0;
        left: 0;
      }

      .chronosphere_open {
        top: 74px;
        left: 140px;
      }
      
      .chronosphere_loop {
        top: 78px;
        left: 145px;
        opacity: 0;
      }

      .chronosphere_close {
        top: 81px;
        left: 141px;
      }

      .chronosphere_div,
      .chronosphere_target_div {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }

      .chronosphere_div {
        background-color: #000;
        z-index: 9999999;
      }
      .chronosphere_target_div {
        overflow: hidden;
        z-index: 9999990;
      }

      .chronosphere_progress_text,
      .chronosphere_progress {
        position: fixed;
        top: 0;
        left: 0;
        margin: 0 !important;
        padding: 0 !important;
      }

      .chronosphere_progress_text,
      .chronosphere_progress {
        width: 230px;
        height: 30px;
      }

      .chronosphere_progress_text {
        line-height: 30px;
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        color: #FFF;
        z-index: 999999;
      }

      .chronosphere_progress {
        background-color: #999;
        z-index: 999980;
      }
      .chronosphere_progress::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 30px;
        background-color: #009966;
      }

    `;
    document.head.appendChild(this.baseSetup.chronosphere_style);

    // 初始化 其他 dom
    var self = this;
    this.otherDomInfo.forEach(function (item) {
      self.otherDom[item.name] = document.createElement(item.type);
      // 自动添加 class
      self.otherDom[item.name].setAttribute(
        'class',
        'chronosphere_' + item.name
      );
      if (typeof item.innerText !== 'undefined')
        self.otherDom[item.name].innerText = item.innerText;
      document.body.appendChild(self.otherDom[item.name]);
    });

    this.preload();
  };

  Chronosphere.prototype.preload = function () {
    // 用于 forEach 的匿名函数，我知道 es6 箭头函数可以直接用 this，但我就是要用 es5，你打我呀
    var self = this;

    // 循环 mediaInfo
    this.mediaInfo.forEach(function (item, index) {
      // 设置未加载完成
      self.mediaIsLoaded[item.name] = false;
      // 创建 dom
      self.mediaDom[item.name] = document.createElement(item.type);
      // 指定 src
      self.mediaDom[item.name].src = item.src;

      // 监听预加载完成 让 mediaIsLoaded 相应的 name 变为 true
      if (item.type === 'img') {
        // 添加 class
        self.mediaDom[item.name].setAttribute(
          'class',
          'chronosphere chronosphere_' + item.name
        );
        // 监听 img 预加载 完成
        self.mediaDom[item.name].onload = function () {
          self.mediaIsLoaded[item.name] = true;
          self.preloadView();
        };
      } else if (item.type === 'audio') {
        // 监听 audio 预加载 完成
        self.mediaDom[item.name].addEventListener(
          'canplaythrough',
          function () {
            self.mediaIsLoaded[item.name] = true;
            self.preloadView();
          }
        );
      }

      // 修正图片的相对位置，因为发射井和核弹是分开的，baseSetup 控制整体定位，如果 mediaInfo 中有自己的定位，则会跟 baseSetup 相加
      if (typeof item.top !== 'undefined')
        self.mediaDom[item.name].style.top =
          self.baseSetup.position.top + item.top + 'px';
      if (typeof item.left !== 'undefined')
        self.mediaDom[item.name].style.left =
          self.baseSetup.position.left + item.left + 'px';
      if (typeof item.bottom !== 'undefined')
        self.mediaDom[item.name].style.bottom =
          self.baseSetup.position.bottom + item.bottom + 'px';
      if (typeof item.right !== 'undefined')
        self.mediaDom[item.name].style.right =
          self.baseSetup.position.right + item.right + 'px';

      // 添加到 base
      if (/effe/.test(item.name)) {
        document.body.appendChild(self.mediaDom[item.name]);
      } else {
        self.otherDom.base.appendChild(self.mediaDom[item.name]);
      }

      // 进度条 根据媒体个数自动设置百分比
      var percent = parseInt((100 / self.mediaInfo.length) * (index + 1));
      self.baseSetup.progress_style.innerText +=
        '.chronosphere_progress[data-preload="' +
        (index + 1) +
        '"]::before { width: ' +
        percent +
        '%; } ';
    });

    // 进度条 style 添加至 head
    document.head.appendChild(self.baseSetup.progress_style);
  };

  /**
   * 渲染预加载进度的页面显示
   */
  Chronosphere.prototype.preloadView = function () {
    var n = 0;
    // 取出 mediaIsLoaded 的值转为数组，用 some 遍历，如果值为 true 就 ++n
    Object.values(this.mediaIsLoaded).some(function (v) {
      if (v) ++n;
    });
    // 设置 data-preload，预加载媒体的个数，控制进度条
    this.otherDom.progress.setAttribute('data-preload', n);
    // 计算百分比
    var percent = parseInt((100 / this.mediaInfo.length) * n);
    // 设置 文字的百分比
    this.otherDom.progress_text.innerText = '超时空传输中 ' + percent + '%';
    // chronosphere Missile Ready
    if (n === this.mediaInfo.length) {
      this.chronosphereReadyBefore();
    }
  };

  Chronosphere.prototype.chronosphereReadyBefore = function () {
    if (this.baseSetup.is_ready) return;
    this.baseSetup.is_ready = true;

    var self = this;
    this.mediaDom.before_ready.play();

    this.otherDom.base.style.display = 'block';
    this.mediaDom.loop.style.display = 'block';
    setTimeout(function () {
      self.mediaDom.open.style.display = 'none';
      self.mediaDom.loop.style.opacity = 1;
      self.mediaDom.loop_sound.loop = true;
      self.mediaDom.loop_sound.play();
    }, this.baseSetup.timeout.open);

    setTimeout(function () {
      self.chronosphereReady();
    }, this.baseSetup.timeout.open + this.baseSetup.timeout.ready_before);
  };

  Chronosphere.prototype.chronosphereReady = function () {
    var self = this;

    this.mediaDom.ready.play();

    this.otherDom.select_target.style.display = 'block';

    this.baseSetup.select_target_mouseover = function () {
      self.mediaDom.mouse.style.display = 'block';
    };
    this.baseSetup.select_target_mouseout = function () {
      self.mediaDom.mouse.style.display = 'none';
    };
    this.otherDom.select_target.addEventListener(
      'mouseover',
      this.baseSetup.select_target_mouseover
    );
    this.otherDom.select_target.addEventListener(
      'mouseout',
      this.baseSetup.select_target_mouseout
    );

    this.baseSetup.iframe = document.createElement('iframe');
    this.baseSetup.iframe.src = window.location.href;
    this.otherDom.target_div.appendChild(this.baseSetup.iframe);
    document.body.appendChild(this.otherDom.target_div);
    this.baseSetup.iframe.setAttribute('style', 'border: none;');
    this.baseSetup.iframe.style.width =
      document.documentElement.clientWidth + 'px';
    this.baseSetup.iframe.style.height =
      document.documentElement.clientHeight + 'px';
    this.otherDom.target_div.style.width = this.baseSetup.size.width + 'px';
    this.otherDom.target_div.style.height = this.baseSetup.size.height + 'px';

    // 监听 选取目标 div 的鼠标移动事件
    this.otherDom.select_target.addEventListener('mousemove', function (e) {
      // 获取滚动条高度
      var scrollTop =
        document.body.scrollTop !== 0
          ? document.body.scrollTop
          : document.documentElement.scrollTop;

      // 改变 鼠标图片 top 为 鼠标 Y 坐标 - 滚动条高度 - 鼠标图片宽度 / 2
      self.mediaDom.mouse.style.top =
        e.pageY - scrollTop - self.mediaDom.mouse.clientHeight / 2 + 'px';
      // 判断 鼠标 X 坐标 大于 0 并且 小于 body 宽度 - 鼠标图片宽度 / 2
      // 改变 鼠标图片 left 为 鼠标 X 坐标 - 鼠标图片宽度 / 2
      if (
        e.pageX > 0 &&
        e.pageX <
          document.body.clientWidth - self.mediaDom.mouse.clientWidth / 2
      )
        self.mediaDom.mouse.style.left =
          e.pageX - self.mediaDom.mouse.clientWidth / 2 + 'px';
    });

    this.otherDom.select_target.addEventListener('click', function (e) {
      var position = {
        x: e.pageX,
        y: e.pageY,
      };

      if (self.baseSetup.is_select_target) {
        if (!self.baseSetup.is_activated) self.create_effe_2(position);
        self.baseSetup.is_activated = true;
        return;
      }

      // 点第一次的时候
      self.baseSetup.is_select_target = true;
      self.mediaDom.loop_sound.pause();
      self.mediaDom.use_ready.play();

      self.baseSetup.scroll.top = document.documentElement.scrollTop;
      self.baseSetup.scroll.left = document.documentElement.scrollLeft;

      self.create_effe_1(position);
    });
  };

  Chronosphere.prototype.create_effe_1 = function (position) {
    var self = this;

    this.baseSetup.select_target = position;

    this.mediaDom.effe_1_create.style.display = 'block';
    this.mediaDom.effe_1_create.style.top =
      position.y - this.mediaDom.effe_1_create.clientHeight / 2 + 'px';
    this.mediaDom.effe_1_create.style.left =
      position.x - this.mediaDom.effe_1_create.clientWidth / 2 + 'px';
    setTimeout(function () {
      self.mediaDom.effe_1_create.style.display = 'none';
      self.mediaDom.effe_1_loop.style.display = 'block';
      self.mediaDom.effe_1_loop.style.top =
        position.y - 100 - self.mediaDom.effe_1_loop.clientHeight / 2 + 'px';
      self.mediaDom.effe_1_loop.style.left =
        position.x - self.mediaDom.effe_1_loop.clientWidth / 2 + 'px';
    }, this.baseSetup.timeout.effe_1);
  };

  Chronosphere.prototype.create_effe_2 = function (position) {
    var self = this;

    this.otherDom.select_target.style.cursor = 'default';
    this.mediaDom.mouse.style.display = 'none';
    // 删除 mouseover mouseout 监听
    this.otherDom.select_target.removeEventListener(
      'mouseover',
      this.baseSetup.select_target_mouseover
    );
    this.otherDom.select_target.removeEventListener(
      'mouseout',
      this.baseSetup.select_target_mouseout
    );

    this.mediaDom.activated.play();
    this.mediaDom.loop.style.display = 'none';
    this.mediaDom.close.style.display = 'block';

    this.mediaDom.effe_1_loop.style.display = 'none';
    this.mediaDom.effe_2_1.style.display = 'block';
    this.mediaDom.effe_2_1.style.top =
      this.baseSetup.select_target.y -
      this.mediaDom.effe_2_1.clientHeight / 2 +
      'px';
    this.mediaDom.effe_2_1.style.left =
      this.baseSetup.select_target.x -
      this.mediaDom.effe_2_1.clientWidth / 2 +
      'px';

    this.mediaDom.effe_2_2.style.display = 'block';
    this.mediaDom.effe_2_2.style.top =
      position.y - this.mediaDom.effe_2_2.clientHeight / 2 + 'px';
    this.mediaDom.effe_2_2.style.left =
      position.x - this.mediaDom.effe_2_2.clientWidth / 2 + 'px';
    setTimeout(function () {
      self.activated(position);
    }, this.baseSetup.timeout.effe_2);
  };

  Chronosphere.prototype.activated = function (position) {
    var self = this;

    self.mediaDom.effe_2_1.style.display = 'none';
    self.mediaDom.effe_2_2.style.display = 'none';

    this.otherDom.div.style.width = this.baseSetup.size.width + 'px';
    this.otherDom.div.style.height = this.baseSetup.size.height + 'px';
    this.otherDom.div.style.top =
      this.baseSetup.select_target.y - this.baseSetup.size.width / 2 + 'px';
    this.otherDom.div.style.left =
      this.baseSetup.select_target.x - this.baseSetup.size.height / 2 + 'px';

    this.baseSetup.iframe.style.display = 'block';
    this.baseSetup.iframe.contentDocument.documentElement.scrollTop =
      self.baseSetup.scroll.top - this.baseSetup.size.height / 2;
    this.baseSetup.iframe.contentDocument.documentElement.scrollLeft =
      self.baseSetup.scroll.left;
    this.otherDom.target_div.style.top =
      position.y - this.baseSetup.size.width / 2 + 'px';
    this.otherDom.target_div.style.left =
      position.x - this.baseSetup.size.height / 2 + 'px';
    this.otherDom.target_div.scrollTop =
      this.baseSetup.select_target.y - this.baseSetup.size.height / 2;
    this.otherDom.target_div.scrollLeft =
      this.baseSetup.select_target.x - this.baseSetup.size.width / 2;

    var opacity = 0.0;
    var opacity_timer = setInterval(function () {
      opacity += 0.1;
      self.otherDom.div.style.opacity = opacity;
      self.otherDom.target_div.style.opacity = opacity;
      if (opacity > 1) {
        self.otherDom.div.style.opacity = 1;
        self.otherDom.target_div.style.opacity = 1;
        clearInterval(opacity_timer);
      }
    }, 50);
  };

}

var chronosphere = new Chronosphere();
chronosphere.init();

/** plan B 👇 */

Chronosphere.prototype.sendRequest = function () {
  this.xhr.open('GET', this.requestUrl, false);
  this.xhr.send();
};

Chronosphere.prototype.createIframe = function (url) {
  var chronosphere_style = document.createElement('style');
  chronosphere_style.innerText =
    ' *:not(.chronosphere_iframe) { overflow: hidden; } .chronosphere_iframe { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #FFF; z-index: 999999999; }  ';
  document.head.appendChild(chronosphere_style);
  var chronosphere_iframe = document.createElement('iframe');
  chronosphere_iframe.src = url;
  chronosphere_iframe.setAttribute('class', 'chronosphere_iframe');
  document.body.appendChild(chronosphere_iframe);
};

/** plan B 👆 */