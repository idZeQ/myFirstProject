var express = require('express');
var router = express.Router();
let sqlQuery = require('../idMysql')
let crypto = require('crypto')

router.get('',(req,res,next)=>{
	res.render('login')
})

function jiami(str){
    let salt = "fjdsoigijasoigjasdiodgjasdiogjoasid"
    let obj = crypto.createHash('md5')
    str = salt+str;
    obj.update(str)
    return obj.digest('hex')
}

router.post('/',async function(req,res){
    console.log(req.body)
    //根据提交的邮箱和密码判断是否是正确的账号密码
    let strSql = "select * from user where mail=? and password = ?"
    let arr = [req.body.mail,jiami(req.body.password)]
    let result = await sqlQuery(strSql,arr)
    if(result.length!=0){
        //登陆成功
        user = result[0];
        req.session.username = user.username;
		console.log(req.session)
		console.log(req.session.username)
        res.render('info',{
            title:"登陆成功",
            content:"账号密码正确，即将进入首页",
            href:"query_all.html",
            hrefTxt:"首页"
        })
    }else{
        res.render('info',{
            title:"登陆失败",
            content:"账号或密码不正确，即将进入登录页",
            href:"/",
            hrefTxt:"登录页"
        })
    }
    
})

module.exports = router;