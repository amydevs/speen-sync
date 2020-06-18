const http = require('http');

module.exports = {
    pingRtmp: async function() {
        //ping rtmp server
        let rtmpDate = new Date();
        let rtmpResponseTime
        let rtmpReq = http.request({hostname: "rtmp.spinsha.re", timeout: 1500}, (res) => {
        rtmpResponseTime = new Date() - rtmpDate;
        })
        rtmpReq.on('socket', function (socket) {
        socket.setTimeout(3000);  
        socket.on('timeout', function() {
            rtmpReq.abort();
            rtmpResponseTime = 0
        });
        });
        rtmpReq.on('error', function(err) {
        if (err.code === "ECONNRESET") {
            rtmpResponseTime = 0
            //specific error treatment
        }
        //other error treatment
        });
        return rtmpResponseTime;
    }
}