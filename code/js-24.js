// 害 注释等以后补全
if (document.querySelector('#koe_24_search_box') === null) {
  // 搜索次数，可以通过设置这个，更改第一次搜索的次数
  var koe_24_default_num = 1;
  // 当前页数
  var koe_24_current_page = 0;
  // 设置搜索内容
  var is_search = {
    upName: true, // up主名
    title: true, // 标题
    desc: true, // 简介
    dynamic: true, // 动态文字
  };

  // style
  var koe_24_style = document.createElement('style');
  koe_24_style.innerText = `

    #koe_24_search_box,
    .koe_24_background,
    .koe_24_search_text,
    .koe_24_search_button,
    .koe_24_search_list,
    .koe_24_current_page_p,
    .koe_24_search_setup {
      position: fixed;
    }

    #koe_24_search_box {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 99999;
    }
  
    .koe_24_background {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000;
      opacity: 0.8;
      z-index: -1;
    }

    .koe_24_search_text {
      top: 50px;
      left: 50px;
      padding: 2px 5px;
      width: 320px;
      height: 30px;
      line-height: 30px;
      font-size: 24px;
      color: #FFF;
      background: none;
      border: none;
      border-bottom: 2px #FFF solid;
    }
    
    .koe_24_search_button {
      top: 50px;
      left: 400px;
      width: 100px;
      height: 32px;
      line-height: 32px;
      font-size: 22px;
      color: #FFF;
      background-color: #666;
      border: 1px #000 solid;
      border-radius: 5px;
    }

    .koe_24_search_button:active {
      background-color: #999;
    }

    .koe_24_search_list {
      top: 130px;
      left: 50px;
      height: 760px;
      overflow-y: auto;
    }

    .koe_24_search_list li {
      position: relative;
      margin: 5px;
      width: 210px;
      height: 180px;
      list-style: none;
      float: left;
      overflow: hidden;
      cursor: pointer;
    }

    .koe_24_search_list::after {
      clear:both;
    }

    .koe_24_search_list li img {
      position: absolute;
      top: 70px;
      left: 50%;
      border-radius: 5px;
      -webkit-transform: translate(-50%,-50%);
      -moz-transform: translate(-50%,-50%);
      transform:translate(-50%,-50%);
      height: 140px;
    }

    .koe_24_search_list li .koe_24_search_li_title {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0 5px;
      width: 100%;
      height: 30px;
      line-height: 30px;

      color: #FFF;
      font-size: 20px;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }

    .koe_24_current_page_p {
      top: 50px;
      right: 50px;
      color: #FFF;
      font-size: 20px;
    }

    .koe_24_search_setup {
      top: 50px;
      left: 520px;
      height: 30px;
      line-height: 30px;
      color: #FFF;
      font-size: 20px;
    }

    .koe_24_search_setup input {
      transform:scale(1.5);
      -webkit-transform:scale(1.5);
      -moz-transform:scale(1.5);
      -ms-transform:scale(1.5);
      -o-transform:scale(1.5);
    }
  
  `;
  document.head.appendChild(koe_24_style);

  // 最外层 div
  var koe_24_search_box = document.createElement('div');
  koe_24_search_box.setAttribute('id', 'koe_24_search_box');

  // 背景
  var koe_24_background = document.createElement('div');
  koe_24_background.setAttribute('class', 'koe_24_background');

  // 搜索框
  var koe_24_search_text = document.createElement('input');
  koe_24_search_text.type = 'text';
  koe_24_search_text.setAttribute('class', 'koe_24_search_text');
  koe_24_search_text.setAttribute('placeholder', '请输入关键词，多个用“,”隔开');
  koe_24_search_text.onchange = function () {
    koe_24_search_list.innerHTML = '';
    koe_24_search_button.innerText = '搜索';
    koe_24_offset_dynamic_id = '';
    koe_24_current_page = 0;
    koe_24_current_page_p.innerText = '';
    koe_24_num = koe_24_default_num;
  }
  // 搜索按钮
  var koe_24_search_button = document.createElement('button');
  koe_24_search_button.setAttribute('class', 'koe_24_search_button');
  koe_24_search_button.innerText = '搜索';
  koe_24_search_button.addEventListener('click', function () {
    koe_24_search_button.innerText = '下一页';
    koe_24_getDynamic();
  });

  // 搜索结果 ul
  var koe_24_search_list = document.createElement('ul');
  koe_24_search_list.setAttribute('class', 'koe_24_search_list');

  // 当前页数
  var koe_24_current_page_p = document.createElement('p');
  koe_24_current_page_p.setAttribute('class', 'koe_24_current_page_p');

  // 设置按钮
  var koe_24_search_setup = document.createElement('p');
  koe_24_search_setup.setAttribute('class', 'koe_24_search_setup');
  koe_24_search_setup.innerHTML = '搜索设置：<label>UP名 <input data-id="upName" type="checkbox"></label> &nbsp; <label>视频标题 <input data-id="title" type="checkbox"></label> &nbsp; <label>视频简介 <input data-id="desc" type="checkbox"></label> &nbsp; <label>动态文字 <input data-id="dynamic" type="checkbox"></label>';

  koe_24_search_box.appendChild(koe_24_background);
  koe_24_search_box.appendChild(koe_24_search_text);
  koe_24_search_box.appendChild(koe_24_search_button);
  koe_24_search_box.appendChild(koe_24_search_list);
  koe_24_search_box.appendChild(koe_24_current_page_p);
  koe_24_search_box.appendChild(koe_24_search_setup);

  document.body.appendChild(koe_24_search_box);

  for(koe_setup_index in is_search) {
    var koe_setup_element = document.querySelector('.koe_24_search_setup input[data-id="' + koe_setup_index + '"]');
    koe_setup_element.checked = is_search[koe_setup_index];
    koe_setup_element.onchange = function() {
      is_search[this.getAttribute('data-id')] = this.checked;
    }
  }

  // 请求 url
  var koe_24_xhr_url = '';
  // 从第二次请求开始 需要传 offset_dynamic_id，但表从那个动态 ID 开始请求
  var koe_24_offset_dynamic_id = '';
  // 请求是否完成
  var koe_24_is_finished = true;
  // 请求次数
  var koe_24_num = koe_24_default_num;

  function koe_24_getDynamic() {
    if (!koe_24_is_finished) return;
    koe_24_is_finished = false;

    var koe_24_search_reg = new RegExp(
      '(' + koe_24_search_text.value.replace(',', '|') + ')'
    );

    if (koe_24_offset_dynamic_id === '') {
      koe_24_xhr_url =
        'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=' +
        /DedeUserID=(\d+)/.exec(document.cookie)[1] +
        '&type_list=8,512,4097,4098,4099,4100,4101';
    } else {
      koe_24_xhr_url =
        'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_history?uid=' +
        /DedeUserID=(\d+)/.exec(document.cookie)[1] +
        '&type_list=8,512,4097,4098,4099,4100,4101&offset_dynamic_id=' +
        koe_24_offset_dynamic_id;
    }

    // 新建网络请求
    var koe_24_xhr = new XMLHttpRequest();
    koe_24_xhr.open('GET', koe_24_xhr_url, true);
    // 携带认证
    koe_24_xhr.withCredentials = true;
    koe_24_xhr.send();
    koe_24_xhr.onreadystatechange = function () {
      // 请求成功
      if (koe_24_xhr.readyState === 4 && koe_24_xhr.status === 200) {
        // 请求完成
        koe_24_is_finished = true;
        // 设置当前页数文字
        koe_24_current_page_p.innerText = '当前页数：' + ++koe_24_current_page;
        // 获取 json 数据
        var json = JSON.parse(koe_24_xhr.responseText);

        // 取出 cards 并遍历
        json.data.cards.forEach(function (item) {
          // 获取视频数据
          var videoData = JSON.parse(item.card);

          // 番剧
          if (typeof videoData.apiSeasonInfo !== 'undefined') {
            var data = {
              isAnime: true,
              title: videoData.apiSeasonInfo.title,
              pic: videoData.cover,
              url: videoData.url,
            };
          } else {
            var data = {
              isAnime: false,
              upName: item.desc.user_profile.info.uname,
              title: videoData.title,
              desc: videoData.desc,
              dynamic: videoData.dynamic,
              pic: videoData.pic,
              url: 'https://www.bilibili.com/video/' + item.desc.bvid,
            };
          }

          if (
            (!data.isAnime && is_search.upName && koe_24_search_reg.test(data.upName)) ||
            (is_search.title && koe_24_search_reg.test(data.title)) ||
            (!data.isAnime && is_search.desc && koe_24_search_reg.test(data.desc)) ||
            (!data.isAnime && is_search.dynamic && koe_24_search_reg.test(data.dynamic))
          ) {
            var koe_24_search_li = document.createElement('li');
            koe_24_search_li.innerHTML =
              '<img src="' +
              data.pic +
              '"><p class="koe_24_search_li_title">' +
              data.title +
              '</p>';
            koe_24_search_li.addEventListener('click', function () {
              window.open(data.url);
            });
            koe_24_search_list.appendChild(koe_24_search_li);
          }
          
        });

        // 设置 offset
        koe_24_offset_dynamic_id =
          koe_24_offset_dynamic_id === ''
            ? json.data.history_offset
            : json.data.next_offset;

        // 下一页
        if (--koe_24_num > 0) {
          koe_24_getDynamic();
        }
      }
    };
  }
} else {
  if(koe_24_search_box.style.display === '' || koe_24_search_box.style.display === 'block') {
    koe_24_search_box.style.display = 'none';
  } else {
    koe_24_search_box.style.display = 'block';
  }
}
void(0);
