let cookieQueue = [];
const originalCookieSetter = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie').set;
Object.defineProperty(document, 'cookie', {
  set: function(value) {
    if (localStorage.getItem('cookieConsent')) {
      originalCookieSetter.call(document, value);
      return;
    }

    cookieQueue.push(value);
  }
});

window.cookieConsent = (value) => {
  localStorage.setItem('cookieConsent', value)

  if (localStorage.getItem('cookieConsent')) {
    cookieQueue.forEach(item => {
      originalCookieSetter.call(document, item);
    });
    cookieQueue = [];
  }
}

function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}
