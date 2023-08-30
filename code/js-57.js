(function () {
  if (continueClickTimer) {
    clearInterval(continueClickTimer);
    continueClickTimer = undefined;
    console.log('关闭')
    return;
  }

  console.log('开启')
  var continueClickTimer = setInterval(/* TODO: 点击事件 */ () => {}, 10000);
});
