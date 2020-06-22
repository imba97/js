// 爆炸、开井、核弹
// https://pic.downk.cc/item/5ef0404114195aa59470dd36.gif
// https://pic.downk.cc/item/5ef0404114195aa59470dd3a.gif
// https://pic.downk.cc/item/5ef0404114195aa59470dd3d.png

// 未完待续

if (typeof Nuclear === 'undefined') {
  function Nuclear() {
    // setup
    this.baseSetup = {
      top: 100,
      left: 100
    }
    // 判断媒体是否加载完成
    this.mediaIsLoaded = {};

    // 存放媒体 dom
    this.mediaDom = {};

    // 图片、音频
    this.mediaInfo = [
      {
        type: 'img',
        name: 'boom',
        src: 'https://pic.downk.cc/item/5ef0404114195aa59470dd36.gif',
      },
      {
        type: 'img',
        name: 'silo',
        src: 'https://pic.downk.cc/item/5ef0d45914195aa594178112.gif',
        top: -39,
        left: -7,
      },
      {
        type: 'img',
        name: 'nuclear',
        src: 'https://pic.downk.cc/item/5ef0404114195aa59470dd3d.png',
      },
      {
        type: 'img',
        name: 'finished',
        src: 'https://pic.downk.cc/item/5ef0cc8414195aa5940d8e12.png',
        top: 0,
        left: 0,
      },
      {
        type: 'audio',
        name: 'ready',
        src:
          'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9OOUE5WFFqQjlyREMwSHc=.mp3',
      },
      {
        type: 'audio',
        name: 'open_silo',
        src:
          'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9Ma0NHaGgxSlRISTd0eXc=.mp3',
      },
      {
        type: 'audio',
        name: 'biu',
        src:
          'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLW9NVGp1VlV6Tkc4a1pXYlE=.mp3',
      },
    ];

    this.otherDomInfo = [
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
      {
        type: 'button',
        name: 'nuclear_launch_button',
      },
      {
        type: 'div',
        name: 'test',
      },
    ];

    this.otherDom = {};
  }

  Nuclear.prototype.test = function () {
    this.mediaDom.silo.style.display = 'block';
    this.mediaDom.finished.style.display = 'block';
  };

  Nuclear.prototype.init = function () {
    // 添加 style
    var nuclear_style = document.createElement('style');
    nuclear_style.innerText = `

      .nuclear_boom,
      .nuclear_silo,
      .nuclear_nuclear,
      .nuclear_finished {
        display: none;
        opacity: 0.7;
        z-index: 999999;
      }

      .nuclear_test {
        position: fixed;
        top: 100px;
        left: 100px;

        width: 500px;
        height: 500px;

        background-color: #666;

        z-index: 999999;
      }

      .nuclear_silo {
        
      }

      .nuclear_boom,
      .nuclear_silo,
      .nuclear_nuclear,
      .nuclear_finished {
        position: fixed;
        top: 100px;
        left: 100px;
      }
      .nuclear_select_target,
      .nuclear_progress_text,
      .nuclear_progress {
        position: fixed;
        top: 0;
        left: 0;
      }

      .nuclear_select_target {
        width: 100%;
        height: 100%;
        display: none;
        z-index: 999999;
      }

      .nuclear_progress_text,
      .nuclear_progress {
        width: 200px;
        height: 30px;
      }

      .nuclear_progress_text {
        line-height: 30px;
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        color: #FFF;
        z-index: 999999;
      }

      .nuclear_progress {
        background-color: #999;
        z-index: 999998;
      }
      .nuclear_progress::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 30px;
        background-color: #009966;
      }
    `;
    document.head.appendChild(nuclear_style);

    // 初始化 其他 dom
    var self = this;
    this.otherDomInfo.forEach(function (item) {
      self.otherDom[item.name] = document.createElement(item.type);
      self.otherDom[item.name].setAttribute('class', 'nuclear_' + item.name);
      if (typeof item.innerText !== 'undefined')
        self.otherDom[item.name].innerText = item.innerText;
      document.body.appendChild(self.otherDom[item.name]);
    });
  };

  Nuclear.prototype.preload = function () {
    // 用于forEach 的匿名函数，我知道 es6 箭头函数可以直接用 this，但我就是要用 es5，你打我呀
    var self = this;

    // 进度条 style
    var progress = document.createElement('style');

    // 循环 mediaInfo
    this.mediaInfo.forEach(function (item, index) {
      // 设置未加载完成
      self.mediaIsLoaded[item.name] = false;
      // 创建 dom
      self.mediaDom[item.name] = document.createElement(item.type);
      // 指定 src
      self.mediaDom[item.name].src = item.src;
      // 添加 class
      self.mediaDom[item.name].setAttribute('class', 'nuclear_' + item.name);

      if (item.type === 'img') {
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

      if (typeof item.top !== 'undefined') {
        self.mediaDom[item.name].style.top = (self.baseSetup.top + item.top) + 'px';
      }
      if (typeof item.left !== 'undefined')
        self.mediaDom[item.name].style.left = (self.baseSetup.left + item.left) + 'px';

      // 添加到 body
      document.body.appendChild(self.mediaDom[item.name]);

      // 进度条 根据媒体个数自动设置百分比
      var percent = parseInt((100 / self.mediaInfo.length) * (index + 1));
      progress.innerText +=
        '.nuclear_progress[data-preload="' +
        (index + 1) +
        '"]::before { width: ' +
        percent +
        '%; } ';
    });

    // 进度条 style 添加至 head
    document.head.appendChild(progress);
  };

  /**
   * 渲染预加载进度的页面显示
   */
  Nuclear.prototype.preloadView = function () {
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
    // Nuclear Missile Ready
    if (n === this.mediaInfo.length) {
      this.nuclearMissileReady();
    }
  };

  /**
   * 核弹准备就绪
   */
  Nuclear.prototype.nuclearMissileReady = function () {
    var self = this;
    this.otherDom.select_target.addEventListener('click', function (e) {
      var scrollTop =
        document.body.scrollTop !== 0
          ? document.body.scrollTop
          : document.documentElement.scrollTop;
      self.otherDom.progress_text.innerText =
        'x:' + e.pageX + ',y:' + (e.pageY - scrollTop);
    });
    this.otherDom.select_target.style.display = 'block';

    this.test();
  };

  var nuclear = new Nuclear();
  nuclear.init();
  nuclear.preload();
}
