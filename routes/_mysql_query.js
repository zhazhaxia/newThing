module.exports = {
	sql:function(selectStr, fn){
		// var conn = require('./_mysql_config');
		// conn.connect();
		// conn.query(selectStr, function(err, rows, columns) {
		//     fn(err, rows, columns);
		    
		// });
		// conn.end();

		var pool = require('./_mysql_config');
		pool.getConnection(function (err, conn) {
		    if (err) console.log("POOL ==> " + err);

		    conn.query(selectStr,function(err,rows,columns){
		        fn(err, rows, columns);
		        conn.release();
		    });
		});


	}
}











// conn.query('SELECT * FROM user', function(err, rows, columns) {
//     if (err) console.log(err);
//     console.log(rows);
//     console.log(columns);
//     conn.end();
// });



/*
//use
var select = require('./_mysql_query');
select.query('select * from user',function(err, rows, columns){
	if (err) console.log(err);
    console.log(rows);//array
    //console.log(columns);//array
});
*/