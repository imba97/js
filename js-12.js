// 选取所有关注按钮
document.querySelectorAll('.fans-action-btn').forEach(function (element) {
  // 执行 点击 事件
  element.click();
});
// 设置 1 秒延迟
setTimeout(function () {
  // 选取所有弹出框
  document.querySelectorAll('.follow-dialog-wrap').forEach(function (element) {
    // 移除弹出框
    element.remove();
  });
}, 1000);
