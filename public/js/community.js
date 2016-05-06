define('./js/community',function(require, exports, module){
	var util = require('./lib/util');

	
	exports = module.exports = {
		init:function(){
			this.bind();
			this.setComment('全部');
		},
		bind:function(){
			var self = this;
			$(document.body).on('click', '.com-ul li', function() {
				
				$(this).find('a').addClass('com-select')
				$(this).siblings().find('a').removeClass('com-select');
				var $a = $(this).find('a');
				self.setComment($a.text().replace(/[^\u4e00-\u9fa5]/gi,""));
			}).on('click', '.j_btn_posted', function() {
				$('#modal_posted').modal('show');
			}).on('click', '.j_a_public', function() {
				if (!!!~~localStorage.isLogin) {
					alert('请先登陆~');
					return;
				}
				self.addPosts();
			});
		},
		setComment:function(type){
			$.get(hostname+'get_posts/?type='+type,function (res) {
				if (res.state !== 1) {alert("查询出错！");return;}
				console.log(res)
				var data = res.data,html=[];
				for (var i = 0; i < data.length; i++) {
					html.push(['<div class="col-sm-12 com-detail">',
						'<div class="col-sm-1"><img class="img-rounded" src="'+data[i].userpic+'" width="50" height="50"></div>',
						'<div class="col-sm-11 com-content">',
							'<span style="color: #fa9;margin-right: 10px;">[<span>'+data[i].poststype+'</span>|分享]</span><a href="./posts_detail.html?pid='+data[i].postsid+'"><span class="com-title">'+data[i].poststitle+'</span></a>',
							'<br/>',
							'<span class="com-via">',
								'<span class="com-user">发布者：'+data[i].username+'</span>',
								'<span class="pull-right com-time">'+data[i].poststime+'</span>',
							'</span>',
						'</div>',
					'</div>'].join(''));
				}
				$('.j_co').html(html.join(''));
			});
		},
		addPosts:function(){
			var data = {
					title : $('.j_a_title').val(),
					type : $('.j_a_type').val(),
					content : $('.j_a_content').val(),
					userid : localStorage.id
				};
			if (!(data.title&&data.type&&data.content)) {
				alert('信息不能为空！');return;
			}
			
			util.ajaxPostFormData({
				url:hostname+"add_posts/",
				data:data,
				type:'json',
				success:function(res){console.log(res)
					var s=res.state;
					if (s === 0) {alert("录入错误，请检查是不是有非法字符");return;}
					if (s === 1) {
						alert("发帖成功！");
						location.href = hostname+"community.html";
					}
				}
			});
		}
	}
});