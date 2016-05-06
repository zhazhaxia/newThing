//常规配置
// var mysql = require('mysql');
// var conn = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'root',
//     password: '520',
//     database:'newthing',
//     port: 3306
// });

// module.exports = conn;



//连接池配置
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '520',
    database:'newthing',
    port: 3306
});
module.exports = pool;


















//连接池配置
// var mysql = require('mysql');
// var pool = mysql.createPool({
//     host: 'localhost',
//     user: 'nodejs',
//     password: 'nodejs',
//     database: 'nodejs',
//     port: 3306
// });

// var selectSQL = 'select * from t_user limit 10';

// pool.getConnection(function (err, conn) {
//     if (err) console.log("POOL ==> " + err);

//     conn.query(selectSQL,function(err,rows){
//         if (err) console.log(err);
//         console.log("SELECT ==> ");
//         for (var i in rows) {
//             console.log(rows[i]);
//         }
//         conn.release();
//     });
// });