let sqlQuery = require('./idMysql')
let express = require('express')
let ejs = require('ejs')
let path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
//引入session模块
let session = require('express-session');

// var sessionRouter = require('./router/sessionModule.js')

let app = express()

let itemRouter = require('./routes/itemRouter.js')
let loginRouter = require('./routes/loginRouter.js')
let registerRouter = require('./routes/registerRouter.js')
let operationRouter = require('./routes/operationRouter.js')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 引入session
app.use(session({
	secret: "xzsagjasoigjasoi",
	resave:true,//强制保存session
	cookie:{
		maxAge:7*24*60*60*1000,//设置session的有效期为1周
	},
	saveUninitialized:false//是否保存初始化的session
}))
app.use(express.json())
app.use(express.urlencoded({extrnded: false}))
app.use(cookieParser('secret'))
// 引入cookie中间件
app.use(cookieParser('secret'));

//设置静态目录
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'))

app.use(express.static(path.join(__dirname, 'public')))


app.get('/user',async (req,res)=>{
	
	// console.log(req.query)
	
	let params = req.query
	let page = params.page
	let limit = params.limit
	let start = (page-1)*limit
	let strSql = `select * from item limit ${start},${limit}`
	let result = await sqlQuery(strSql)
	let strSqlCount = 'SELECT count(id) as count FROM item'
	let count = await sqlQuery(strSqlCount)
	let resultCount = JSON.parse(JSON.stringify(count))[0].count
	let finData = `{"code":0,"msg":"","count":${resultCount},"data":${JSON.stringify(result)}}`
	res.send(JSON.parse(finData))
})

app.get('/operation',async (req,res)=>{
	let params = req.query
	let page = params.page
	let limit = params.limit
	let start = (page-1)*limit
	let strSql = `select * from operation limit ${start},${limit}`
	let result = await sqlQuery(strSql)
	let strSqlCount = 'SELECT count(id) as count FROM operation'
	let count = await sqlQuery(strSqlCount)
	let resultCount = JSON.parse(JSON.stringify(count))[0].count
	let finData = `{"code":0,"msg":"","count":${resultCount},"data":${JSON.stringify(result)}}`
	res.send(JSON.parse(finData))
})

app.use('/item',itemRouter)
app.use('/register',registerRouter)
app.use('',loginRouter)
app.use('/operation',operationRouter)

module.exports = app