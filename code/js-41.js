// https://api.bilibili.com/x/space/channel/video/sort

var koe_41_cid = /cid=(\d+)/.exec(window.location.href)[1];
var koe_41_num = parseInt(prompt('请输入个数'));
var koe_41_li = document.querySelectorAll('.video-list>li');
var koe_41_p = document.createElement('p');
koe_41_p.innerText = '正在排序';
koe_41_p.setAttribute(
  'style',
  'position:fixed; top:0; left:0; padding: 3px 10px; height:30px; line-height:30px; text-align:center; background-color:#000; color:#FFF; font-size:26px; z-index:99999999'
);
document.body.appendChild(koe_41_p);

if (typeof bv2av_com_bv2av === 'undefined') {
  const bv2av_com_table = [
    ...'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF',
  ];
  const bv2av_com_s = [11, 10, 3, 8, 4, 6];
  const bv2av_com_xor = 177451812;
  const bv2av_com_add = 8728348608;

  var bv2av_com_bv2av = (bv) => {
    let str = '';
    if (bv.length === 12) {
      str = bv;
    } else if (bv.length === 10) {
      str = `BV${bv}`;
      // 根据官方 API，BV 号开头的 BV1 其实可以省略
      // 不过单独省略个 B 又不行（
    } else if (bv.length === 9) {
      str = `BV1${bv}`;
    } else {
      return '¿你在想桃子?';
    }
    if (
      !str.match(
        /[Bb][Vv][fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{10}/gu
      )
    ) {
      return '¿你在想桃子?';
    }

    let result = 0;
    let i = 0;
    while (i < 6) {
      result += bv2av_com_table.indexOf(str[bv2av_com_s[i]]) * 58 ** i;
      i += 1;
    }
    return (result - bv2av_com_add) ^ bv2av_com_xor;
  };
}

function koe_41_sort(aid, num) {
  koe_41_p.innerText = '正在排序，第' + num + '个';
  // 设置参数，aid、like、csrf
  var koe_41_param =
    'cid=' +
    koe_41_cid +
    '&aid=' +
    aid +
    '&to=1&csrf=' +
    getCookie('bili_jct');
  // 新建 网络请求 对象
  var koe_41_xhr = new XMLHttpRequest();
  // 设置请求类型、请求地址、是否异步
  koe_41_xhr.open(
    'POST',
    'https://api.bilibili.com/x/space/channel/video/sort',
    true
  );
  // 携带验证 ( cookie )
  koe_41_xhr.withCredentials = true;
  // 设置请求头 Content-Type
  koe_41_xhr.setRequestHeader(
    'content-type',
    'application/x-www-form-urlencoded'
  );
  // 发送请求，并将参数传入其中
  koe_41_xhr.send(koe_41_param);
  // 监听状态变化
  koe_41_xhr.onreadystatechange = function () {
    // 判断是否请求成功
    if (koe_41_xhr.readyState === 4 && koe_41_xhr.status === 200 && koe_41_num === num) {
      koe_41_p.innerText = '排序完成，正在刷新页面';
      setTimeout('window.location.reload()', 1000);
    }
  };
}

for (i = 1; i <= koe_41_num; i++) {
  setTimeout(
    'koe_41_sort(bv2av_com_bv2av(koe_41_li[' +
      i +
      "].getAttribute('data-aid')), " + i + ");",
    i * 500
  );
}
