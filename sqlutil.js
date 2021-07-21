const SqlUtil = require("node-sql-util")
// create connection
const mySql = new SqlUtil({
  dbConfig: {
    host: "1.2.3.4",
    port: "1000",
    database: "xxxx",
    user: "xxxx",
    password: "xxxx",
    timezone: "",
    connectionLimit: 5 // default 5 //You can not configure it
  }
});

mySql.select({
  table: "xxxx",
  where: {
    id: 1
  }
}).then(res=>{
	console.log('====111====',res,mySql)
})