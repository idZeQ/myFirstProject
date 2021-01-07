var express = require('express');
var router = express.Router();
let sqlQuery = require('../idMysql')

router.get('/output',(req,res)=>{
	console.log(req.session)
	res.render('out.ejs',{
		title: '出库登记',
		username: `${req.session.username}`
	})
})

router.get('/get_item',async (req,res)=>{
	let strSqlCount = `SELECT 名称,数量 FROM item`
	let item_and_count = await sqlQuery(strSqlCount)
	res.send(item_and_count)
})

router.post('/out',async (req,res)=>{
	console.log(req.body)
	let add_str = `INSERT into operation (操作类型,操作时间,操作数量,物品名称,操作用户) VALUES ('${req.body.opt_type}','${req.body.opt_time}','${req.body.opt_num}','${req.body.issued_sub_key_c}','${req.body.username}')`
	let add_query = await sqlQuery(add_str)
	
	let old_num_str = `SELECT 数量 from item where 名称 = '${req.body.issued_sub_key_c}' `
	let old_num_rlt = await sqlQuery(old_num_str)
	console.log(old_num_rlt)
	let old_num = JSON.parse(JSON.stringify(old_num_rlt))[0].数量
	console.log(old_num)
	
	let up_num = old_num - req.body.opt_num
	let update_str = `UPDATE item SET 数量 = '${up_num}',最后操作时间 = '${req.body.opt_time}' WHERE 名称 = '${req.body.issued_sub_key_c}'`
	let update_query = await sqlQuery(update_str)
	
	res.render('info',{
	    title:"提交成功",
	    content:"完成表单，将进入主页面",
	    href:"../query_all.html",
	    hrefTxt:"首页"
	})
})


router.get('/input',(req,res)=>{
	console.log(req.session)
	res.render('in.ejs',{
		title: '入库登记',
		username: `${req.session.username}`
	})
})

router.post('/in',async (req,res)=>{
	console.log(req.body)
	if(req.body.issued_sub_key_c == 1){
		let item_name = req.body.opt_add_new
		let in_add_str = `INSERT into operation (操作类型,操作时间,操作数量,物品名称,操作用户) VALUES ('${req.body.opt_type}','${req.body.opt_time}','${req.body.opt_num}','${item_name}','${req.body.username}')`
		let in_add_query = await sqlQuery(in_add_str)
		
		let in_update_str = `INSERT into item (名称,类型,数量,所在仓库,最后操作时间) VALUES ('${item_name}','${req.body.opt_add_type}','${req.body.opt_num}','${req.body.opt_add_ware}','${req.body.opt_time}')`
		let in_update_query = await sqlQuery(in_update_str)
	}else{
		in_add_str = `INSERT into operation (操作类型,操作时间,操作数量,物品名称,操作用户) VALUES ('${req.body.opt_type}','${req.body.opt_time}','${req.body.opt_num}','${req.body.issued_sub_key_c}','${req.body.username}')`
		in_add_query = await sqlQuery(in_add_str)
		
		let in_old_num_str = `SELECT 数量 from item where 名称 = '${req.body.issued_sub_key_c}' `
		let in_old_num_rlt = await sqlQuery(in_old_num_str)
		console.log(in_old_num_rlt)
		let in_old_num = JSON.parse(JSON.stringify(in_old_num_rlt))[0].数量
		console.log(in_old_num)
		
		let in_up_num = +in_old_num + +req.body.opt_num
		
		let in_update_str = `UPDATE item SET 数量 = '${in_up_num}',最后操作时间 = '${req.body.opt_time}' WHERE 名称 = '${req.body.issued_sub_key_c}'`
		let in_update_query = await sqlQuery(in_update_str)
	}
	
	res.render('info',{
	    title:"提交成功",
	    content:"完成表单，将进入主页面",
	    href:"../query_all.html",
	    hrefTxt:"首页"
	})
})


module.exports = router;