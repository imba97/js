// 统计点赞、投币、收藏/播放量 比率最高

var koe_25_mid = /space\.bilibili\.com\/(\d+)/.exec(window.location.href);

// 储存所有 aid
var koe_25_aids = new Array();
// 页数 默认为 1
var koe_25_page = 1;
// 调用 网络请求函数 并传入 页数
if (koe_25_mid !== null) koe_25_search(koe_25_page);
// 网络请求函数
function koe_25_search(page) {
  // 新建 网络请求
  var koe_25_search_xhr = new XMLHttpRequest();
  // 设置 请求类型、地址、异步，并将页数设置为传进来的参数 page
  koe_25_search_xhr.open(
    'GET',
    'https://api.bilibili.com/x/space/arc/search?mid=' +
      koe_25_mid[1] +
      '&ps=30&tid=0&pn=' +
      page +
      '&keyword=&order=pubdate&jsonp=jsonp',
    true
  );
  // 发送网络请求
  koe_25_search_xhr.send();
  // 监听状态
  koe_25_search_xhr.onreadystatechange = function () {
    // 如果请求成功
    if (
      koe_25_search_xhr.readyState === 4 &&
      koe_25_search_xhr.status === 200
    ) {
      // 获取 返回结果并转为 json
      var json = JSON.parse(koe_25_search_xhr.responseText);
      // 如果视频列表没视频，则输出所有 aid，并停止运行
      if (json.data.list.vlist.length === 0) {
        koe_25_stat();
        return;
      }
      // 循环视频列表，取出 aid，并将 aid 放入 aids 数组
      json.data.list.vlist.forEach(function (item) {
        koe_25_aids.push(item.aid);
      });
      // 让 page + 1 并在此调用自身，执行下一次请求
      koe_25_search(++koe_25_page);
    }
  };
}

var koe_25_stat_info = {
  like: 0,
  coin: 0,
  favorite: 0,
};

var koe_25_stat_video = {
  like: '',
  coin: '',
  favorite: '',
};

var koe_25_index = 0;
function koe_25_stat() {
  var koe_25_stat_xhr = new XMLHttpRequest();
  koe_25_stat_xhr.open(
    'GET',
    'https://api.bilibili.com/x/web-interface/archive/stat?aid=' +
      koe_25_aids[koe_25_index],
    true
  );
  koe_25_stat_xhr.send();
  koe_25_stat_xhr.onreadystatechange = function () {
    if (koe_25_stat_xhr.readyState === 4 && koe_25_stat_xhr.status === 200) {
      var json = JSON.parse(koe_25_stat_xhr.responseText);
      for (index in koe_25_stat_info) {
        if (json.data[index] / json.data.view > koe_25_stat_info[index]) {
          koe_25_stat_info[index] = json.data[index] / json.data.view;
          koe_25_stat_video[index] =
            'https://www.bilibili.com/video/' + json.data.bvid;
        }
      }

      koe_25_index++;
      if (koe_25_index < koe_25_aids.length) {
        koe_25_stat();
      } else {
        for(index in koe_25_stat_info) {
          console.log(index + ': ' + koe_25_stat_info[index] + '\n' + koe_25_stat_video[index]);
        }
      }
    }
  };
}

// 心态爆炸
