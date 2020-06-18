const readline = require('readline');
const streamPing = require('./js/rtmpPing.js');
const startServer = require('./js/startServer.js');
const startClient = require('./js/startClient.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

streamPing.pingRtmp().then( async rtmpPingTime => {
  rl.question('Type "C" for client, and type "S" for player server: ', (answer) => {
    switch(answer.toLowerCase()) {
      case "c":
        startClient.startClient(rtmpPingTime, rl);
        break;
      case "s":
        startServer.startServer(rtmpPingTime, rl);
        break;
    } 
  });
})



