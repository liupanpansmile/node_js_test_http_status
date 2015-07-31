
var http = require("http") ;
var fs = require('fs') ;
var url = require('url') ;

function fileExists(filename){
	var path = require('path');
	var existed = fs.existsSync(filename) ;
	return existed ;
}


exports.start = function(){
    http.createServer(function(request,response){
    //console.log(request.url) ;
    var pathname=url.parse(request.url).pathname ;
    var ext = pathname.match(/(\.[^.]+|)$/)[0];
    var arg = url.parse(request.url,true).query ;
    console.log("pathname: "  + pathname) ;
	console.log("ext: " + ext) ;
	
	var requestFileName = pathname;
	
	
    if(request.url == "/"){
      requestFileName = "./index.html" ;
    }
	else
	{
		requestFileName = "." + pathname ;
	}
	
	console.log("requestFileName: " + requestFileName) ;
	if(!fileExists(requestFileName)){
		exceptionRespose(response) ;
		
	}
	else{
		switch(ext){
    case ".css":
    case ".js":
    fs.readFile(requestFileName, 'utf-8',function (err, data) {//读取内容 
    if (err) exceptionRespose(sresponse); 
    response.writeHead(200, { 
    "Content-Type": { 
    ".css":"text/css", 
    ".js":"application/javascript", 
    }[ext] 
    }); 
    response.write(data,'utf-8'); 
    response.end(); 
    }); 
    break; 
    case 'jpg':
    case 'png':
    case 'jpeg':
	
	fs.readFile('./image/a.jpg','binary',function(err,data){
        if(err) exceptionRespose(response);
		response.writeHead(200,{"Content-Type":"image/jpeg"}) ;
        response.write(data,'binary') ;
        response.end();
    });
	
    break;
    default:
   
    
        
        fs.readFile(requestFileName,'utf-8',function(err,data){
        if(err) exceptionRespose(response) ;
        console.log("Request received...") ;
        response.writeHead(200,{
                "Content-Type":"text/html",
                "Access-Control-Allow-Origin":"*", 
                "AAA":"bbb",
                "Access-Control-Allow-Methods":"POST, GET, OPTIONS, HEAD"
                 }) ;
        response.write(data,'utf-8') ;
        response.end() ;
        }
        ) ;
    
}
 }   
}).listen(8899,'0.0.0.0') ;
console.log("server start...listen 8899") ;
}

function exceptionRespose(response){
	response.writeHead(404,{"Content-Type":"text/html"}) ;
    response.write("Requested Resource does not exsit!",'utf-8') ;
	response.end() ;
    
}

