
var MongoClient = require('mongodb').MongoClient,
	settings = require('./settings');
MongoClient.connect("mongodb://localhost/"+settings.db, function(err, database){
	if(err){
		return console.dir(err);
	}
	console.log('connected!')
	database.db(settings.db).collection('users', function(err, collection){
		var docs = [
			{name: 'sakashita', score:40},
			{name: 'ebe', score:30},
			{name: 'veveve', score:20},
		];
		// collection.find().toArray(function(err, items){
		// 	console.log(items)
		// })
		var stream = collection.find().stream();
		stream.on('data', function(item){
			console.log(item)
		});
		stream.on('end', function(){
			console.log('finished')
		});
		// collection.insert(docs, function(err, result){
		// 	console.dir(result);
		// });
	});
});