// 设置参数，aid、like、csrf
var koe_17_param = 'aid=' + __INITIAL_STATE__.aid + '&like=1&csrf=' + getCookie('bili_jct');
// 新建 网络请求 对象
var koe_17_xhr = new XMLHttpRequest();
// 设置请求类型、请求地址、是否异步
koe_17_xhr.open(
  'POST',
  'https://api.bilibili.com/x/web-interface/archive/like',
  true
);
// 携带验证 ( cookie )
koe_17_xhr.withCredentials = true;
// 设置请求头 Content-Type
koe_17_xhr.setRequestHeader(
  'content-type',
  'application/x-www-form-urlencoded'
);
// 发送请求，并将参数传入其中
koe_17_xhr.send(koe_17_param);
// 监听状态变化
koe_17_xhr.onreadystatechange = function () {
  // 判断是否请求成功
  if (koe_17_xhr.readyState === 4 && koe_17_xhr.status === 200) {
    // 打印结果
    console.log(koe_17_xhr.responseText);
  }
};
void 0;
