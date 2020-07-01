if (typeof koe_35_p === 'undefined') {
  var koe_35_select = false;
  var koe_35_p = document.createElement('p');
  koe_35_p.innerText = '请选择图片';
  koe_35_p.setAttribute(
    'style',
    'position:fixed; top:0; left:0; padding: 3px 10px; height:30px; line-height:30px; text-align:center; background-color:#000; color:#FFF; font-size:26px; z-index:99999999'
  );
  document.body.appendChild(koe_35_p);

  var koe_35_imgs = document.querySelectorAll('img');

  koe_35_imgs.forEach(function (img) {
    img.addEventListener('click', koe_35_search);
  });

  function koe_35_search() {
    var thisImg = this;
    var img_offset = getOffset(thisImg);

    koe_35_p.innerText = '正在搜索';

    var newImg = new Image();
    newImg.crossOrigin = '*';
    newImg.onload = function () {
      var koe_35_canvas = document.createElement('canvas');
      koe_35_canvas.width = newImg.naturalWidth;
      koe_35_canvas.height = newImg.naturalHeight;
      var koe_35_ctx = koe_35_canvas.getContext('2d');
      koe_35_ctx.drawImage(
        newImg,
        0,
        0,
        koe_35_canvas.width,
        koe_35_canvas.height
      );

      var koe_35_xhr = new XMLHttpRequest();
      koe_35_xhr.open('POST', 'https://trace.moe/api/search', 'true');
      koe_35_xhr.setRequestHeader('content-type', 'application/json');
      koe_35_xhr.send(
        JSON.stringify({ image: koe_35_canvas.toDataURL('image/jpeg', 0.8) })
      );
      koe_35_xhr.onreadystatechange = function () {
        if (koe_35_xhr.readyState === 4 && koe_35_xhr.status === 200) {
          var json = JSON.parse(koe_35_xhr.responseText);
          if (json.docs.length > 0) {
            var at_m = parseInt(json.docs[0].at / 60);
            var at_s = parseInt(json.docs[0].at % (60));
            koe_35_p.innerText = '成功！正在加载视频';
            var src =
              'https://trace.moe/preview.php?anilist_id=' +
              json.docs[0].anilist_id +
              '&file=' +
              encodeURIComponent(json.docs[0].filename) +
              '&t=' +
              json.docs[0].at +
              '&token=' +
              json.docs[0].tokenthumb;
            var videoElement = document.createElement('video');
            videoElement.autoplay = true;
            videoElement.loop = true;
            videoElement.controls = true;
            videoElement.setAttribute(
              'style',
              'position: absolute; z-index: 9999999'
            );
            videoElement.style.top = img_offset.top + 'px';
            videoElement.style.left = img_offset.left + 'px';
            videoElement.style.width = thisImg.style.width;
            videoElement.style.height = thisImg.style.height;
            videoElement.src = src;
            videoElement.addEventListener('canplaythrough', function () {
              // 播放视频后 才能再次选择图片
              koe_35_select = true;
              koe_35_p.innerText = json.docs[0].title + '，第' + json.docs[0].episode + '集，时间：' + at_m + ':' + at_s;
            });
            document.body.appendChild(videoElement);
          } else {
            koe_35_p.innerText = '没有搜索到';
          }
        }
      };
    };
    newImg.src = this.src;

    koe_35_imgs.forEach(function (img) {
      img.removeEventListener('click', koe_35_search);
    });
  }

  // https://www.cnblogs.com/wenjiajia/p/5957070.html
  function getOffset(curEle) {
    var totalLeft = null,
      totalTop = null,
      par = curEle.offsetParent;
    //首先把自己本身的进行累加
    totalLeft += curEle.offsetLeft;
    totalTop += curEle.offsetTop;

    //只要没有找到body，我们就把父级参照物的边框和偏移量累加
    while (par) {
      if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
        //不是标准的ie8浏览器，才进行边框累加
        //累加父级参照物边框
        totalLeft += par.clientLeft;
        totalTop += par.clientTop;
      }
      //累加父级参照物本身的偏移
      totalLeft += par.offsetLeft;
      totalTop += par.offsetTop;
      par = par.offsetParent;
    }
    return { left: totalLeft, top: totalTop };
  }
} else {
  koe_35_p.innerText = '选择图片';
  koe_35_p.style.display = 'block';
  // 是否能选择图片
  if (koe_35_select) {
    koe_35_imgs.forEach(function (img) {
      img.addEventListener('click', koe_35_search);
    });
  }
}
