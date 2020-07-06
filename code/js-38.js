var koe_38_money = window
  .getSelection()
  .toString()
  .replace(/[^\d^\.]+/g, '');
koe_38_money = koe_38_money === '' ? prompt('请输入日元金额') : koe_38_money;

var koe_38_script = document.createElement('script');
koe_38_script.src =
  'https://sapi.k780.com/?app=finance.rate&scur=JPY&tcur=CNY&appkey=XXXXX&sign=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&format=json&jsoncallback=koe_38_callback';
document.body.appendChild(koe_38_script);

if (typeof koe_38_callback === 'undefined') {
  function koe_38_callback(json) {
    if (json.success === '1') {
      alert((parseFloat(json.result.rate) * parseFloat(koe_38_money)).toFixed(2));
    }
    document.body.removeChild(koe_38_script);
  }
}
