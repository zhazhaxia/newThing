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
		seStr = 'select * from joinactivity as jo left join activity as at on jo.activityid=at.activityid where jo.userid='+req.query.id;
	console.log(seStr)
	query.sql(seStr,function(err,rows,columns){
		if (err) {console.log(err);res.send({state:0});return;}//错误
		res.send({state:1,data:rows});
		
	});
	
});




module.exports = router;
