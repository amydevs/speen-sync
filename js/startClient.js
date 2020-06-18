const querystring = require('querystring');
const open = require('open');
const http = require('http');
const readline = require('readline');

module.exports = {
    startClient: function(rtmpPingTime, rl) {

        let ip;
        let fileReference;
        let difficulty;

        rl.question('Type IP: ', (answer) => {
            ip = answer

            rl.question('Type File Name: ', (answer) => {
                fileReference = answer

                rl.question('Type Difficulty (Type 1 for Easy, 2 for Medium, 3 for Hard, 4 for Expert, and 5 for XD): ', (answer) => {
                    switch(answer) {
                        case '1':
                            difficulty = "Easy"
                            break;
                        case '2':
                            difficulty = "Medium"
                            break;
                        case '3':
                            difficulty = "Hard"
                            break;
                        case '4':
                            difficulty = "Expert"
                            break;
                        case '5':
                            difficulty = "XD"
                            break;
                    }
                    console.log(difficulty)
                    console.log("Game starts in 5 seconds.")
                    setTimeout(sendReq, 5000);
                    rl.close();
                });
            });
        })

        function sendReq() {
        let postData = querystring.stringify({
            'fileReference' : fileReference,
            'difficulty' : difficulty
        });

        let startOptions = {
            hostname: ip,
            port: '80',
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
                }, responseTime + rtmpPingTime);
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
}