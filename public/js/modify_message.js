define('./js/modify_message',function(require, exports, module){
	var util = require('./lib/util');

	
	exports = module.exports = {
		init:function(){
			if (!!!~~localStorage.isLogin) {
					alert('请先登陆~');
					location.href=hostname+'index.html';
					return;
				}
			this.bind();

			$('.j_name').val(localStorage.name);
			$('.j_email').val(localStorage.email);
			$('.j_city').val(localStorage.city);
		},
		bind:function(){
			var self = this;
			$(document.body).on('click', '.j_public', function(e) {
				e.preventDefault();
				
				self.modifyMessage();

			});
		},
		modifyMessage:function(){
			var data = {
					id:localStorage.id,
					name:$('.j_name').val(),
					email:$('.j_email').val(),
					phone:$('.j_phone').val(),
					city:$('.j_city').val()
				},
				fileid = 'j_pic';
			if (!(data.name&&data.email&&data.city)) {
				alert('信息不能为空！');return;
			}
			
			util.ajaxPostFormData({
				url:hostname+"modify_message/",
				data:data,
				type:'json',
				fileid:fileid,
				success:function(res){console.log(res)
					var s=res.state;
					//console.log(res)
					if (s === 0) {alert("录入错误，请检查是不是有非法字符");return;}
					if (s === 1) {
						alert("信息录入成功！");
						localStorage.name = data.name;
						if (res.path) {localStorage.pic = res.path;}
						localStorage.email = data.email;
						localStorage.phone = data.phone;
						localStorage.city = data.city;
						location.href = "./homepage.html";
					}
				}
			});
		}
	}
});