var koe_19_aids = new Array();
var koe_19_page = 1;
koe_19_search(koe_19_page);
function koe_19_search(page) {
  var koe_19_search_xhr = new XMLHttpRequest();
  koe_19_search_xhr.open('GET', 'https://api.bilibili.com/x/space/arc/search?mid=2198461&ps=30&tid=0&pn=' + page + '&keyword=&order=pubdate&jsonp=jsonp', true);
  koe_19_search_xhr.send();
  koe_19_search_xhr.onreadystatechange = function() {
    if(koe_19_search_xhr.readyState === 4 && koe_19_search_xhr.status === 200) {
      var json = JSON.parse(koe_19_search_xhr.responseText);
      if(json.data.list.vlist.length === 0) {
        console.log(koe_19_aids);
        return;
      }
      json.data.list.vlist.forEach(function(item) {
        koe_19_aids.push(item.aid);
      });
      koe_19_search(++koe_19_page);
    }
  }
}