var http=require("http");
var fs = require('fs') ;
var server=http.createServer(function(req,res){
    if(req.url!=="/favicon.ico"){
    	var requestFilename = "." + req.url ;
    	console.log("req.url: " + req.url) ;
    	fs.readFile(requestFilename,'utf-8',function(err,data){    //read request html file
                    if(err) throw err ;
                    
        			res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://10.128.7.17:7878"});
                    res.write(data,'utf-8') ;
                    res.end() ;
                    }) ;
        
        
    }
    
});
server.listen(1337,"localhost",function(){
    console.log("开始监听...");
});
