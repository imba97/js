// 储存所有 aid
var koe_19_aids = new Array();
// 页数 默认为 1
var koe_19_page = 1;
// 调用 网络请求函数 并传入 页数
koe_19_search(koe_19_page);
// 网络请求函数
function koe_19_search(page) {
  // 新建 网络请求
  var koe_19_search_xhr = new XMLHttpRequest();
  // 设置 请求类型、地址、异步，并将页数设置为传进来的参数 page
  koe_19_search_xhr.open('GET', 'https://api.bilibili.com/x/space/arc/search?mid=2198461&ps=30&tid=0&pn=' + page + '&keyword=&order=pubdate&jsonp=jsonp', true);
  // 发送网络请求
  koe_19_search_xhr.send();
  // 监听状态
  koe_19_search_xhr.onreadystatechange = function() {
    // 如果请求成功
    if(koe_19_search_xhr.readyState === 4 && koe_19_search_xhr.status === 200) {
      // 获取 返回结果并转为 json
      var json = JSON.parse(koe_19_search_xhr.responseText);
      // 如果视频列表没视频，则输出所有 aid，并停止运行
      if(json.data.list.vlist.length === 0) {
        console.log(koe_19_aids);
        return;
      }
      // 循环视频列表，取出 aid，并将 aid 放入 aids 数组
      json.data.list.vlist.forEach(function(item) {
        koe_19_aids.push(item.aid);
      });
      // 让 page + 1 并在此调用自身，执行下一次请求
      koe_19_search(++koe_19_page);
    }
  }
}