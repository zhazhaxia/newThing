var express = require('express');
    router = express.Router(),
    url = require('url'),//解析get参数
 	app = express(),
 	bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

router.get('/', function(req, res ,next) {
	
	// console.log(req.query);
	var query = require('./_mysql_query'),
		seStr = 'delete * from activity,attend,joinactivity where activityid='+req.query.id;
	console.log(seStr)
	query.sql('delete from activity where activityid='+req.query.id,function(err,rows,columns){
		if (err) {console.log(err);res.send({state:0});return;}//错误
		query.sql('delete  from attend where activityid='+req.query.id,function(err,rows,columns){
			if (err) {console.log(err);res.send({state:0});return;}//错误
			query.sql('delete  from joinactivity where activityid='+req.query.id,function(err,rows,columns){
				if (err) {console.log(err);res.send({state:0});return;}//错误
				res.send({state:1,data:rows});
				
			});
			
		});
		
	});
	
});




module.exports = router;
