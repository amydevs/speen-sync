const querystring = require('querystring');
const open = require('open');
var http = require('http')
const readline = require('readline');

<<<<<<< HEAD
let ip = args[2];
let fileReference = args[3];
let difficulty = args[4];

streamPing.pingRtmp().then( async rtmpPingTime => {
  //Command line arguments
  //"spinshare_5ec4a9b219c6f"
  

  //Server
  if (args.length == 2) {
    const server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('SpinStart');
        res.end();
    }).listen(8080);
    server.on('request', (request, response) => {
      if (request.method == 'POST') {
        let body = '';
          request.on('data', function (data) {
            body += data;
          });
          request.on('end', function() {
            let songArray = querystring.decode(body)
            setTimeout(function(){
              open('steam://run/1058830//play "' + fileReference + '.srtb" difficulty ' + difficulty)
            }, rtmpPingTime);
          })
      }
    });
=======
const server = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('SpinStart');
    res.end();
}).listen(8080);
server.on('request', (request, response) => {
  if (request.method == 'POST') {
    var body = '';
      request.on('data', function (data) {
        body += data;
      });
      request.on('end', function() {
        console.log(body)
      })
>>>>>>> parent of 1c5c9b1... tried
  }
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'r') {
    sendReq();
  } else {
    console.log(`You pressed the "${str}" key`);
    console.log();
    console.log(key);
    console.log();
  }
});
console.log('Press any key...');


function sendReq() {
  var postData = querystring.stringify({
    'fileReference' : 'Hello World!'
  });

  var startOptions = {
    hostname: 'localhost',
    port: '8080',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var start = new Date();
  
  var req = http.request(startOptions, (res) => {
    let responseTime = new Date() - start;
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', (e) => {
      if (data == "SpinStart") {
        open('steam://run/1058830//play "' + "spinshare_5ec4a9b219c6f" + '.srtb" difficulty ' + "Expert")
      }
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(postData);
  req.end();    
}