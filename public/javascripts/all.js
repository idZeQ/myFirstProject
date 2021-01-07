

layui.use(['element','table'], function(){
	var element = layui.element
	,table = layui.table;
	
	
	
	
	table.render({
	    elem: '#demo'
		,limit: 20
	    ,url: 'http://127.0.0.1:3000/user' //数据接口
	    ,page: true //开启分页
	    ,cols: [[ //表头
	      {field: 'id', title: 'ID', width:120, sort: true, fixed: 'left'}
	      ,{field: '名称', title: '名称', width:120, sort: true}
	      ,{field: '类型', title: '类型', width:120, sort: true}
	      ,{field: '数量', title: '数量', width:120, sort: true} 
	      ,{field: '所在仓库', title: '所在仓库', width: 180, sort: true}
	      ,{field: '最后操作时间', title: '最后操作时间', width: 180, sort: true},
		  ,{fixed: 'right', width: 165, align:'center', toolbar: '#barDemo'}
		  
	    ]]
	});


	table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
		var data = obj.data //获得当前行数据
		,layEvent = obj.event; //获得 lay-event 对应的值
		if(layEvent === 'detail'){
			console.log(obj.data.id)
			window.location.href=`/item/${obj.data.id}`
		}
	})
})

