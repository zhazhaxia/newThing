var select = require('./_mysql_query');
select.sql('select * from user',function(err, rows, columns){
	if (err) {console.log(err);return;};
    console.log(rows);//array
    //console.log(columns);//array
});

//inStr = 'insert into newthing.user(username,useremail,userpasswork) values ('+body.name+','+body.phone+','+body.password+');',
//seStr = 'select userphone from newthing.user where userphone='+body.phone;