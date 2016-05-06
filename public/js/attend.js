define('./js/attend',function(require, exports, module){
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
		},
		bind:function(){
			var self = this;
		},
		setMessage:function(){
			$.get(hostname+'get_my_join/?id='+localStorage.id,function (res) {
				if (res.state !== 1) {alert("查询出错！");return;}
				console.log(res)
				var data = res.data,html=[];
				for (var i = 0; i < data.length; i++) {
					html.push(['<div class="col-sm-4 around-center-img">',
						'<img src="'+data[i].activitypic+'" width="100%" class="img-rounded">',
						'<p class="a-time">'+data[i].activitytime+'</p>',
						'<p class="a-title">'+data[i].activitytitle+'</p>',
						'<a href="activity_detail.html?aid='+data[i].activityid+'"><img src="./img/around/joinnow.png" class="around-joinnow"></a>',
					'</div>'].join(''));
				}
				$('.j_myjoin').html(html.join(''));
			});
		}
	}
});