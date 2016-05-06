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
		seStr = 'select * from postscomment left join user on postscomment.userid=user.userid where postsid='+req.query.pid+' order by commentid desc';
	console.log(seStr)
	query.sql(seStr,function(err,rows,columns){
		if (err) {console.log(err);res.send({state:0});return;}//错误
		res.send({state:1,data:rows});
		
	});
	
});





router.post('/', function(req, res ,next) {
	
	res.header("Access-Control-Allow-Origin", "*");
	//设置返回字符串编码
	res.header( 'Content-Type','text/javascript;charset=utf-8');
	//console.log(req.body);//req.body就是post的参数
	var query = require('./_mysql_query'),
		body = req.body,
		inStr = 'insert into newthing.postscomment(userid,postsid,commentcontent,commenttime) values ("'+body.uid+'","'+body.pid+'","'+body.comment+'",NOW());';
	console.log(inStr)
	query.sql(inStr,function(err,rows,columns){
		if (err) {console.log(err);res.send({state:0});return;}
		
		res.send({state:1});
	});
	
});




module.exports = router;
