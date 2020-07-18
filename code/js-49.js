String.prototype.xhr = function(param) {
  var xhr = new XMLHttpRequest();
  var stringObject = this;
  xhr.open('GET', this + '?' + param, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      stringObject.xhrCallback(JSON.parse(xhr.responseText));
    }
  }

  return this;
}

String.prototype.xhrCallback = null;
String.prototype.setXhrCallback = function(callback) {
  this.xhrCallback = callback;
}

'https://bili.imba97.cn/ji.php'
.xhr('kw=恶臭')
.setXhrCallback(function(json) {
    console.log(json);
});