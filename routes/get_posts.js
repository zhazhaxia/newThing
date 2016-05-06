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
		seStr = 'select * from posts left join user on posts.userid=user.userid';
	if (req.query.id) {
		seStr = 'select * from posts left join user on posts.userid=user.userid where posts.postsid='+req.query.id;
	}else if(req.query.uid){
		seStr = 'SELECT * FROM (postscomment left join posts on postscomment.postsid=posts.postsid) left join user on postscomment.userid=user.userid where posts.userid='+req.query.uid+' order by postscomment.commentid desc';
	}else{
		if(req.query.type != "全部")seStr +=' where posts.poststype="'+req.query.type+'"'+' order by posts.postsid desc';
		else seStr += ' order by posts.postsid desc';
	}

	query.sql(seStr,function(err,rows,columns){
		if (err) {console.log(err);res.send({state:0});return;}//错误
		res.send({state:1,data:rows});
		
	});
	
});




module.exports = router;
