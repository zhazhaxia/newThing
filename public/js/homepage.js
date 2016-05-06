define('./js/homepage',function(require, exports, module){
	var util = require('./lib/util');

	
	exports = module.exports = {
		init:function(){
			if (!!!~~localStorage.isLogin) {
				alert('请先登陆~');
				location.href=hostname+'index.html';
				return;
			}
			this.bind();
			this.getMyLaunch();
		},
		bind:function(){
			var self = this;
			$('body').on('click', '.a-del', function() {
				
				var id=$(this).parents().attr('data-id');
				if(confirm("确定删除吗？")){
					self.deleteActivity(id);
				}
				
			});
			
		},
		getMyLaunch:function(){
			var id = localStorage.id;
			$.get(hostname+"myLaunch/?id="+id,function(res){
				if (res.state !== 1) {alert("查询出错！");return;}
				var data = res.data,html=[];
				for (var i = 0; i < data.length; i++) {
					html.push(['<div class="col-sm-4 around-center-img" data-id="'+data[i].activityid+'">',
						'<img src="'+data[i].activitypic+'" width="100%" class="img-rounded">',
						'<p class="a-time">'+data[i].activitytime+'</p>',
						'<p class="a-title">'+data[i].activitytitle+'</p>',
						'<a href="'+hostname+"activity_detail.html?aid="+data[i].activityid+'"><img src="./img/around/joinnow.png" class="around-joinnow"></a>',
						'<a href="javascript:0;" class="btn a-del">删除</a>',
					'</div>'].join(''));
				}
				$('.j_mylaunch').html(html.join(''));
			});
			
		},
		deleteActivity:function(id){
			$.get(hostname+"deleteActivity/?id="+id,function(res){
				if (res.state !== 1) {alert("查询出错！");return;}
				alert("删除成功");
				location.reload();
			});
		}
	}
});