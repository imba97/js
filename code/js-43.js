var koe_43_type_name = {
  1: '播放',
  3: '评论',
  2: '弹幕',
  8: '点赞',
  4: '分享',
  5: '硬币',
  6: '收藏',
  7: '充电',
};

// 日期格式化
if (typeof formatDate === 'undefined') {
  function formatDate(date) {
    var date = new Date(date*1000);
    var YY = date.getFullYear() + '-';
    var MM =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-';
    var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return YY + MM + DD;
  }
}

// 当前 type name 的 index
var koe_43_current_index = 0;

// 表格数据
var koe_43_data = new Array();
koe_43_data.push(
  ',' +
    Object.keys(koe_43_type_name)
      .map(function (item) {
        return koe_43_type_name[item];
      })
      .join(',')
);

// 请求数据
var koe_43_xhr_data = new Array();
// 日期
var koe_43_date = new Array();
// 是否已经完成一次日期统计 日期只需要统计一次
var koe_43_date_is_complete = false;
koe_43_getData();
function koe_43_getData() {
  var koe_43_keys = Object.keys(koe_43_type_name);
  var koe_43_xhr = new XMLHttpRequest();
  koe_43_xhr.open(
    'GET',
    'https://member.bilibili.com/x/web/data/pandect?type=' +
      koe_43_keys[koe_43_current_index],
    'true'
  );
  koe_43_xhr.send();
  koe_43_xhr.onreadystatechange = function () {
    if (koe_43_xhr.readyState === 4 && koe_43_xhr.status === 200) {
      var json = JSON.parse(koe_43_xhr.responseText);
      koe_43_xhr_data[koe_43_keys[koe_43_current_index]] = new Array();

      json.data.forEach(function (item) {
        if (!koe_43_date_is_complete) {
          koe_43_date.push(formatDate(item.date_key));
        }
        koe_43_xhr_data[koe_43_keys[koe_43_current_index]].push(item.total_inc);
      });

      koe_43_date_is_complete = true;

      // 所有数据请求完成
      if (koe_43_keys.length - 1 === koe_43_current_index) {

        koe_43_date.forEach(function(item, index) {
          var data_everyday = new Array();
          koe_43_keys.forEach(function(type_index) {
            data_everyday.push(koe_43_xhr_data[type_index][index]);
          });
          koe_43_data.push(item + ',' + data_everyday.join(','));
        });
        
        // 创建Blob对象 传入一个合适的MIME类型
        const blob = new Blob(['\ufeff' + koe_43_data.join('\n')], {
          type: 'text/csv,charset=UTF-8',
        });
        // 参考链接 https://developer.mozilla.org/zh-CN/docs/Web/API/Blob
        // 使用 Blob 创建一个指向类型化数组的URL
        const csvUrl = URL.createObjectURL(blob); // 参考链接 https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL
        let link = document.createElement('a');
        link.download = koe_43_date[koe_43_date.length-1].replace(/-/g, '') + '-' + koe_43_date[0].replace(/-/g, '') + '.csv'; //文件名字
        link.href = csvUrl;
        // 触发下载
        link.click();
      } else {
        ++koe_43_current_index;
        koe_43_getData();
      }
    }
  };
}
