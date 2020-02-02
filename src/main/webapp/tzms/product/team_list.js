$(document).ready(function(){
	$("#queryFormId").on("click",".btn-search",doQueryObject);
	findAllObject();
});
function doQueryObject(){
	 $("#pageId").data("pageCurrent",1);
	 //执行查询操作
	 findAllObject();
}
function findAllObject(){
	var url="team/findPageTeam";
	var params = {name:$("#searchNameId").val()};
	var pageCurrent = $("#pageId").data("pageCurrent");
	if(!pageCurrent){
		pageCurrent = 1;
	}
	params['pageCurrent'] = pageCurrent;
	$.post(url,params,function(result){
		if(result.state==1){
			//返回成功
			//在tbody对应的位置显示数据
			setTableTbodyRows(result.data.list);
			//设置分页信息
			setPagination(result.data.pageObject);
		}else{
			alert(result.message);
		}
		
	});
}
function setTableTbodyRows(list){
	var tBody = $("#tbodyId");
	tBody.empty();
//	if(list.length==0){
//		var tr =  $("<tr></tr>");
//		var td = "<td colspan='3'>没有对应的数据</td>";
//		tr.append(td);
//		tBody.append(tr);
//	}
	for(var i in list){
		var tr =  $("<tr></tr>");
		tr.data("id",list[i].id);
		var tds = "<td><input type='checkbox' name='checkId'value='"+list[i].id+"'/></td>"
				+"<td>"+list[i].name+"</td>"
				+"<td>"+list[i].projectName+"</td>"
				+"<td>"+(list[i].status?"有效":"无效")+"</td>"
				+"<td><input type='button' class='btn btn-warning btn-update' value='修改'></td>";
		//将td追加到tr对象
		tr.append(tds);
		//将tr追加到tbody对象
		tBody.append(tr);
	}
}



