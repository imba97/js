/**
 * 排行榜
 */
function Ranking(element) {
  var style = document.createElement('style');
  style.innerText = `
  
    body {
        overflow-x: hidden;
    }

    .ranking {
      position: relative;
      padding-left: 0;
      width: 100%;
    }

    .ranking li {
      position: relative;
      list-style: none;
    }
    
    .ranking li p {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    
    .ranking li p a {
        display: block;
    }

    .ranking li p {
      position: absolute;
    }

    .ranking li:nth-child(1),
    .ranking li:nth-child(2),
    .ranking li:nth-child(3) {
      position: absolute;
      left: 50%;
    }

    .ranking li:nth-child(1) {
      top: 0;
      width: 40%;
      max-width: 800px;
      -webkit-transform: translate(-50%,0);
      -moz-transform: translate(-50%,0);
      transform: translate(-50%,0);
    }

    .ranking li:nth-child(2) {
      top: 12vw;
      width: 20%;
      max-width: 400px;
      -webkit-transform: translate(-220%,0);
      -moz-transform: translate(-220%,0);
      transform: translate(-220%,0);
    }

    .ranking li:nth-child(3) {
      top: 12vw;
      width: 20%;
      max-width: 400px;
      -webkit-transform: translate(120%,0);
      -moz-transform: translate(120%,0);
      transform: translate(120%,0);
    }
    
    @media screen and (max-width: 1200px) {

        .ranking {
          padding-top: calc(36vw + 60px);
        }
    
        .ranking li .title,
        .ranking li .count {
          font-size: 10px;
        }
        
        .ranking li:nth-of-type(n+4) .title {
          width: calc(100% - 100px)
        }
        
        .ranking li:nth-of-type(n+4) {
          height: 60px;
        }
        
        .ranking li:nth-of-type(n+4) .title {
          left: 100px;
        }
        
        .ranking li:nth-of-type(n+4) .count {
          top: 30px;
          left: 100px;
        }

        .ranking li:nth-child(1) .title,
        .ranking li:nth-child(2) .title,
        .ranking li:nth-child(3) .title {
          bottom: -40px;
          left: 0;
        }
        
        .ranking li:nth-child(1) .count,
        .ranking li:nth-child(2) .count,
        .ranking li:nth-child(3) .count {
          bottom: -70px;
          left: 0;
        }
    }
    
    @media screen and (min-width:1201px){

        .ranking {
          padding-top: calc(23vw + 120px);
        }
    
        .ranking li .title,
        .ranking li .count {
          font-size: 20px;
        }
        
        .ranking li:nth-of-type(n+4) {
          height: 100px;
        }
        
        .ranking li:nth-of-type(n+4) .title {
          left: 200px;
        }
        
        .ranking li:nth-of-type(n+4) .count {
          top: 50px;
          left: 200px;
        }

        .ranking li:nth-child(1) .title,
        .ranking li:nth-child(2) .title,
        .ranking li:nth-child(3) .title {
          bottom: -80px;
          left: 0;
        }
        
        .ranking li:nth-child(1) .count,
        .ranking li:nth-child(2) .count,
        .ranking li:nth-child(3) .count {
          bottom: -110px;
          left: 0;
        }
    }

    .ranking li:nth-child(1) img,
    .ranking li:nth-child(2) img,
    .ranking li:nth-child(3) img {
      width: 100%;
    }

    .ranking li:nth-of-type(n+4) {
      width: 100%;
      border-bottom: 1px #000 solid;
    }

    .ranking li:nth-of-type(n+4) img {
      height: 100%;
    }

    .ranking li:nth-of-type(n+4) .title {
      top: 0;
    }
  `;
  document.head.appendChild(style);

  if (typeof element !== 'undefined') {
    this.element =
      typeof element === 'string' ? document.querySelector(element) : element;
  } else {
    this.element = null;
  }
}

Ranking.prototype.getDataWithURL = function (url) {
  var self = this;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      self.createList(json);
    }
  };

  return this;
};

Ranking.prototype.createList = function (json) {
  var ranking_ul = document.createElement('ul');
  ranking_ul.setAttribute('class', 'ranking');
  var html = '';

  json.forEach(function (item) {
    var url =
      typeof item.url === 'undefined'
        ? 'https://b23.tv/av' + item.aid
        : item.url;

    html +=
      '<li><img src="' +
      item.pic +
      '"><p class="title"><a href="' +
      url +
      '" target="_blank">' +
      item.title.replace('每天一个JS程序', '') +
      '</a></p>';

    if (typeof item.message !== 'undefined') {
      html += '<p class="count">' + item.message + '</p>';
    } else {
      html +=
        '<p class="count">总分：' +
        (item.view + item.like * 2 + item.coin * 5 + item.favorite * 3) +
        '</p>';
    }

    html += '</li>';
  });

  ranking_ul.innerHTML = html;

  this.element.appendChild(ranking_ul);
};
