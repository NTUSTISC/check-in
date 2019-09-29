let scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 });
scanner.addListener('scan', function (content) {
  var token = content.substr(0, 40);
  console.log(token);
  var tokenDiv = document.getElementById('token');
  tokenDiv.innerHTML = token;
  var output = httpGet('https://script.google.com/macros/s/AKfycbwIy1RuKcGxtUI0caTyLC9LZia6m3gVdKrPXQAYU8cw7el_MBs/exec?token=' + token);
  console.log(output);
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = output;
});

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[cameras.length-1]);
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
