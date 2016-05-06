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
		seStr = 'select * from (comment left join user on comment.userid=user.userid) left join activity on comment.activityid=activity.activityid';
	if (req.query.type != '全部') {seStr += ' where activitytype="'+req.query.type+'"'}
	console.log(seStr)
	query.sql(seStr,function(err,rows,columns){
		if (err) {console.log(err);res.send({state:0});return;}//错误
		res.send({state:1,data:rows});
		
	});
	
});




module.exports = router;
