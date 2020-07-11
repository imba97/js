if (document.querySelector('#koe_44_audio') === null) {
  if (typeof koe_44_dbclick === 'undefined' || koe_44_dbclick === null) {
    var koe_44_dbclick = false;
  } else {
    if (koe_44_dbclick === false) koe_44_dbclick = true;
  }

  if (typeof koe_44_timer === 'undefined') var koe_44_timer = null;
  if (koe_44_timer !== null) clearTimeout(koe_44_timer);

  var koe_44_interval = null;
  var koe_44_p = null;

  koe_44_timer = setTimeout(function () {
    // 默认 10 分钟
    var koe_44_time = 600;
    if (koe_44_dbclick) {
      koe_44_time = (parseInt(prompt('请输入分钟')) || 10) * 60;
    }
    var koe_44_style = document.createElement('style');
    koe_44_style.innerText =
      '.koe_44_p { position: fixed; top: 0; left: 0; padding: 5px; width: auto; height: 30px; line-height: 30px; font-size: 26px; text-align: center; color: #FFF; background-color: #000; z-index: 999999; }';

    var koe_44_audio = document.createElement('audio');
    koe_44_audio.setAttribute('id', 'koe_44_audio');
    koe_44_audio.loop = true;
    koe_44_audio.src =
      'https://onedrive.gimhoy.com/1drv/aHR0cHM6Ly8xZHJ2Lm1zL3UvcyFBcDVHUVdqS1ViZm5nLXNoUFZWTlB5Tk16LXRabGc=.mp3';

    koe_44_p = document.createElement('p');
    koe_44_p.setAttribute('class', 'koe_44_p');

    document.head.appendChild(koe_44_style);

    document.body.appendChild(koe_44_p);
    document.body.appendChild(koe_44_audio);
    koe_44_interval = setInterval(function () {
      koe_44_p.innerText = --koe_44_time;
      if (koe_44_time <= 0) {
        koe_44_audio.play();
        clearInterval(koe_44_interval);
      }
    }, 1000);
    koe_44_dbclick = null;
  }, 250);
} else {
  clearInterval(koe_44_interval);
  if(koe_44_p !== null) koe_44_p.remove();
  koe_44_audio.remove();
}
