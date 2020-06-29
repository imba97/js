function Button(options) {
  var self = this;
  this.isAllowClick = true;
  this.setup = {
    set success(val) {
      if(val) {
        self.buttonElement.innerText = '成功';
        self.buttonElement.style.backgroundColor = '#3F3';
      } else {
        self.buttonElement.innerText = '失败';
        self.buttonElement.style.backgroundColor = '#F33';
      }
    },
    set isAllowClick(val) {
      if(val) self.buttonElement.removeAttribute('disabled');
      else self.buttonElement.setAttribute('disabled', '');
      self.isAllowClick = val;
    },
    set isLoading(val) {
      if(val) {
        self.buttonElement.innerHTML = Button.loadingSVG(options.color);
      } else {
        self.buttonElement.innerText = options.value;
      }
    }
  };
  this.buttonElement = document.createElement('button');
  this.buttonElement.innerText = options.value;
  this.buttonElement.setAttribute('style', 'width: 100px; height: 50px; line-height: 30px; border: 0; border-radius: 5px; font-size: 20px;');
  this.buttonElement.style.color = options.color;
  this.buttonElement.style.backgroundColor = options.backgroundColor;
  this.buttonElement.onclick = function() {
    if(self.isAllowClick) options.onclick(self);
  };
  document.body.appendChild(this.buttonElement);
}

Button.loadingSVG = function(color) {
  color = color || '#000';
  return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/></rect></g><g transform="rotate(30 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/></rect></g><g transform="rotate(60 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"/></rect></g><g transform="rotate(90 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/></rect></g><g transform="rotate(120 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/></rect></g><g transform="rotate(150 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"/></rect></g><g transform="rotate(180 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/></rect></g><g transform="rotate(210 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/></rect></g><g transform="rotate(240 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"/></rect></g><g transform="rotate(270 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/></rect></g><g transform="rotate(300 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/></rect></g><g transform="rotate(330 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="' + color + '"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/></rect></g></svg>';
}

var b1 = new Button({
  value: '一个按钮',
  color: '#FFF',
  backgroundColor: '#F66',
  onclick: function(thisBtn) {
    thisBtn.setup.isAllowClick = false;
    thisBtn.setup.isLoading = true;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://bili.imba97.cn/t.php', true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        thisBtn.setup.isAllowClick = true;
        var json = JSON.parse(xhr.responseText);
        if(json.success === 1) {
          thisBtn.setup.success = true;
        } else {
          thisBtn.setup.success = false;
        }
      }
    }
  }
});

var b2 = new Button({
  value: '第二个按钮',
  color: '#000',
  backgroundColor: '#CCC',
  onclick: function(thisBtn) {
    thisBtn.setup.isAllowClick = false;
    thisBtn.setup.isLoading = true;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://bili.imba97.cn/t.php', true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        thisBtn.setup.isAllowClick = true;
        var json = JSON.parse(xhr.responseText);
        if(json.success === 1) {
          thisBtn.setup.success = true;
        } else {
          thisBtn.setup.success = false;
        }
      }
    }
  }
});
