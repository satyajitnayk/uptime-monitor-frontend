const BASE_URL = 'https://uptime-monitor-one.vercel.app';
const FRONTEND_BASE_URL = 'http://127.0.0.1:5501';
// ('https://satyajitnayk.github.io/uptime-monitor-frontend');

function createCookie({ name, value, days }) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + '=');
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(';', c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return '';
}

function deleteCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

async function getConfiguredURLS() {
  let response = await fetch(`${BASE_URL}/urls`, {
    headers: {
      Authorization: getCookie('accessToken'),
      'Access-Control-Allow-Origin': '*',
    },
  });
  if (response.ok) {
    // if HTTP-status is 200-299
    response = await response.json();
    let table = document.getElementById('urls-table');
    response.data?.map((urldata) => {
      var row = table.insertRow(0);
      row.id = urldata.urlId;
      row.setAttribute('onclick', 'getUrlInfo(this)');
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      cell1.innerHTML = urldata.urlId;
      cell2.innerHTML = urldata.url;
      cell3.innerHTML = urldata.freqInMin;
      cell4.innerHTML = urldata.retentionInDays;
      cell5.innerHTML = urldata.lastRun;
      cell6.innerHTML = urldata.createdAt;
      cell7.innerHTML = urldata.updatedAt;
    });
  } else {
    alert('HTTP-Error: ' + response.status);
  }
}

const Redirect = (url) => {
  window.location.replace(url);
};

async function logout() {
  deleteCookie('accessToken');
  Redirect(`${FRONTEND_BASE_URL}`);
}

 function getUrlInfo(row) {
  console.log('urlInfo called with id', row.id);
  Redirect(`${FRONTEND_BASE_URL}/url.html`);

  // await delay(10000);
}

async function getUrlData()

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
