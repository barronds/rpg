
// run with 'node ./http/server_main.js' from 'server' directory

var HttpDispatcher	= require('httpdispatcher');
var http			= require('http');
var MongoTest		= require('./mongotest');

var mongo_test = new MongoTest();
 
var dispatcher = new HttpDispatcher();
dispatcher.setStatic('/resources');
dispatcher.setStaticDirname('static');

//Lets define a port we want to listen to
const PORT=8080; 

//Lets use our dispatcher
function handleRequest(request, response){
    try {
        //log the request on console
        console.log( "new system" + request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//A sample GET request    
dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
});    

dispatcher.onGet("/rpg", function(req, res) {
	console.log( "hitting /rpg route" );
	var decoded_url = decodeURI( req.url );
	console.log( "inbound data: ", decoded_url );
	mongo_test.execute( decoded_url );
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end( JSON.stringify( { result: 'processed ' + decoded_url } ) );
});

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("new system Server listening on: http://localhost:%s", PORT);
});
