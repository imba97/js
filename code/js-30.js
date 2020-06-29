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
    }
  };
  this.buttonElement = document.createElement('button');
  this.buttonElement.innerText = options.value;
  this.buttonElement.style.backgroundColor = options.backgroundColor;
  this.buttonElement.onclick = function() {
    if(self.isAllowClick) options.onclick();
  };
  document.body.appendChild(this.buttonElement);
}

var b1 = new Button({
  value: '一个按钮',
  backgroundColor: '#F66',
  onclick: function() {
    alert('click');
  }
});

var b2 = new Button({
  value: '第二个按钮',
  backgroundColor: '#666',
  onclick: function() {
    alert('2');
  }
});