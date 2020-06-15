// 获取头图中的 style，用正则表达式匹配高清图的链接，用 window.open() 打开
window.open(
  /https?:\/\/.*\/bfs\/article\/[a-z0-9]+\.(jpe?g|png|gif)/.exec(
    document.querySelector('.banner-img-holder').getAttribute('style')
  )[0]
);
