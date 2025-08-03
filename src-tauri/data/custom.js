console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// 移除可能包含廣告跳轉的函數
function removeAdFunctions() {
  if (window.loadAds) {
    window.loadAds = function() {};
  }
  if (window.aclib) {
    window.aclib = {};
  }
}

// 攔截點擊事件
document.addEventListener('click', function(e) {
  if (e.target.tagName === 'A') {
    const href = e.target.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('//')) {
      e.preventDefault();
      window.location.href = href;
    }
  }
}, true);

// 在頁面加載完成後執行
window.addEventListener('load', removeAdFunctions);

// 對於動態加載的內容,使用 MutationObserver 來監視 DOM 變化
const observer = new MutationObserver(removeAdFunctions);
observer.observe(document.body, { childList: true, subtree: true });

(function () {
  // 创建按钮
  const btn = document.createElement('button');
  btn.innerText = '显示下载内容';
  btn.style.position = 'fixed';
  btn.style.bottom = '20px';
  btn.style.right = '20px';
  btn.style.zIndex = '9999';
  btn.style.padding = '10px 15px';
  btn.style.backgroundColor = '#007bff';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '5px';
  btn.style.cursor = 'pointer';
  btn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
  document.body.appendChild(btn);

  // 点击按钮后执行
  btn.onclick = function () {
    const downloadLinks = Array.from(document.querySelectorAll('a')).filter(a => {
      const href = a.href || '';
      return a.hasAttribute('download') ||
             href.match(/\.(zip|exe|pdf|rar|mp4|apk|7z|tar|gz|docx?|xlsx?|pptx?)$/i);
    });

    if (downloadLinks.length === 0) {
      alert('未发现可下载内容。');
      return;
    }

    const content = downloadLinks.map((a, i) => `${i + 1}. ${a.href}`).join('\n\n');
    alert('发现以下下载内容：\n\n' + content);
  };
})();
