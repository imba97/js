// 判断有没有 level
if (typeof koe_level === 'undefined') {
  // 没有则获取 .h-level 的属性 lvl，转成整数
  var koe_level = parseInt(
    document.querySelector('.h-level').getAttribute('lvl')
  );
  // 设置 7、8、9 级的 style 效果
  var koe_style = document.createElement('style');
  koe_style.innerHTML =
    '.m-level[lvl="7"]{ background-position: -21px -262px } .m-level[lvl="8"]{ background-position: -21px -298px } .m-level[lvl="9"]{ background-position: -21px -334px }';
  document.head.appendChild(koe_style);
}
// 设置 level，如果 level 等于 9 则 设置为 0，否则 level + 1
koe_level = koe_level === 9 ? 0 : ++koe_level;
// 更改 .h-level 的 lvl 属性值
document.querySelector('.h-level').setAttribute('lvl', koe_level);
