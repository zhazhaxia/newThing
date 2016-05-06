define('./js/add_activity',function(require, exports, module){
	var util = require('./lib/util');

	
	exports = module.exports = {
		init:function(){
			if (!!!~~localStorage.isLogin) {
					alert('请先登陆~');
					location.href=hostname+'index.html';
					return;
				}
			this.bind();
		},
		bind:function(){
			var self = this;
			$(document.body).on('click', '.j_a_public', function(e) {
				e.preventDefault();
				
				self.addActivity();

			});
		},
		addActivity:function(){
			var data = {
					title : $('.j_a_title').val(),
					time : $('.j_a_time').val(),
					city : $('.j_a_city').val(),
					number : $('.j_a_number').val(),
					cost : $('.j_a_cost').val(),
					type : $('.j_a_type').val(),
					content : $('.j_a_content').val(),
					remark : $('.j_a_remark').val(),
					userid : localStorage.id
				},
				fileid = 'j_a_pic';
			if (!(data.title&&data.time&&data.city&&data.number&&data.cost&&data.type&&data.content&&$('#j_a_pic').val())) {
				alert('信息不能为空！');return;
			}
			
			util.ajaxPostFormData({
				url:hostname+"add_activity/",
				data:data,
				type:'json',
				fileid:fileid,
				success:function(res){console.log(res)
					var s=res.state;
					if (s === 0) {alert("录入错误，请检查是不是有非法字符");return;}
					if (s === 1) {
						alert("活动录入成功！");
						location.href = "./homepage.html";
					}
				}
			});
		}
	}
});