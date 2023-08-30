(function () {
  if (typeof window.continueClickTimer !== 'undefined') {
    clearInterval(window.continueClickTimer);
    window.continueClickTimer = undefined;
    console.log("关闭");
    return;
  }

  console.log("开启");
  window.continueClickTimer = setInterval(/* TODO: 点击事件 */ () => {}, 10000);
})();
