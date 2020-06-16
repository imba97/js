// window.open() 打开一个链接，链接通过属性 itemprop 等于 image 的 meta 标签中的 content 属性获取
window.open(
  document.querySelector('meta[itemprop=image]').getAttribute('content')
);
void 0;
