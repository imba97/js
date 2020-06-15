// 判断 bv2av 函数有没有创建，用于计算bv转av，源码来自：http://bv2av.com/
if (typeof bv2av_com_bv2av === 'undefined') {
  // 没有则创建
  const bv2av_com_table = [...'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'];
  const bv2av_com_s = [11, 10, 3, 8, 4, 6];
  const bv2av_com_xor = 177451812;
  const bv2av_com_add = 8728348608;
  var bv2av_com_bv2av = (bv) => {
    let str = '';
    if (bv.length === 12) {
      str = bv;
    } else if (bv.length === 10) {
      str = `BV${bv}`;
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
    return `av${(result - bv2av_com_add) ^ bv2av_com_xor}`;
  };
}
// 获取BV号将其转为AV号，再用弹出框将其显示
prompt('AV号', bv2av_com_bv2av(__INITIAL_STATE__.bvid));
