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

async function getMyUrl() {
  try {
    const response = await fetch('/.netlify/functions/getMyUrl');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.myURL;
  } catch (error) {
    console.error('Error fetching the API URL:', error);
  }
}

async function getMonths() {
  try {
    const apiUrl = await getMyUrl();

    if (!apiUrl) {
      throw new Error('API URL is not available');
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiUrl}/months`, true); // Use the API URL from the Netlify function
    xhr.onload = function() {
      if (xhr.status === 200) {
        var months = JSON.parse(xhr.responseText);
        var list = '';
        for (var i = 0; i < months.length; i++) {
          list += '<li>' + months[i] + '</li>';
        }
        document.getElementById('months-list').innerHTML = '<ul>' + list + '</ul>';
      } else {
        console.error('Error fetching months:', xhr.status, xhr.statusText);
      }
    };
    xhr.onerror = function() {
      console.error('Request error');
    };
    xhr.send();
  } catch (error) {
    console.error('Error fetching months:', error);
  }
}
