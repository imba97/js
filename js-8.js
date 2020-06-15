// 获取淘宝、天猫的链接
var koe_item_url = /(https:\/\/(item\.taobao|detail\.tmall)\.com\/item\.htm)(\?|.*&)(id=\d+)/.exec(
  window.location.href
);
// 将网址部分和参数 id 拼接，并放在弹出框中显示
prompt('短网址', koe_item_url[1] + '?' + koe_item_url[4]);
