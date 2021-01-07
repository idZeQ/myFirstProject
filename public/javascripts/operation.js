

layui.use(['element','table'], function(){
	var element = layui.element
	,table = layui.table;
	
	
	
	
	table.render({
	    elem: '#demo'
		,limit: 20
	    ,url: 'http://127.0.0.1:3000/operation' //数据接口
	    ,page: true //开启分页
	    ,cols: [[ //表头
	      {field: 'id', title: 'ID', width:120, sort: true, fixed: 'left'}
	      ,{field: '操作类型', title: '操作类型', width:120, sort: true}
	      ,{field: '操作时间', title: '操作时间', width:180, sort: true}
	      ,{field: '操作数量', title: '操作数量', width:120, sort: true} 
	      ,{field: '物品名称', title: '物品名称', width:120, sort: true}
	      ,{field: '操作用户', title: '操作用户', width:120, sort: true}
	    ]]
	});


})

