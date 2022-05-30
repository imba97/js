// if (document.querySelector('#find-li-tang-style')) {
//   document.querySelector('#find-li-tang-style').remove()
// }

// if (document.querySelector('.find-li-tang-container')) {
//   document.querySelector('.find-li-tang-container').remove()
// }

// var findLiTang = undefined
if (typeof findLiTang === 'undefined') {
  var findLiTang = {
    style: document.createElement('style'),
    container: document.createElement('div'),
    ul: document.createElement('ul'),
    index: 0,
    // 当前视频UP主（每次查询不同UP主，概率会大点）
    currentOwner: 0,
    // 最匹配的 bvid
    bvids: [],
    // 查找过的 bvid
    found: [],
    // 是否取消
    pause: false
  };

  // style
  findLiTang.style.setAttribute('id', 'find-li-tang-style');

  findLiTang.style.innerText = `
    .find-li-tang-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 9999999;
    }

    .find-li-tang-container ul {
      padding: 20px;
      width: 80%;
      height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
    }

    .find-li-tang-container ul li {
      margin: 0 0 30px 35px;
      width: 180px;
      height: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
    }

    .find-li-tang-container ul li a {
      width: 180px;
      height: 180px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      background-color: rgba(150, 150, 150, 0.5);
    }

    .find-li-tang-container ul li .index {
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      text-align: center;
    }

    .find-li-tang-container ul li .image {
      width: 180px;
      height: 112px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .find-li-tang-container ul li img {
      margin-top: 10px;
      width: 180px;
    }

    .find-li-tang-container ul li .title {
      margin-top: 10px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
    }
  `;

  document.head.appendChild(findLiTang.style);

  // 主体
  findLiTang.container.setAttribute('class', 'find-li-tang-container');

  findLiTang.container.appendChild(findLiTang.ul);
  document.body.appendChild(findLiTang.container);

  findLiTang.request = function(url, withCredentials = false) {
    return new Promise(function(resolve) {
      // 发送请求
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.withCredentials = withCredentials;
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        }
      }
    })
  };

  findLiTang.doFind = function(bvid) {
    findLiTang.request(`https://api.bilibili.com/x/web-interface/view/detail?bvid=${bvid}`, true).then(function(res) {
      if (!res.data || !res.data.Related) {
        return
      }

      let maxPoint = -1;
      let video;

      for (let i = 0; i < res.data.Related.length; i++) {
        const bvid = res.data.Related[i].bvid;

        // 如果发现匹配视频 寻找结束
        if (~findLiTang.bvids.indexOf(bvid)) {
          findLiTang.addItem(res.data.Related[i]);
          return
        };

        // 已查找过的视频
        if (~findLiTang.found.indexOf(bvid)) continue;

        // 排除两次相同UP
        if (
          findLiTang.currentOwner !== 0 ||
          findLiTang.currentOwner === res.data.Related[i].owner.mid
        ) {
          continue
        }

        const title = res.data.Related[i].title.replace(/^\s+|\s+$/g, '');
        const desc = res.data.Related[i].desc.replace(/^\s+|\s+$/g, '');
        // 视频分类
        const tname = res.data.Related[i].tname;

        // 分数
        let point = 0;
        // 评判标准

        // 整活类、玩梗类视频 +1
        ;[
          '梗',
          '整活',
          '土味',
          '大佐',
          '篮子',
          '华强',
          '买瓜',
          '萨日朗',
          '鸡你太美',
          '年纪轻轻',
          '野兽先辈',
          '24岁',
          '哼哼啊',
          '昏睡红茶'
        ].forEach(function(keyword) {
          if (~title.indexOf(keyword)) point += 1;
          if (~desc.indexOf(keyword)) point += 1;
        })

        // 相关视频 +5
        ;[
          '央视',
          '刀哥',
          '刀酱',
          '好果子',
          '好果汁',
          '虎哥',
          '我徒弟呢',
          '这一脚',
          '踢出',
          '整个夏天'
        ].forEach(function(keyword) {
          if (~title.indexOf(keyword)) point += 5;
          if (~desc.indexOf(keyword)) point += 5;
        });

        // 精准视频 +5
        ;[
          ('赵三金', '理塘', '太美丽了', '还是看一下', '丽丽', '丁真', '顶针', '最高城', '速通', '哎呀', '皮痒')
        ].forEach(function(keyword) {
          if (~title.indexOf(keyword)) point += 10;
          if (~desc.indexOf(keyword)) point += 10;
        });

        // 视频分类 + 20
        if (~['搞笑'].indexOf(tname)) {
          point += 20
        };

        // 扣分关键词
        ;[
          '女朋友',
           '女生',
           '男朋友',
           '男生',
           '声控',
           '相亲',
           '结婚',
           '彩礼',
           '怀孕',
           '孕',
           '指甲',
           '痛风',
           '朱一旦',
           '小姐姐',
           '老婆',
           '老公',
           '王雷'
        ].forEach(function(keyword) {
          if (~title.indexOf(keyword)) point -= 5;
          if (~desc.indexOf(keyword)) point -= 5;
        });

        if (point > maxPoint) {
          maxPoint = point;
          video = res.data.Related[i];
        };
      }

      findLiTang.found.push(video.bvid);
      findLiTang.addItem(video);

      // 滚动条滚动到最底下
      findLiTang.ul.scrollTop = findLiTang.ul.scrollHeight;

      // 暂停寻找
      if (findLiTang.pause) return;

      // 否则继续下次请求
      findLiTang.doFind(video.bvid)
    })
  };

  findLiTang.addItem = function(item) {
    const itemContainer = document.createElement('li');
    itemContainer.innerHTML = `
      <a href="https://www.bilibili.com/video/${item.bvid}" target="_blank">
        <p class="index">步数 ${++findLiTang.index}</p>
        <div class="image"><img src="${item.pic}"></div>
        <p class="title">${item.title}</p>
      </a>
    `;

    findLiTang.ul.appendChild(itemContainer)
  };

  // 获取目标视频合集
  findLiTang.request('https://bili.imba97.cn/litang/videos.php').then(function(res) {
    findLiTang.bvids = res.bvids;
    // 开始查找
    findLiTang.doFind(window.__INITIAL_STATE__.bvid)
  })
} else {
  // 是否是取消状态
  if (findLiTang.pause) {
    // 是取消状态 则继续查找已查找视频的最后一个
    findLiTang.doFind(findLiTang.found[findLiTang.found.length - 1])
  }

  // 反向状态
  findLiTang.pause = !findLiTang.pause
};

void(0)
