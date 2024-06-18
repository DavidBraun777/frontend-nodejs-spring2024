var body = document.body;
var root = document.getElementsByTagName('html')[0];

body.classList.remove('no-js');

window.addEventListener('load', function load() {
  window.removeEventListener('load', load, false);
  root.classList.remove('preload');
}, false);

const monthsToggleButton = document.querySelector('.js-months-toggle');
const monthsToggleText = document.querySelector('.js-months-toggle-text');

monthsToggleButton.addEventListener('click', evt => {
  evt.preventDefault();
  getMonths();
});

function getMonths() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `${API_URL}/months`, true); // replace with your API endpoint
  xhr.onload = function() {
    if (xhr.status === 200) {
      var months = JSON.parse(xhr.responseText);
      var list = '';
      for (var i = 0; i < months.length; i++) {
        list += '<li>' + months[i] + '</li>';
      }
      document.getElementById('months-list').innerHTML = '<ul>' + list + '</ul>';
    }
  };
  xhr.send();
}