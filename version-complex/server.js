
var http = require("http") ;
var fs = require('fs') ;
var url = require('url') ;

/*截取子串*/
function subString(str,start,length){

    return subStr = str.substr(start,length)
}

/*判断是否是数字*/
function isNumber(input) {     
    return !isNaN(input) ;
}

/*sleepTime: millisecond*/
function sleep(sleepTime) {
    for(var start = +new Date; +new Date - start <= sleepTime; ) { } 
}

/*处理浏览器请求HTTP Status的情况*/
function dealRequestStatus(statusCode,response){
    var statusCode = statusCode || 500 ;
    response.writeHead(statusCode,{'Content-Type':'text/html'}) ;
    response.end('<p>Return Status Code:'+statusCode+'</p>\n') ;
}

/*处理浏览器请求页面的情况*/
function dealRequestPage(requestFilename,response){

    console.log("origin requestFilename: " + requestFilename) ;
    
    requestFilename = './'+ requestFilename ; //change file path
    var ext = requestFilename.match(/(\.[^.]+|)$/)[0];

    var fileExisted = fs.existsSync(requestFilename) ; //判断请求文件是否存在

    if(!fileExisted){   //文件不存在
        response.writeHead(404,{"Content-Type":"text/html"}) ;
        response.write("<h1 style='color:red'>Request Source Does Not Exist</h1>",'utf-8') ;
        response.end() ;
    }
    else{
        switch(ext){
            case ".css":
            case ".js" :
                        fs.readFile(requestFilename, 'utf-8',function (err, data) {//read css/js content
                        if (err) throw err; 
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
            case '.jpg' :
            case '.jpeg':
            case '.png' :
                        var ins=fs.createReadStream(requestFilename);
                        var MIME={
                        ".jpg":"image/jpg",
                        ".jpeg":"image/jpeg",
                        ".png":"image/png",
                        ".ico":"image/ico",
                        };

                    response.writeHead(200,{
                        "Content-Type":MIME[ext]
                    }) ;

                    ins.pipe(response);
                    break;
            default:
                    fs.readFile(requestFilename,'utf-8',function(err,data){    //read request html file
                    if(err) throw err ;
                    console.log("Request received...") ;
                    response.writeHead(200,{"Content-Type":"text/html"}) ;
                    response.write(data,'utf-8') ;
                    response.end() ;
                    }) ;
        }
    }
}


function startServer(){
    http.createServer(function(request,response){
    
    var pathname=url.parse(request.url).pathname ;
    var arg = url.parse(request.url,true).query ;
    var ext = pathname.match(/(\.[^.]+|)$/)[0];

	var sleepTime = 0 ;
    if(arg != null){
       sleepTime = arg.sleep ;
       console.log("arg sleep " + arg.sleep) ;
    }
    sleep(sleepTime ) ;    

    if(pathname === '/'){   // default page is index.html
        pathname = "/staticResource/index.html" ;
    }
	
    if(pathname.charAt(0) === '/'){
        var newPathname = subString(pathname,1,pathname.length);
        console.log("lpp pathname = " + newPathname) ;
        if(isNumber(newPathname) ){
            dealRequestStatus(newPathname,response) ; // request status code
        }
        else{
            dealRequestPage(pathname,response) ;      //request page
        }
    }
    else{
        response.writeHead(404,{"Content-Type":"text/html"}) ;
        response.write("<h1 style='color:red'>Request Source Does Not Exist</h1>",'utf-8') ;
        response.end() ;
    }    
   
}).listen(8899,'0.0.0.0') ;
console.log("server start...listen 8899") ;
}


exports.startServer = startServer ;
