define('./js/posts_detail',function(require, exports, module){
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
				self.joinActivity();
			}).on('click', '.c-reply', function() {
				var who=$(this).siblings('.c-who').text(),
					me = localStorage.name,
					head = me +"回复"+who;

					$('#modal_reply').modal();
					$('.te-who').attr('placeholder',head);
			}).on('click', '.j_btn_reply_who', function() {
				event.preventDefault();
				var $tx = $(this).parent().find('textarea'),
					text = $tx.attr('placeholder')+$tx.val();

				self.replyWho(text);
			});
			
		},
		getActivityDetail:function(){
			var id = util.getQueryString('pid');
			$.get(hostname+"get_posts/?id="+id,function(res){
				if (res.state !== 1) {alert("查询出错！");return;}
				console.log(res)
				var data = res.data[0],html="";
				html = ['<div class="col-sm-2">',
						'<img class="img-rounded" src="'+data.userpic+'" width="100">',
					'</div>',
					'<div class="col-sm-7">',
						'<br/><br/><p style="color:  rgb(254,200,0);font-size: 16px;font-weight: 700;">帖子标题：'+data.poststitle+'</p>',
						'<p>时间:<span>'+data.poststime+'</span></p>',
					'</div>',
					'<div class="col-sm-12">',
						'<br/><span>'+data.postscontent.replace(/\n/g,'</br>')+'</span>',
						'<p style="text-indent: 20px;" class="activity-detail">',
						'</p>',
					'</div>'].join("");
				$('.j_a_detail').html(html);
			});
		},
		addComment:function(){
			util.ajaxPostFormData({
				url:hostname+"add_posts_comment/",
				data:{
						uid:localStorage.id,
						pid:util.getQueryString('pid'),
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
			$.get(hostname+"add_posts_comment/?pid="+util.getQueryString('pid'),function(res){
				if (res.state !== 1) {alert('查询失败')}
				console.log(res)

				var data = res.data, html=[];
				for (var i = 0; i < data.length; i++) {
					html.push(['<div class="at-comment" attr-id="'+data[i].userid+'">',
						'<img class="rounded" src="'+data[i].userpic+'" width="100">',
					   '<span style="color:#0af;" class="c-who">'+data[i].username+': </span>',
						'<span>'+data[i].commentcontent+'        '+data[i].commenttime+'</span>',
						'<span class="pull-right c-reply">回复</span>',
					'</div>'].join(''));
				}
				$('.j_setcomment').append(html.join(''));
			});
		},
		replyWho:function(text){
			util.ajaxPostFormData({
				url:hostname+"add_posts_comment/",
				data:{
						uid:localStorage.id,
						pid:util.getQueryString('pid'),
						comment:text
					},
				type:'json',
				success:function(res){
					if (res.state !== 1) {alert('评论失败');return;}
					alert('回复成功');
					location.reload();
				}
			});
		}
	}
});