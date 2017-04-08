//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var util = require( 'util' );

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

var MongoTest = function()
{
	
}

MongoTest.prototype.execute = function( command )
{
	console.log( 'hello from mongoTest' );
	
	// Connection URL. This is where your mongodb server is running.
	//var url = 'mongodb://localhost:27017/testdb1';
    var url = 'mongodb://localhost:27017/testdb1';
	
	// Use connect method to connect to the Server
	MongoClient.connect(url, function (err, db) {
	  if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	  } else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);
    
		// Get the documents collection
		var collection = db.collection('savedgames');
    		
		collection.update({foo: 4}, {$set: {command: command}}, function (err, numUpdated) {
			if (err) {
				console.log(err);
			} else if (numUpdated) {
				console.log('Updated Successfully ' + numUpdated + ' document(s).');
			} else {
				console.log('No document found with defined "find" criteria!');
			}
			//Close connection
			db.close();
		});
	
		//Create some users
		//var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
		//var user2 = {name: 'modulus user', age: 22, roles: ['user']};
		//var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};
    
		// Insert some users
		//collection.insert([user1, user2, user3], function (err, result) {
		//  if (err) {
		//	console.log(err);
		//  } else {
		//	console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
		//  }
		//  //Close connection
		//  db.close();
		//});
	  }
	});	
}

module.exports = MongoTest;

