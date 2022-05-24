let cookieQueue = [];
const originalCookieSetter = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie').set;
const originalCookieGetter = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie').get;
Object.defineProperty(document, 'cookie', {
  set: function(value) {
    if (localStorage.getItem('cookieConsent') === 'true') {
      originalCookieSetter.call(document, value);
      return;
    }

    cookieQueue.push(value);
  }
});

window.cookieConsent = (value) => {
  localStorage.setItem('cookieConsent', value)

  if (localStorage.getItem('cookieConsent') === 'true') {
    cookieQueue.forEach(item => {
      originalCookieSetter.call(document, item);
    });
    cookieQueue = [];
  } else {
    deleteAllCookies();
    localStorage.clear();
    window.location.reload();
  }
}

function deleteAllCookies() {
  const originalCookie = originalCookieGetter.call(document);
  var cookies = originalCookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      originalCookieSetter.call(document, name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT");
  }
}

function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}
