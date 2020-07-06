// 快退

if(typeof koe_39_forward_timer === 'undefined' || koe_39_forward_timer === null) {
  if(typeof koe_39_video === 'undefined') var koe_39_video = document.querySelector('video');
  var koe_39_forward_timer = setInterval(function() {
    if(koe_39_video.currentTime - 1 > 0) {
      koe_39_video.currentTime -= 1;
    } else {
      koe_39_video.currentTime = 0;
      clearInterval(koe_39_forward_timer);
      koe_39_forward_timer = null;
    }
    koe_39_video.currentTime = koe_39_time > 0 ? koe_39_time : 0;
  }, 50);
} else {
  clearInterval(koe_39_forward_timer);
  koe_39_forward_timer = null;
}


// 快进

if(typeof koe_39_forward_timer === 'undefined' || koe_39_forward_timer === null) {
  if(typeof koe_39_video === 'undefined') var koe_39_video = document.querySelector('video');
  var koe_39_forward_timer = setInterval(function() {
    if(koe_39_video.currentTime + 1 < koe_39_video.duration) {
      koe_39_video.currentTime += 1;
    } else {
      koe_39_video.currentTime += koe_39_video.duration;
      clearInterval(koe_39_forward_timer);
      koe_39_forward_timer = null;
    }
  }, 50);
} else {
  clearInterval(koe_39_forward_timer);
  koe_39_forward_timer = null;
}
