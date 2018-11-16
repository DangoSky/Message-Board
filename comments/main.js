var text = $("#text");
var nickname = $("#nickname");
var messageSum = 0;
$(function(){
	showText();
});
// 昵称不能为空
text.click(function() {
	if(!nickname.val()){
		alert("先输入昵称啦。");
	}
});
// 发送信息
$("#send").click(function() {
	if(!text.val())  alert("想说啥？");
	else { 
		messageSum++;
		var date = new Date();
		var year = date.getFullYear(),
			month = date.getMonth()+1,
			day = date.getDate(),
			hour = date.getHours(),
			minutes =  date.getMinutes(),
			seconds = date.getSeconds();
		var message = "<br>" + "<b>" + nickname.val() + "</b>" + ": " + text.val() + "<br>" + "——" + year + "-" + month + "-" + day + " " + hour + ":" +  minutes + ":" + seconds + "<br>" ;
		$.ajax({
			type: "post",
			url: "comments/messageBoard.php", 
			data: {
				action: 'send',
				title: title,
				arr: JSON.stringify({ 
					"message": message
				})
			},
			success: function(request) {
				text.val("");
				$("#comments").empty();
				showText();
			},
			error: function(request) {
				alert(request.status);
			}	
		});
	}
});
// 从服务器获取留言记录
function showText() {
	$.ajax({
		url: "comments/messageBoard.php",
		data: {
			action: 'get',
			title: title
		},
		success: function(request) {
			if(request){
				console.log(String(request));
				let group = JSON.parse(request);
				for (let idx in group) {
					let msg = group[idx];
					$('#comments').prepend(String(msg.message));
				}
				messageSum = group.length;
				$("#messageSum").html("当前总共有" + messageSum + "条留言");
			}
		}
	});
}