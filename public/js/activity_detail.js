define('./js/activity_detail',function(require, exports, module){
	var util = require('./lib/util');

	exports = module.exports = {
		init:function(){
			this.bind();
			this.getActivityDetail();
			this.setComment();
		},
		bind:function(){
			var self = this;
			$('body').on('click', '.j_add_comment', function() {
				if (!$('.j_com_con').val()) {alert('请输入内容');return;}
				if (!!!~~localStorage.isLogin) {
					alert('请先登陆~');
					return;
				}
				self.addComment();
			}).on('click', '.j_join_at', function() {
				if (!!!~~localStorage.isLogin) {
					alert('请先登陆~');
					return;
				}
				self.joinActivity();
			});
			
		},
		getActivityDetail:function(){
			var id = util.getQueryString('aid');
			$.get(hostname+"activity_detail/?id="+id,function(res){
				if (res.state !== 1) {alert("查询出错！");return;}
				console.log(res)
				var data = res.data,html=[],rhtml=[];
				html.push(['<div class="col-sm-5">',
							'<img class="img-rounded" src="'+data[0].activitypic+'" width="100%">',
						'</div>',
						'<div class="col-sm-7">',
							'<p style="color:  rgb(254,200,0);font-size: 16px;font-weight: 700;">'+data[0].activitytitle+'</p>',
							'<p>时间:<span>'+data[0].activitytime+'</span></p>',
							'<p>地点:<span>'+data[0].activitycity+'</span></p>',
							'<p>费用:<span>'+data[0].activitycost+'</span></p>',
							'<p>类型:<span>'+data[0].activitytype+'</span></p>',
							'<p>举办方:<span>'+data[0].username+'</span></p>',
							'<p style="color: #0af;"><span>最多'+data[0].activitypersonnumber+'</span>人参加</p>',
						'</div>',
						'<div class="col-sm-12">',
							'<span>具体信息：</span>',
							'<p style="text-indent: 20px;" class="activity-detail">'+data[0].activitycontent.replace(/\n/g,'<br/>'),
							'</p>',
							'<p class="activity-detail-remark">'+data[0].activityremark,
							'</p>',
						'</div>'].join(''));
				$('.j_a_detail').html(html.join(''));

				rhtml.push(['<img class="img-circle center-block" src="'+data[0].userpic+'" width="100" height="100">',
				'<div style="border: 1px solid #fa9;padding: 10px;">',
					'<p>',
						'<span class="sponsor text-info" style="font-size: 14px;">'+data[0].username+'</span>',
						'<span style="background: #ddd;font-size: 10px;">主办方</span>',
					'</p>',
					'<p style="color: #aaa;">',
						'活动类型:<span>'+data[0].activitytype+'</span><br/>',
						'地点:<span>'+data[0].activitycity+'</span>',
					'</p>',
				'</div>',
				// '<div style="margin-top: 10px;">',
				// 	'<span>活动地图</span>',
				// 	'<div class="map">',
				// 		'<img class="img-rounded" src="./img/test.jpg">',
				// 	'</div>',
				// '</div>',
				'<button class="btn btn-lg btn-warning center-block j_join_at" style="margin-top: 10px;">一键报名</button>'].join(''));
				$('.j_a_right').html(rhtml.join(''));
			});
		},
		addComment:function(){
			util.ajaxPostFormData({
				url:hostname+"add_comment/",
				data:{
						uid:localStorage.id,
						aid:util.getQueryString('aid'),
						comment:$('.j_com_con').val()
					},
				type:'json',
				success:function(res){
					if (res.state !== 1) {alert('评论失败');return;}
					alert('评论成功');
					location.reload();
				}
			});
		},
		setComment:function(){
			$.get(hostname+"add_comment/?aid="+util.getQueryString('aid'),function(res){
				if (res.state !== 1) {alert('查询失败')}
				console.log(res)

				var data = res.data, html=[];
				for (var i = 0; i < data.length; i++) {
					html.push(['<div class="at-comment">',
						'<img class="img-circle" src="'+data[i].userpic+'" width="100">',
						'<span style="color:#0af;">   '+data[i].username+': </span>',
						'<span>'+data[i].commentcontent+'        '+data[i].commenttime+'</span>',
					'</div>'].join(''));
				}
				$('.j_setcomment').append(html.join(''));
			});
		},
		joinActivity:function(){
			util.ajaxPostFormData({
				url:hostname+"join_activity/",
				data:{
						uid:localStorage.id,
						aid:util.getQueryString('aid')
					},
				type:'json',
				success:function(res){
					if (res.state === 2) {alert('你已经参与过啦！');return;}

					if (res.state !== 1) {alert('参与失败');return;}
					alert('参与成功！稍后活动发布者会以短信方式联系您！');
				}
			});
		}
	}
});