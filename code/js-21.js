if(typeof koe_21_jquery === 'undefined') {
  function koe_21_jquery() {
    if($('body').is(':hidden')) {
      $('body').fadeIn();
    } else {
      $('body').fadeOut();
    }
  }
}

if(typeof jQuery === 'function') {
  koe_21_jquery();
} else {
  if(document.querySelector('#koe_21_jquery') === null) {
    var koe_21_script = document.createElement('script');
    koe_21_script.type = 'text/javascript';
    koe_21_script.src = 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js';
    koe_21_script.setAttribute('id', 'koe_21_jquery');
    document.head.appendChild(koe_21_script);
    koe_21_script.onload = koe_21_jquery;
  }
}
