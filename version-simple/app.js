var http = require('http');
http.createServer(function (req, res) {
  var sReg = /^\/(\d+)/
    , matcher = req.url.match(sReg)

  if(matcher){
    var statusCode = parseInt(matcher[1])||500
    res.writeHead(statusCode,{'Content-Type':'text/html'})
    res.end('<p>Return Status Code:'+statusCode+'</p>\n')
  }else{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }
}).listen(8899, '0.0.0.0');
console.log('Server running at http://127.0.0.1:8899/');
