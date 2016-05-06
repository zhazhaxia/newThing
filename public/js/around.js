define('./js/around',function(require, exports, module){
	var util = require('./lib/util');

	
	exports = module.exports = {
		init:function(){
			this.bind();
			this.setActivity("广州");
		},
		bind:function(){
			var self = this;
			$(document.body).on('click', '.j_city_ul span', function() {
				var city = $(this).text();
				$('.j_city_now').html(city+'<span class="caret"></span>');
				if (city == "所有城市") {
					city = '*" or 1="1'
				}
				self.setActivity(city);
			});
		},
		setActivity:function(city){
			$.get(hostname+'around/?city='+city,function (res) {
				if (res.state !== 1) {alert("查询出错！");return;}
				//console.log(res)
				var data = res.data,html=[];
				for (var i = 0; i < data.length; i++) {
					html.push(['<div class="col-sm-4 around-center-img">',
						'<img src="'+data[i].activitypic+'" width="100%" class="img-rounded">',
						'<p class="a-time">'+data[i].activitytime+'</p>',
						'<p class="a-title">'+data[i].activitytitle+'</p>',
						'<a href="'+hostname+"activity_detail.html?aid="+data[i].activityid+'"><img src="./img/around/joinnow.png" class="around-joinnow"></a>',
					'</div>'].join(''));
				}
				$('.j_around').html(html.join(''));
			});
		}
	}
});