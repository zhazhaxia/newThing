var express = require('express');
    router = express.Router(),
    url = require('url'),//解析get参数
 	util = require('util'),//工具模块
 	//bodyParser = require("body-parser"),
 	formidable = require('formidable'),
 	fs = require("fs"),
 	app = express();


//app.use(bodyParser.urlencoded({extended: false}));//用来解析post数据


router.post('/', function(req, res ,next) {

	res.header("Access-Control-Allow-Origin", "*");
	//设置返回字符串编码
	res.header( 'Content-Type','text/javascript;charset=utf-8');
	//console.log(9999)
	//new一个formidable.IncomingForm();
	var form = new formidable.IncomingForm(),formField={},formFilePath;
	//设置临时文件存放的路径
	form.uploadDir = "./routes/tmp";
	//设置上传数据的编码
	form.encoding='utf-8';
	//设置是否保持上传文件的拓展名
	form.keepExtensions = true;
	//文件上传过程中触发可以做上传进度查看
	form.on('progress', function(bytesReceived, bytesExpected) {
		//console.log(bytesReceived);
		if(bytesExpected>1024*1024*10){//bytesExpected为等待上传的文件的大小，超过大小就返回错手动触发error
		  this.emit('error',"file too big")
		};
	});
	//返回非文件的部分数据
	form.on('field', function(name, value) {
		//console.log('filed:');
		//console.log(name+" "+value)
		formField[name]=value;
	});
	//文件上传成功后触发
	form.on('file', function(name, file) {
		//console.log(file);
		if(file.type.indexOf('image')<0){//文件类型不是合法的
			console.log('error');
		    this.emit('error',"unknow file type");//手动触发error
		    fs.unlink(file.path)//删掉临时文件
		}
		else {
		  //成功上传，把临时文件移动到public文件夹下面,file.path：上传的具体文件
		  //console.log(66666,file.path);
		  var n = new Date().getTime()+file.name.slice(file.name.lastIndexOf('.'));
		  	fs.renameSync(file.path, "./public/file/userpic/" + n);
		 	formFilePath = '/file/userpic/'+n;
		}
	});
	//流程正常处理
	form.on('end',function(){
		// console.log(formField)
		// console.log(formFilePath)
		// res.send({state:0});
		addSql(formField, formFilePath,function(args){
			if (args) {
				res.send({state:1,path:formFilePath});
			}else{
				res.send({state:0});
			}
		});
	});
	//出错
	form.on('error',function(err){
		res.send('error:'+err);
	})
	//执行文件上传任务
	form.parse(req,function(errors, fields, files){
		if (errors) {this.emit('error',"unknow file type");};//手动触发error
		// console.log(fields);
		// console.log(999999999);
		// console.log(files);
		
	});
});

function addSql (fields,path,fn) {
	var query = require('./_mysql_query'),seStr;
	if (path) {
		seStr = 'update user set userphone="'+fields.phone+'", username="'+fields.name+'" ,useremail="'+fields.email+'" ,userplace="'+fields.city+'" ,userpic="'+path+'" where userid='+fields.id;
	}else {
		seStr = 'update user set userphone="'+fields.phone+'", username="'+fields.name+'" ,useremail="'+fields.email+'" ,userplace="'+fields.city+'" where userid='+fields.id;
	}
	//console.log(seStr)
	query.sql(seStr,function(err,rows,columns){
		if (err) {console.log(err);fn(0);return;}//错误
		fn(1);//成功
	});
}
module.exports = router;