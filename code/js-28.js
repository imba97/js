if (typeof koe_28_like_detail === 'undefined') {
  var koe_28_page = 1;
  var koe_28_users = new Array();
  var koe_28_timer = null;
  var koe_28_u = {};

  var koe_28_div = document.createElement('div');
  koe_28_div.setAttribute(
    'style',
    'position: fixed; top: 50%; left: 50%; width: 300px; height: 50px; transform: translate(-50%,-50%); background-color: #000;'
  );
  document.body.appendChild(koe_28_div);

  var koe_28_img = document.createElement('img');
  koe_28_img.setAttribute(
    'style',
    'width: 50px; height: 50px; border-radius: 25px;'
  );
  koe_28_div.appendChild(koe_28_img);

  var koe_28_p = document.createElement('p');
  koe_28_p.setAttribute(
    'style',
    'position: absolute; top: 0; left: 50px; width: 250px; height: 50px; line-height: 50px; text-align: center; font-size: 26px; font-weight: 700; color: #FFF;'
  );
  koe_28_div.appendChild(koe_28_p);

  var koe_28_span = document.createElement('span');
  koe_28_span.innerText = '×';
  koe_28_span.setAttribute(
    'style',
    'position: absolute; top: 0; right: 0; font-size: 20px; font-weight: 700; color: #FFF; cursor: pointer;'
  );
  koe_28_div.appendChild(koe_28_span);
  koe_28_span.onclick = function () {
    koe_28_div.style.display = 'none';
    clearInterval(koe_28_timer);
    koe_28_timer = null;
  };

  function koe_28_like_detail() {
    var koe_28_xhr = new XMLHttpRequest();
    koe_28_xhr.open(
      'GET',
      'https://api.bilibili.com/x/msgfeed/like_detail?card_id=' +
        koe_28_get_card_id() +
        '&last_view_at=0&pn=' +
        koe_28_page +
        '&build=0&mobi_app=web',
      true
    );
    koe_28_xhr.withCredentials = true;
    koe_28_xhr.send();
    koe_28_xhr.onreadystatechange = function () {
      if (koe_28_xhr.readyState === 4 && koe_28_xhr.status === 200) {
        var json = JSON.parse(koe_28_xhr.responseText);
        json.data.items.forEach(function (userInfo) {
          koe_28_users.push({
            avatar: userInfo.user.avatar,
            follow: userInfo.user.follow,
            mid: userInfo.user.mid,
            nickname: userInfo.user.nickname,
          });
        });
        if (!json.data.page.is_end) {
          koe_28_page++;
          koe_28_like_detail();
        } else {
          koe_28_timer = setInterval(function () {
            koe_28_u =
              koe_28_users[w3school_getRndInteger(0, koe_28_users.length - 1)];
            koe_28_img.src = koe_28_u.avatar;
            koe_28_p.innerText = koe_28_u.nickname;
          }, 100);
        }
      }
    };
  }

  koe_28_like_detail();

  function koe_28_get_card_id() {
    return /\/love\/(\d+)/.exec(window.location.href)[1];
  }

  function w3school_getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
} else {
  if (koe_28_timer !== null) {
    koe_28_p.innerHTML = '<a href="https://space.bilibili.com/' + koe_28_u.mid + '" target="_blank">' + koe_28_u.nickname + '</a>';
    clearInterval(koe_28_timer);
    koe_28_timer = null;
  } else {
    koe_28_page = 1;
    koe_28_users = new Array();
    koe_28_div.style.display = 'block';
    koe_28_like_detail();
  }
}
