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
		seStr = 'select * from newthing.user where userphone="'+body.phone+'" and userpassword="'+body.password+'"';
	query.sql(seStr,function(err,rows,columns){
		if (err) {console.log(err);res.send({state:0});return;}//错误
		if(rows[0]){
			delete rows[0]['userpassword'];
			res.send({state:1,data:rows[0]});//成功
		}else {
			res.send({state:3});//不存在
		}
	});
	
});




module.exports = router;
