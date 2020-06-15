// 判断是否有 getScreenshot 函数
if (typeof koe_13_getScreenshot === 'undefined') {
  // 没有则创建，这个函数是获取截图用的，返回图片的 base64 代码
  function koe_13_getScreenshot() {
    // 选取 video 标签
    var videoElement = document.querySelector('video');
    // 创建画布
    var canvas = document.createElement('canvas');
    // 设置画布宽高为 视频分标率大小
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    // 向画布添加内容
    canvas
      .getContext('2d')
      .drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    // 将画布内容转为 data:image/png;base64，并返回
    return canvas.toDataURL('image/png');
  }
  // 设置 downloadFile，用于下载图片
  function koe_13_downloadFile(fileName, content) {
    let aLink = document.createElement('a');
    let blob = koe_13_base64ToBlob(content);
    let evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', true, true);
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
  }
  // base64ToBlob 格式转换，在 downloadFile 中用到了
  function koe_13_base64ToBlob(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }
}
// 如果 不存在 截图图片
if (typeof koe_13_img === 'undefined') {
  // 则创建
  var koe_13_img = document.createElement('img');
  koe_13_img.setAttribute('src', koe_13_getScreenshot());
  koe_13_img.setAttribute(
    'style',
    'position: fixed;top:50%;left:50%;transform: translate(-50%,-50%);z-index:99999999'
  );
  // 监听点击事件，执行下载
  koe_13_img.addEventListener('click', function () {
    koe_13_downloadFile('截图.png', this.src);
  });
  document.body.appendChild(koe_13_img);
} else {
  // 如果图片显示
  if (koe_13_img.style.display === '' || koe_13_img.style.display === 'block') {
    // 则设为隐藏
    koe_13_img.style.display = 'none';
  } else {
    // 否则重新获取 base64 内容，把新获取的这一帧截图放到图片 src 中
    koe_13_img.setAttribute('src', koe_13_getScreenshot());
    // 并将图片显示
    koe_13_img.style.display = 'block';
  }
}
void 0;
