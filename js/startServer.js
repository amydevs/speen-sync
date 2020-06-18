const querystring = require('querystring');
const open = require('open');
const http = require('http');

module.exports = {
    startServer: function(rtmpPingTime, rl) {
        const server = http.createServer(function (req, res) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('SpinStart');
            res.end();
        }).listen(80);
        server.on('request', (request, response) => {
        if (request.method == 'POST') {
            let body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function() {
                let songObject = querystring.decode(body)
                setTimeout(function(){
                console.log("Currently Playing: " + JSON.stringify(songObject))
                open('steam://run/1058830//play ' + songObject.fileReference + '.srtb difficulty ' + songObject.difficulty + '')
                }, rtmpPingTime);
            })
        }
        });
    }
}