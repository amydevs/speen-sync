const querystring = require('querystring');
const open = require('open');
const http = require('http');
const readline = require('readline');
let args = process.argv;

let ip = args[2];
let fileReference = args[3];
let difficulty = args[4];

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
              open('steam://run/1058830//play "' + fileReference + '.srtb" difficulty ' + difficulty)
          })
      }
    });
  }

  //Client
  else {
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
    console.log('Press any key to start...');


    function sendReq() {
      let postData = querystring.stringify({
        'fileReference' : fileReference,
        'difficulty' : difficulty
      });

      let startOptions = {
        hostname: ip,
        port: '8080',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
      };

      let start = new Date();
      
      let req = http.request(startOptions, (res) => {
        let responseTime = new Date() - start;
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', (e) => {
          if (data == "SpinStart") {
            setTimeout(function(){
              open('steam://run/1058830//play "' + fileReference + '.srtb" difficulty ' + difficulty)
            }, responseTime);
          }
        });
      });

      req.on('error', (e) => {
        console.error(e);
      });

      req.write(postData);
      req.end();    
    }
  }

