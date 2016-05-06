define('./js/main',function(require, exports, module){
	window.hostname = "http://192.168.235.99:3000/"
	var util = require('./lib/util');

	
	exports = module.exports = {
		init:function(){
			this.initInfo();
			this.bind();
			this.hasMessage();
		},
		bind:function(){
			var self = this;
			$('.j_remenber_psw').attr('checked','checked');
			$(document.body).on('click', ".j_login", function() {
				event.preventDefault();
				if (localStorage.isLogin != 1) {
					$('#modal_login').modal('show');
				}
			}).on('click', '.modal_close', function(event) {//关闭注册，登陆
				event.preventDefault();
				$(this).parent('.modal').modal('hide');
			}).on('click', '.j_to_register', function() {
				
				$('#modal_login').modal('hide');
				$('#modal_register').modal('show');
			}).on('click', '.j_btn_register', function() {
				var phone = $('.j_r_phone').val(),
					name = $('.j_r_name').val(),
					password = $('.j_r_password').val();
				
				self.register(phone, name, password);
			}).on('click', '.j_btn_login', function() {
				var phone = $('.j_l_phone').val(),
					password = $('.j_l_password').val();
				
				self.login(phone, password);
				
			}).on('click', '.u-issue', function() {
				
				location.href = "./add_activity.html";
			}).on('click', '.u-pic', function() {
				
				location.href="modify_message.html";
			});


			var $li = $('.header ul').find('li');
			$li.eq(4).on('click', function() {//推出登录
				
				localStorage.isLogin = 0;
				location.reload();
			});
			$li.eq(3).on('click', function(e) {//推出登录
				e.preventDefault();
				location.href="./homepage.html";
			});
		},
		hasMessage:function(){
			$.get(hostname+"isView/?id="+localStorage.id,function(res){
				if (res.state !== 1) {alert('查询失败')}
				if(res.data.isviewed == 0){
					$('.j_h_name').siblings('span').css('color','red');
				}

			});
		},
		register:function(phone, name, password){
			if (!(phone&&name&&password)) {
				alert("信息不能为空！")
				return;
			}
			util.ajaxPostFormData({
				url:hostname+"register/",
				data:{
						phone:phone,
						name:name,
						password:password
					},
				type:'json',
				success:function(res){
					var s=res.state;
					if (s === 2) {alert("已经被注册了！");return;}
					if (s === 1) {
						$('#modal_register').modal('hide');
						$('#modal_login').modal('show');
					}
				}
			});
		},
		login:function(phone,password){
			var self = this;
			if (!(phone&&password)) {
				alert("信息不能为空！")
				return;
			}
			util.ajaxPostFormData({
				url:hostname+"login/",
				data:{
						phone:phone,
						password:password
					},
				type:'json',
				success:function(res){
					console.log(res);
					if (res.state != 1) {
						alert("用户或密码错误");
						return;
					}
					$('#modal_login').modal('hide');
					var data = res.data;
					localStorage.isLogin = 1;
					// if ($('.j_remenber_psw')[0].checked) {
					// 	localStorage.isLogin = 1;
					// }else {
					// 	localStorage.isLogin = 0;
					// }
					
					localStorage.id = res.data.userid;
					localStorage.name = res.data.username;
					localStorage.pic = res.data.userpic;
					localStorage.phone = res.data.userphone;
					localStorage.email = res.data.useremail;
					localStorage.city = res.data.userplace;
					self.initInfo();
				}
			});
		},
		initInfo:function(){//如果登陆了初始化一些东西
			
			if (localStorage.isLogin != 1 ) {return;}
			$('.j_h_name').text(localStorage.name);
			$('.u-name').text(localStorage.name);
			$('.u-pic').attr('src',localStorage.pic);
		}
	}
});