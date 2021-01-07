let mysql = require('mysql')

// 数据库设置
let options = {
	host     : 'localhost',
	user     : 'root',              
	password : '123qwe',       
	port     : '3306',                   
	database : 'fortest'
}

// 创建与数据库连接
let con = mysql.createConnection(options)
// 建立连接
con.connect((err)=>{
	if (err) {
		console.log(err)
	} else{
		console.log('连接成功')
	}
})

// 将查询功能封装为promise函数
function sqlQuery(strSql,arr){
	return new Promise(function(resolve,reject){
		con.query(strSql,arr,(err,results)=>{
			if (err) {
				reject(err)
			} else{
				resolve(results)
			}
		})
	})
}

module.exports = sqlQuery;