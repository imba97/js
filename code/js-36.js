// data.arc_audits[0].Archive.ptime
// data.arc_audits[0].stat.view
// https://member.bilibili.com/x/web/archives?tid=36&status=is_pubing%2Cpubed%2Cnot_pubed&pn=1&ps=10&coop=1&interactive=1
var koe_36_input_time = prompt('请输入时间').replace('-', '/');
var koe_36_end_time = new Date(koe_36_input_time).getTime() / 1000;
var koe_36_view = 0;
var koe_36_is_end = false;
koe_36_getVideoInfo(1);
function koe_36_getVideoInfo(page) {
  var koe_36_xhr = new XMLHttpRequest();
  koe_36_xhr.open('GET', 'https://member.bilibili.com/x/web/archives?tid=36&status=is_pubing%2Cpubed%2Cnot_pubed&pn=' + page + '&ps=20&coop=1&interactive=1', 'true');
  koe_36_xhr.setRequestHeader('content-type', 'application/json');
  koe_36_xhr.send();
  koe_36_xhr.onreadystatechange = function () {
    if (koe_36_xhr.readyState === 4 && koe_36_xhr.status === 200) {
      var json = JSON.parse(koe_36_xhr.responseText);
      if(json.data.arc_audits === null) return;
      json.data.arc_audits.forEach(function(videoInfo) {
        if(videoInfo.Archive.ptime >= koe_36_end_time) koe_36_view += videoInfo.stat.view;
        else koe_36_is_end = true;
      });
      if(!koe_36_is_end) koe_36_getVideoInfo(++page);
      else alert('今日起到 ' + koe_36_input_time + '，总播放量' + koe_36_view);
    }
  };
}