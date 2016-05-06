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
		body = req.body
		inStr = 'insert into newthing.posts(poststitle,poststype,postscontent,poststime,userid) values ("'+body.title+'","'+body.type+'","'+body.content+'",now(),"'+body.userid+'");';
	console.log(inStr)
	query.sql(inStr,function(err,rows){
		if (err) {res.send({state:0});console.log(err);return;}
		// console.log(rows);
		res.send({state:1});
	});
	
});




module.exports = router;
