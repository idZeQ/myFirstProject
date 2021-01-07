var express = require('express');
var router = express.Router();
let sqlQuery = require('../idMysql')
let crypto =require('crypto')

router.get('/',(req,res)=>{
	res.render('register.ejs')
})

function jiami(str){
    let salt = "fjdsoigijasoigjasdiodgjasdiogjoasid"
    let obj = crypto.createHash('md5')
    str = salt+str;
    obj.update(str)
    return obj.digest('hex')
}

router.post('/',async function(req,res){
    //获取表单提交的邮箱，密码，用户名
    console.log(req.body)
    let mail = req.body.mail;
    let password = jiami(req.body.password);
    let username = req.body.username;
    //判断邮箱是否已注册，如果已注册，将不在注册；
    let strSql = "select * from user where mail=?"
    let result = await sqlQuery(strSql,[mail])
    if(result.length!=0){
        //邮箱已注册
        res.render('info',{
            title:"注册失败",
            content:"此邮箱已注册过，可直接登陆，或找寻密码",
            href:"/register",
            hrefTxt:"注册页"
        })
        
    }else{
       //此邮箱尚未注册，可注册
       strSql = "insert into user (mail,username,password) values (?,?,?)"
       await sqlQuery(strSql,[mail,username,password])
       res.render('info',{
        title:"注册成功",
        content:"注册成功请登陆，即将进入登陆页面",
        href:"/",
        hrefTxt:"登录页"
    })
    }
})

module.exports = router;