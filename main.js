let scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false, scanPeriod: 5 });
scanner.addListener('scan', function (content) {
  var token = content.substr(0, 40);
  console.log(token);
  document.getElementById('token').innerHTML = token; // XSS me
  var output = httpGet('https://script.google.com/macros/s/AKfycbwIy1RuKcGxtUI0caTyLC9LZia6m3gVdKrPXQAYU8cw7el_MBs/exec?token=' + token);
  console.log(output);
  document.getElementById('output').innerText = output;
  alert(token + '\n' + output);
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[0]);
  } else {
    console.error('No cameras found.');
  }
}).catch(function (e) {
  console.error(e);
});

function httpGet(theUrl)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}
