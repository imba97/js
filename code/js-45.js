if (typeof koe_45_style === 'undefined') {
  var koe_45_is_show = true;
  var koe_45_style = document.createElement('style');
  koe_45_style.innerText =
    '.koe_45_ul { position: absolute; width: 400px; -webkit-transform: translate(-33%, 5%); -moz-transform: translate(-33%, 5%); transform: translate(-33%, 5%); } .koe_45_ul li { color: #000; text-align: left; } .koe_45_ul li:nth-of-type(odd) { background-color: #EEE; } .koe_45_ul li:nth-of-type(even) { background-color: #DDD; }';

  document.head.appendChild(koe_45_style);

  document
    .querySelectorAll('#tp-bought-root table a[action=a4]')
    .forEach(function (element) {
      element.parentElement.style.position = 'relative';
      var koe_45_trade_id = /trade_id=(\d+)/.exec(element.href)[1];
      var koe_45_xhr = new XMLHttpRequest();
      koe_45_xhr.open(
        'GET',
        'https://buyertrade.taobao.com/trade/json/transit_step.do?bizOrderId=' +
          koe_45_trade_id,
        true
      );
      koe_45_xhr.send();
      koe_45_xhr.onreadystatechange = function () {
        if (koe_45_xhr.readyState === 4 && koe_45_xhr.status === 200) {
          var address_ul = document.createElement('ul');
          address_ul.setAttribute('class', 'koe_45_ul');
          var json = JSON.parse(koe_45_xhr.responseText);
          var address_li = '';
          if (json.address.length > 0) {
            json.address.forEach(function (item, index) {
              if (index < 3)
                address_li += '<li>' + item.time + ' ' + item.place + '</li>';
            });
          } else {
            address_li = '<li>无记录</li>';
          }
          address_ul.innerHTML = address_li;
          element.parentElement.appendChild(address_ul);
        }
      };
    });
} else {
  if (koe_45_is_show) {
    koe_45_is_show = false;
    document.querySelectorAll('.koe_45_ul').forEach(function (element) {
      element.style.display = 'none';
    });
  } else {
    koe_45_is_show = true;
    document.querySelectorAll('.koe_45_ul').forEach(function (element) {
      element.style.display = 'block';
    });
  }
}
