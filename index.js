const open = require('open');
var http = require('http');
const readline = require('readline');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('SpinStart');
    res.end();
}).listen(8080);

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
    http.get('http://localhost:8080', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        if(data == "SpinStart"){
            open('https://google.com');
        }
    });
});
}