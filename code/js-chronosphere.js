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

特效 2 创建：https://pic.downk.cc/item/5efb58b514195aa594a9cb65.gif

特效 2 loop：https://pic.downk.cc/item/5efb58b514195aa594a9cb69.gif

特效 2 结束：https://pic.downk.cc/item/5efb58b514195aa594a9cb70.gif

*/

if (typeof Chronosphere === 'undefined') {
  function Chronosphere() {
    // setup
    this.baseSetup = {
      is_ready: false,
      is_activated: false,
      select_target: {
        x: 0,
        y: 0,
      },
      position: {
        top: 50,
        left: 50,
        bottom: 0,
        right: -100,
      },
      timeout: {},
      chronosphere_style: document.createElement('style'),
      progress_style: document.createElement('style'),
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
        src: 'https://pic.downk.cc/item/5efb563614195aa594a8d9fa.png',
      },
      {
        type: 'img',
        name: 'ass♂',
        src: 'https://pic.downk.cc/item/5efb496114195aa594a42110.png',
      },
      {
        type: 'img',
        name: 'open',
        src: 'https://pic.downk.cc/item/5efb4d6014195aa594a5b201.gif',
      },
      {
        type: 'img',
        name: 'loop_image',
        src: 'https://pic.downk.cc/item/5efb4d6014195aa594a5b1fa.gif',
      },
      {
        type: 'img',
        name: 'close',
        src: 'https://pic.downk.cc/item/5efb4d6014195aa594a5b1fd.gif',
      },
      {
        type: 'img',
        name: 'effe_1_create',
        src: 'https://pic.downk.cc/item/5efb53b814195aa594a8044e.gif',
      },
      {
        type: 'img',
        name: 'effe_1_loop',
        src: 'https://pic.downk.cc/item/5efb546314195aa594a83f51.gif',
      },
      {
        type: 'img',
        name: 'effe_1_end',
        src: 'https://pic.downk.cc/item/5efb53b814195aa594a80452.gif',
      },
      {
        type: 'img',
        name: 'effe_2_create',
        src: 'https://pic.downk.cc/item/5efb58b514195aa594a9cb65.gif',
      },
      {
        type: 'img',
        name: 'effe_2_loop',
        src: 'https://pic.downk.cc/item/5efb58b514195aa594a9cb69.gif',
      },
      {
        type: 'img',
        name: 'effe_2_end',
        src: 'https://pic.downk.cc/item/5efb58b514195aa594a9cb70.gif',
      },
      {
        type: 'audio',
        name: 'before_ready',
        src:
          'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9UNHlNQjJnc2RXa3k1WEE=.mp3',
      },
      {
        type: 'audio',
        name: 'ready',
        src:
          'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9SRXhaWW1mcWN1ZDNBNVE=.mp3',
      },
      {
        type: 'audio',
        name: 'loop_sound',
        src:
          'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9TQ3RiNjJQQXFMNFdSdWc=.mp3',
      },
      {
        type: 'audio',
        name: 'use_ready',
        src:
          'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9RLTV6RXJ2NGtKMFNSTUE=.mp3',
      },
      {
        type: 'audio',
        name: 'activated',
        src:
          'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9QdWY1R05ydW5vUFptcnc=.mp3',
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
        innerText: '核弹祈祷nia 0%',
      },
      {
        type: 'div',
        name: 'select_target',
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
        /* display: none; */
      }

      .chronosphere_base {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #CCC;
        z-index: 9999999;
      }

      .chronosphere_progress,
      .chronosphere_progress_text,
      .chronosphere_select_target {
        
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
      self.otherDom.base.appendChild(self.mediaDom[item.name]);

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
    this.otherDom.progress_text.innerText = '核弹祈祷nia ' + percent + '%';
    // chronosphere Missile Ready
    if (n === this.mediaInfo.length) {
      this.chronosphereMissileReadyBefore();
    }
  };

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

  Chronosphere.prototype.chronosphereMissileReadyBefore = function() {
    this.mediaDom.before_ready.play();
    console.log('ready');
  };
}

var chronosphere = new Chronosphere();
chronosphere.init();
