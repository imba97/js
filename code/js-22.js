// 判断是否没添加 audio
if(document.querySelector('#koe_22_audio') === null) {
  // 获取选中文本 并去除两端空格
  var koe_22_selected = window.getSelection().toString().replace(/(^\s+|\s+$)/, '');
  // 选中文本 不等于 空
  if(koe_22_selected !== '') {
    // 创建 audio 标签
    var koe_22_audio = document.createElement('audio');
    // 设置 自动播放
    koe_22_audio.setAttribute('autoplay', '');
    // 设置 name
    koe_22_audio.setAttribute('name', 'media');
    // 设置 id
    koe_22_audio.setAttribute('id', 'koe_22_audio');

    // 监听播放结束，结束后删除 audio 标签
    koe_22_audio.addEventListener('ended', function() {
      this.remove();
    });

    // 创建 资源
    var koe_22_source = document.createElement('source');
    // 设置 资源格式
    koe_22_source.setAttribute('type', 'audio/mpeg');
    // 设置 src 等于 百度的文字转音频接口
    koe_22_source.src = 'http://tts.baidu.com/text2audio?lan=en&ie=UTF-8&spd=5&text=' + koe_22_selected;

    // 将 资源 添加至 audio 标签中
    koe_22_audio.appendChild(koe_22_source);
    // 将 audio 标签 添加至 body 中
    document.body.appendChild(koe_22_audio);
  }
}