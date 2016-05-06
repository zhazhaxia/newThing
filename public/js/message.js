define('./js/message',function(require, exports, module){
	var util = require('./lib/util');

	
	exports = module.exports = {
		init:function(){
			if (!!!~~localStorage.isLogin) {
					alert('请先登陆~');
					location.href=hostname+'index.html';
					return;
				}
			this.bind();
			this.setMessage();
			this.setPostsMessage();
			this.viewMessage();
		},
		bind:function(){
			var self = this;
		},
		setMessage:function(){
			$.get(hostname+'get_join_info/?id='+localStorage.id,function (res) {
				if (res.state !== 1) {alert("查询出错！");return;}
				console.log(res)
				var data = res.data,html=[];
				for (var i = 0; i < data.length; i++) {
					html.push(['<tr>',
					     '<td><a href="activity_detail.html?aid='+data[i].activityid+'">'+data[i].activitytitle+'</a></td>',
					     '<td>'+data[i].username+'</td>',
					     '<td>'+data[i].userphone+'</td>',
					     '<td>'+data[i].jointime+'</td>',
					  '</tr>'].join(''));
				}
				$('.j_body').html(html.join(''));
			});
		},
		setPostsMessage:function(){
			$.get(hostname+'get_posts/?uid='+localStorage.id,function (res) {
				if (res.state !== 1) {alert("查询出错！");return;}
				console.log(res)
				var data = res.data,html=[];
				for (var i = 0; i < data.length; i++) {
					html.push(['<tr>',
					     '<td><a href="posts_detail.html?pid='+data[i].postsid+'">'+data[i].poststitle+'</a></td>',
					     '<td>'+data[i].username+'</td>',
					     '<td>'+data[i].commentcontent+'</td>',
					     '<td>'+data[i].userphone+'</td>',
					     '<td>'+data[i].commenttime+'</td>',
					  '</tr>'].join(''));
				}
				$('.j_posts').html(html.join(''));
			});
		},
		viewMessage:function(){
			util.ajaxPostFormData({
				url:hostname+"isView/",
				data:{
						id:localStorage.id
					},
				type:'json',
				success:function(res){
					if (res.state !== 1) {alert("查询出错！");return;}
					
				}
			});
		}
	}
});