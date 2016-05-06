define('./js/found',function(require, exports, module){
	var util = require('./lib/util');

	
	exports = module.exports = {
		init:function(){
			this.$more=$('.f-more');
			this.bind();
			this.getType('衣');
			this.getType('行');
			this.getType('食');
			this.getType('住');
			
		},
		bind:function(){
			var self = this;
			$('body').on('click', '.f-more', function() {
				
				var $p = $(this).parents('.found-scene');
				$(this).hide();
				$p.find('.found-scene-img').show();
			});
		},
		getType:function(type){
			var self = this;
			$.get(hostname+'get_activity_type/?type='+type,function (res) {
				if (res.state !== 1) {alert("查询出错！");return;}
				console.log(res)
				self.setYSZX(type, res.data);
			})
		},
		setYSZX:function(type, data){
			var html = [];
			for (var i = 0; i < data.length; i++) {
				html.push(['<div class="col-sm-4 found-scene-img">',
						'<img src="'+data[i].activitypic+'" width="100%" class="img-rounded">',
						'<p class="a-time">'+data[i].activitytime+'</p>',
						'<p class="a-title">'+data[i].activitytitle+'</p>',
						'<a href="activity_detail.html?aid='+data[i].activityid+'"><img src="./img/around/joinnow.png" class="around-joinnow"></a>',
					'</div>'].join(''));
			}

			switch (type) {
				case '衣':
					$('.j_y').append(html.join(''));
					this.setMore($('.j_y'));
					break;
				case '食':
					$('.j_s').append(html.join(''));
					this.setMore($('.j_s'));
					break;
				case '住':
					$('.j_z').append(html.join(''));
					this.setMore($('.j_z'));
					break;
				case '行':
					$('.j_x').append(html.join(''));
					this.setMore($('.j_x'));
					break;
			}

		},
		setMore:function(p){
			var im = p.find('.found-scene-img'),y=3;
			if (im.length>y) {
				for (var k = y; k < im.length; k++) {
					im.eq(k).hide();
				}
				p.append('<span class="f-more">更多</span>');
				this.triggerType();
			}
		},
		triggerType:function(){
			var type = util.getQueryString('type');
			if (type){
				type = ~~type-1;
				$('.f-more').eq(type).trigger('click');
			}
		}
	}
});