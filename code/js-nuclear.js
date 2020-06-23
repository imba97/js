/*

鼠标
https://pic.downk.cc/item/5ef1aa7214195aa594eb1cbb.gif
开井
https://pic.downk.cc/item/5ef0404114195aa59470dd3a.gif
开井 静态图
https://pic.downk.cc/item/5ef1903314195aa594d52c7a.png
核弹 朝上
https://pic.downk.cc/item/5ef199af14195aa594dcb6f4.png
核弹 朝下
https://pic.downk.cc/item/5ef192d714195aa594d73b88.png
发射时的尾烟
https://pic.downk.cc/item/5ef18d5714195aa594d2d4f5.gif
发射中的尾烟
https://pic.downk.cc/item/5ef18d5714195aa594d2d4fa.gif
爆炸前
https://pic.downk.cc/item/5ef18d5714195aa594d2d505.gif
爆炸
https://pic.downk.cc/item/5ef1ea4e14195aa594213428.gif
关井
https://pic.downk.cc/item/5ef18f0914195aa594d44f82.gif

*/

if (typeof Nuclear === 'undefined') {
  function Nuclear() {
    // setup
    this.baseSetup = {
      is_launched: false,
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
      timeout: {
        open_silo: 1580,
        nuclear_ready: 2000,
        nuclear_down: 5800,
        smoke_1: 1200,
        smoke_2: 1500,
        boom_before: 1000,
        boom: 1700,
        end: 1000,
      },
    };
    // 判断媒体是否加载完成
    this.mediaIsLoaded = {};

    // 存放媒体 dom
    this.mediaDom = {};

    // 图片、音频
    this.mediaInfo = [
      {
        type: 'img',
        name: 'mouse',
        src: 'https://pic.downk.cc/item/5ef1aa7214195aa594eb1cbb.gif',
      },
      {
        type: 'img',
        name: 'smoke_1',
        src: 'https://pic.downk.cc/item/5ef18d5714195aa594d2d4f5.gif',
        bottom: -50,
        right: 120,
      },
      {
        type: 'img',
        name: 'smoke_2',
        src: 'https://pic.downk.cc/item/5ef18d5714195aa594d2d4fa.gif',
        bottom: 0,
        right: 0,
      },
      {
        type: 'img',
        name: 'boom_before',
        src: 'https://pic.downk.cc/item/5ef18d5714195aa594d2d505.gif',
        bottom: 0,
        right: 0,
      },
      {
        type: 'img',
        name: 'boom',
        src: 'https://pic.downk.cc/item/5ef1ea4e14195aa594213428.gif',
      },
      {
        type: 'img',
        name: 'silo',
        src: 'https://pic.downk.cc/item/5ef0d45914195aa594178112.gif',
        bottom: 0,
        right: 0,
      },
      {
        type: 'img',
        name: 'nuclear_up',
        src: 'https://pic.downk.cc/item/5ef199af14195aa594dcb6f4.png',
        bottom: 125,
        right: 267,
      },
      {
        type: 'img',
        name: 'nuclear_down',
        src: 'https://pic.downk.cc/item/5ef192d714195aa594d73b88.png',
      },
      {
        type: 'img',
        name: 'finished',
        src: 'https://pic.downk.cc/item/5ef1903314195aa594d52c7a.png',
        bottom: 0,
        right: 0,
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
    ];

    this.otherDom = {};
  }

  /**
   * 初始化：添加 style、添加其他 dom
   */
  Nuclear.prototype.init = function () {
    // 添加 style
    var nuclear_style = document.createElement('style');
    nuclear_style.innerText = `

      .nuclear {
        display: none;
      }

      .nuclear_mouse {
        position: absolute;
        z-index: 999998;
      }

      .nuclear_smoke_1,
      .nuclear_smoke_2 {
        z-index: 999997;
      }

      .nuclear_boom,
      .nuclear_boom_before,
      .nuclear_nuclear_up,
      .nuclear_nuclear_down {
        z-index: 999996;
      }

      .nuclear_silo,
      .nuclear_finished {
        z-index: 999990;
      }

      .nuclear_silo,
      .nuclear_nuclear_up,
      .nuclear_nuclear_down,
      .nuclear_finished,
      .nuclear_smoke_1,
      .nuclear_smoke_2 {
        position: fixed;
        bottom: 0;
        right: 0;
      }

      .nuclear_boom_before,
      .nuclear_boom,
      .nuclear_select_target,
      .nuclear_progress_text,
      .nuclear_progress {
        position: fixed;
        top: 0;
        left: 0;
        margin: 0 !important;
        padding: 0 !important;
      }

      .nuclear_select_target {
        width: 100%;
        height: 100%;
        cursor: none;
        display: none;
        z-index: 999999;
      }

      .nuclear_progress_text,
      .nuclear_progress {
        width: 230px;
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
        z-index: 999980;
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
      self.mediaDom[item.name].setAttribute(
        'class',
        'nuclear nuclear_' + item.name
      );

      switch (item.name) {
        case 'nuclear':
          self.mediaDom[item.name].setAttribute('data-state', 'up');
          break;
      }

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
      this.nuclearMissileReadyBefore();
    }
  };

  /**
   * 核弹准备就绪前
   */
  Nuclear.prototype.nuclearMissileReadyBefore = function () {
    var self = this;

    this.mediaDom.open_silo.play();
    this.mediaDom.silo.style.display = 'block';

    setTimeout(function () {
      self.mediaDom.silo.style.display = 'none';
      self.mediaDom.nuclear_up.style.display = 'block';
      self.mediaDom.finished.style.display = 'block';
    }, self.baseSetup.timeout.open_silo);

    setTimeout(function () {
      // 准备就绪
      self.nuclearMissileReady();
    }, self.baseSetup.timeout.open_silo + self.baseSetup.timeout.nuclear_ready);
  };

  /**
   * 弹准备就绪
   */
  Nuclear.prototype.nuclearMissileReady = function () {
    var self = this;

    this.mediaDom.ready.play();

    this.otherDom.select_target.style.display = 'block';
    this.mediaDom.mouse.style.display = 'block';
    // 点击发射
    this.otherDom.select_target.addEventListener('click', function (e) {
      if (self.baseSetup.is_launched) return;
      self.baseSetup.is_launched = true;
      // 发射时烟雾
      self.mediaDom.smoke_1.style.display = 'block';
      setTimeout(function () {
        self.mediaDom.smoke_1.style.display = 'none';
      }, self.baseSetup.timeout.smoke_1);
      var scrollTop =
        document.body.scrollTop !== 0
          ? document.body.scrollTop
          : document.documentElement.scrollTop;
      self.nuclearMissileLaunched({
        x: e.pageX,
        y: e.pageY - scrollTop,
      });
    });
    document.documentElement.onscroll = function () {
      self.mediaDom.mouse.style.top = e.pageY + 'px';
      self.mediaDom.mouse.style.left = e.pageX + 'px';
    };
    this.otherDom.select_target.addEventListener('mousemove', function (e) {
      self.mediaDom.mouse.style.top =
        e.pageY - self.mediaDom.mouse.clientHeight / 2 + 'px';
      if (
        e.pageX <
        document.body.clientWidth - self.mediaDom.mouse.clientWidth / 2
      )
        self.mediaDom.mouse.style.left =
          e.pageX - self.mediaDom.mouse.clientWidth / 2 + 'px';
    });
    this.otherDom.select_target.addEventListener('mouseover', function () {
      self.mediaDom.mouse.style.display = 'block';
    });
    this.otherDom.select_target.addEventListener('mouseout', function () {
      self.mediaDom.mouse.style.display = 'none';
    });
  };

  /**
   * 核弹发射
   * @param {Object} position
   */
  Nuclear.prototype.nuclearMissileLaunched = function (position) {
    var self = this;
    this.mediaDom.biu.play();

    this.baseSetup.select_target = position;

    self.animate(
      'nuclear_up',
      'bottom',
      document.documentElement.clientHeight +
        self.mediaDom.nuclear_up.clientHeight,
      function () {
        self.mediaDom.nuclear_up.style.display = 'none';
      }
    );

    setTimeout(function () {
      self.mediaDom.nuclear_down.style.display = 'block';
      self.mediaDom.nuclear_down.style.top =
        -self.mediaDom.nuclear_down.clientHeight + 'px';
      self.mediaDom.nuclear_down.style.left =
        position.x - self.mediaDom.nuclear_down.clientWidth / 2 + 'px';
      self.animate(
        'nuclear_down',
        'top',
        position.y - self.mediaDom.nuclear_down.clientHeight,
        function () {
          self.mediaDom.nuclear_down.style.display = 'none';
          self.boom_before();
        }
      );
    }, this.baseSetup.timeout.nuclear_down);
  };

  Nuclear.prototype.boom_before = function () {
    var self = this;
    this.mediaDom.boom_before.style.display = 'block';
    // 设置定位
    this.mediaDom.boom_before.style.top =
      this.baseSetup.select_target.y -
      (this.mediaDom.boom_before.clientWidth / 2 + 30) +
      'px';
    this.mediaDom.boom_before.style.left =
      this.baseSetup.select_target.x -
      this.mediaDom.boom_before.clientHeight / 2 +
      'px';

    // 白色背景
    var bgOpacity = 0.3;
    this.otherDom.select_target.style.opacity = 0;
    this.otherDom.select_target.style.backgroundColor = '#FFF';
    var bgTimer = setInterval(function () {
      self.otherDom.select_target.style.opacity = bgOpacity;
      bgOpacity += 0.02;
      if (bgOpacity > 1) {
        clearInterval(bgTimer);
      }
    }, 100);
    setTimeout(function () {
      self.mediaDom.boom_before.style.display = 'none';
      self.boom();
    }, this.baseSetup.timeout.boom_before);
  };

  Nuclear.prototype.boom = function () {
    var self = this;
    this.mediaDom.boom.style.display = 'block';
    // 爆炸效果 定位
    this.mediaDom.boom.style.top = this.baseSetup.select_target.y - 530 + 'px';
    this.mediaDom.boom.style.left =
      this.baseSetup.select_target.x -
      this.mediaDom.boom.clientWidth / 2 +
      'px';
    setTimeout(function () {
      self.end();
    }, this.baseSetup.timeout.boom);
  };

  /**
   * 动画
   * @param {String} name
   * @param {String} position 位移 top left bottom right
   * @param {Number} to 动画结束点数值
   */
  Nuclear.prototype.animate = function (name, position, to, callback) {
    var self = this;
    var currentVal = parseInt(
      this.mediaDom[name].style[position].replace('px', '')
    );
    var smoke_2_elements = new Array();
    // 当前帧
    var frame = 1;
    var n = 5;
    var plus =
      name === 'nuclear_down' ? self.baseSetup.select_target.y * 0.023 : 0;
    this.mediaDom[name].timer = setInterval(function () {
      if (frame % 5 === 0 && n < 20) n++;
      self.mediaDom[name].style[position] =
        currentVal + frame * (n + plus) + 'px';

      // 发射时尾烟
      if (name === 'nuclear_up' && frame % 5 === 0) {
        var smoke_2_el = document.createElement('img');
        smoke_2_el.setAttribute('class', 'nuclear_smoke_2 nuclear_smoke_2_el');
        smoke_2_el.style.opacity = 1;
        smoke_2_el.src =
          'https://pic.downk.cc/item/5ef18d5714195aa594d2d4fa.gif';
        smoke_2_elements.push(smoke_2_el);
        document.body.appendChild(smoke_2_el);
        smoke_2_el.style.bottom =
          self.baseSetup.position.bottom +
          parseInt(self.mediaDom.nuclear_up.style.bottom.replace('px', '')) -
          50 +
          'px';
        smoke_2_el.style.right =
          parseInt(self.mediaDom.nuclear_up.style.right.replace('px', '')) +
          'px';
        setTimeout(function () {
          smoke_2_el.remove();
        }, 1000);
      }

      smoke_2_elements.forEach(function (smoke_2) {
        var smoke_2_opacity = parseFloat(smoke_2.style.opacity);
        smoke_2_opacity -= 0.03;

        if (smoke_2_opacity > 0) {
          smoke_2.style.opacity = smoke_2_opacity;
        } else {
          smoke_2.style.opacity = 0;
        }
      });

      frame++;
      if (currentVal + frame * (n + plus) >= to) {
        clearInterval(self.mediaDom[name].timer);
        if (typeof callback === 'function') callback();
      }
    }, 30);
  };

  Nuclear.prototype.end = function () {
    var self = this;
    var boomOpacity = 1;
    var boomTimer = setInterval(function () {
      self.mediaDom.boom.style.opacity = boomOpacity;
      boomOpacity--;
      if (boomOpacity === 0) {
        clearInterval(boomTimer);
      }
    }, 50);
    setTimeout(function () {
      self.mediaDom.boom.style.display = 'none';
      for (element in self.mediaDom) {
        self.mediaDom[element].remove();
      }
      for (element in self.otherDom) {
        self.otherDom[element].remove();
      }
      document
        .querySelectorAll('.nuclear_smoke_2_el')
        .forEach(function (element) {
          element.remove();
        });
      document.documentElement.innerText = document.documentElement.innerHTML;
    }, this.baseSetup.timeout.end);
  };

  var nuclear = new Nuclear();
  nuclear.init();
  nuclear.preload();
}
