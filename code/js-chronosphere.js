if (typeof Chronosphere === 'undefined') {
  function Chronosphere() {
    this.requestUrl = 'https://bili.imba97.cn/chronosphere.php?url=' + window.location.href;

    this.xhr = new XMLHttpRequest();
    
    var self = this;

    this.xhr.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        var json = JSON.parse(this.responseText);
        console.log(json);
        if(json.type === 'get') {
          self.createIframe(json.url);
        }
      }
    }
  }

  Chronosphere.prototype.sendRequest = function() {
    this.xhr.open('GET', this.requestUrl, false);
    this.xhr.send();
  }

  Chronosphere.prototype.createIframe = function(url) {
    var chronosphere_style = document.createElement('style');
    chronosphere_style.innerText = ' *:not(.chronosphere_iframe) { overflow: hidden; } .chronosphere_iframe { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #FFF; z-index: 999999999; }  ';
    document.head.appendChild(chronosphere_style);
    var chronosphere_iframe = document.createElement('iframe');
    chronosphere_iframe.src = url;
    chronosphere_iframe.setAttribute('class', 'chronosphere_iframe');
    document.body.appendChild(chronosphere_iframe);
  }
}

var chronosphere = new Chronosphere();