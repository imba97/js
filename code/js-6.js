// 判断是否已经召唤懂王
if (typeof koe_knowking_clicked === 'undefined') {
  // 设为 已召唤
  var koe_knowking_clicked = true
  // 判断获取选择文本函数是否已创建
  if (typeof koe_knowking_get_select_text === 'undefined') {
    // 没有则创建，用于获取选中的文本
    function koe_knowking_get_select_text() {
      var resultText = window.getSelection().toString()
      if (selecter != null && koe_knowking_trim(selecter) != '') {
        resultText = selecter
      } else if (typeof document.selection !== 'undefined') {
        var selecter = document.selection.createRange()
        var s = selecter.text
        if (s != null && functionkoe_knowking_trim(s) != '') {
          resultText = s
        }
      }
      return resultText
    }
    // 去除两端空格
    function koe_knowking_trim() {
      return this.replace(/(^\s*)|(\s*$)/g, '')
    }
    // 关闭窗口时停止播放
    window.addEventListener('beforeunload', function () {
      window.open('https://baidu.com')
    })
  }
  // 把选中的文本赋值给变量
  var koe_knowking_selected_text = koe_knowking_get_select_text()
  // [if-0] 判断选中文本不能为空（如果选了空格，最后返回的就是空）并且不等于 null（如果啥都没选就是 null ）
  if (
    koe_knowking_selected_text !== '' &&
    document.querySelector('#koe_knowking_audio') === null
  ) {
    // 判断左上角提示有没有创建，没有的话创建，有的话设置显示
    if (typeof koe_knowking_msg === 'undefined') {
      var koe_knowking_msg = document.createElement('p')
      koe_knowking_msg.setAttribute(
        'style',
        'position:fixed;top:0;left:0;padding:5px 10px;height:30px !important;line-height:30px;text-align:center;background-color:#000;color:#FFF;font-size:26px;z-index:99999999'
      )
      document.body.appendChild(koe_knowking_msg)
    } else {
      koe_knowking_msg.style.display = 'block'
    }
    // 设置提示文本
    koe_knowking_msg.innerText = '懂王祈祷中🙏'
    // 判断样式有没有创建
    if (typeof koe_knowking_style === 'undefined') {
      // 创建样式
      var koe_knowking_style = document.createElement('style')
      koe_knowking_style.innerText =
        '.koe_knowking_content,.koe_knowking_image_1,.koe_knowking_image_2{ position: fixed; left: 50%; transform: translate(-50%,-50%); -webkit-transform: translate(-50%,-50%); -moz-transform: translate(-50%,-50%); z-index: 99999999; display: none; } .koe_knowking_content { top: calc(50% + 200px); padding: 10px; font-size: 20px; color: #FFF; background-color: #000; } .koe_knowking_image_1,.koe_knowking_image_2{ top: 50%; height: 200px; }'
      document.head.appendChild(koe_knowking_style)
      // 创建懂王 content，用于显示文字
      var koe_knowking_content = document.createElement('div')
      koe_knowking_content.setAttribute('class', 'koe_knowking_content')
      document.body.appendChild(koe_knowking_content)
      // 创建两个图片，两个手开合的图
      var koe_knowking_image_1 = document.createElement('img')
      var koe_knowking_image_2 = document.createElement('img')
      koe_knowking_image_1.setAttribute(
        'src',
        'https://pic.downk.cc/item/5ed520b8c2a9a83be55a3848.png'
      )
      koe_knowking_image_2.setAttribute(
        'src',
        'https://pic.downk.cc/item/5ed520b8c2a9a83be55a3843.png'
      )
      koe_knowking_image_1.setAttribute('class', 'koe_knowking_image_1')
      koe_knowking_image_2.setAttribute('class', 'koe_knowking_image_2')
      document.body.appendChild(koe_knowking_image_1)
      document.body.appendChild(koe_knowking_image_2)
      // 设置计时器，用于切换两张图
      var koe_knowking_timer = null
      // 判断是否是第一张图片
      var koe_knowking_is_1 = true
    }
    // 创建网络请求，去查询词义
    var koe_knowking_xhr = new XMLHttpRequest()
    koe_knowking_xhr.open(
      'GET',
      'https://bili.imba97.cn/baike.php?kw=' + koe_knowking_selected_text,
      true
    )
    koe_knowking_xhr.onreadystatechange = function () {
      if (
        (koe_knowking_xhr.readyState == 4 && koe_knowking_xhr.status == 200) ||
        koe_knowking_xhr.status == 304
      ) {
        // 转为 json 对象
        var json = JSON.parse(koe_knowking_xhr.responseText)
        // 调用百度文字转音频接口，默认是懂了个寂寞
        var au = '没有人比我更懂，懂了个寂寞'
        // 如果返回结果正确
        if (json.status === 1) {
          au =
            '没有人比我更懂' + koe_knowking_selected_text + '，' + json.content
          // 创建音频
          var audio = new SpeechSynthesisUtterance(au)
          speechSynthesis.speak(audio)

          // 让左上角的提示隐藏
          koe_knowking_msg.style.display = 'none'
          // 将内容显示
          koe_knowking_content.innerText = json.content
          koe_knowking_content.style.display = 'block'
          // 将图片 1 显示
          koe_knowking_image_1.style.display = 'block'
          // 设置计时器，每 0.3 秒切换图片显示
          koe_knowking_timer = setInterval(function () {
            if (koe_knowking_is_1) {
              koe_knowking_image_1.style.display = 'none'
              koe_knowking_image_2.style.display = 'block'
            } else {
              koe_knowking_image_1.style.display = 'block'
              koe_knowking_image_2.style.display = 'none'
            }
            koe_knowking_is_1 = !koe_knowking_is_1
          }, 300)

          audio.onend = function () {
            // 将懂王设置为 未召唤
            koe_knowking_clicked = undefined
            speechSynthesis.resume()
            // 隐藏词义内容、图片
            koe_knowking_content.style.display = 'none'
            koe_knowking_image_1.style.display = 'none'
            koe_knowking_image_2.style.display = 'none'
            // 重新设置 是否是第一张图片 为 true
            koe_knowking_is_1 = true
            // 清除计时器
            clearInterval(koe_knowking_timer)
            koe_knowking_timer = null
          }
        } else {
          // 如果获取返回内容失败 则让左上角提示
          koe_knowking_msg.innerText = json.content
        }
      }
    }
    // 发送请求
    koe_knowking_xhr.send()

    // [if-0] 没选中文本 则直接设置 懂王未召唤
  } else {
    koe_knowking_clicked = undefined
  }
}
void 0
