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
		inStr = 'insert into newthing.user(username,userphone,userpassword) values ("'+body.name+'","'+body.phone+'","'+body.password+'");',
		seStr = 'select userphone from newthing.user where userphone="'+body.phone+'"';
	console.log(seStr)
	query.sql(seStr,function(err,rows,columns){
		if (err) {console.log(err);res.send({state:0});return;}
		console.log(rows)
		if(rows[0]){
			res.send({state:2});//已经被注册了
		}else{
			query.sql(inStr,function(err,rows){
				if (err) {res.send({state:0});console.log(err);return;}
				// console.log(rows);
				res.send({state:1});
			});
		}
		
	});
	
});




module.exports = router;
