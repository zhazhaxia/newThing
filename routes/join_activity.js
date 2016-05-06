var express = require('express');
    router = express.Router(),
    url = require('url'),//解析get参数
 	app = express(),
 	bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

router.post('/', function(req, res ,next) {
	
	res.header("Access-Control-Allow-Origin", "*");
	//设置返回字符串编码
	res.header( 'Content-Type','text/javascript;charset=utf-8');
	//console.log(req.body);//req.body就是post的参数
	var query = require('./_mysql_query'),
		body = req.body,
		inStr = 'insert into newthing.joinactivity(userid,activityid,jointime) values ("'+body.uid+'","'+body.aid+'",NOW());';
	
	query.sql('select * from joinactivity where userid='+body.uid+'  and activityid='+body.aid,function(err,rows,columns){
		if (err) {console.log(err);res.send({state:0});return;}
		if (rows[0]) {
			res.send({state:2});
		}else {
			query.sql(inStr,function(err,rows,columns){
				if (err) {console.log(err);res.send({state:0});return;}
				
				res.send({state:1});
			});
		}
		
	});
	
	
});




module.exports = router;
