var express = require('express');
var router = express.Router();
let sqlQuery = require('../idMysql')

// 判断是否登陆的中间件
function isLoginMid(req,res,next){
    if(req.session.username == undefined){
        res.render('info',{
            title:"未登录",
            content:"尚未登陆，请进入登陆页面登陆",
            href:"/",
            hrefTxt:"登录页"
        })
    }else{
        //已经登录进入正常页面
        next()
    }
}

router.get('/:itemid',isLoginMid,async (req,res)=>{
	// req.session.username = 'my name'
	let itemid = req.params.itemid
	let strSqlOne = `SELECT * from item WHERE id = ${itemid} `
	let resultOne = await sqlQuery(strSqlOne)
	// res.send(resultOne)
	res.render('index.ejs',resultOne[0])
})


router.get('/out/exitSession',(req,res)=>{
	req.session.destroy(()=>{
		console.log('销毁session')
	})
	res.render('info',{
	    title:"未登录",
	    content:"尚未登陆，请进入登陆页面登陆",
	    href:"/",
	    hrefTxt:"登录页"
	})
})

module.exports = router;
