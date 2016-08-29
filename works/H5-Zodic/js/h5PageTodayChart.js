//基本今日运势图表

var H5PageTodayChart = function(consName) {

	var rate = [['总体','#CC9999'],['健康','#99CC66'],['爱情','#FF6666'],['财运','#FFFF99'],['工作','#996699']];

	var data;
	$.ajax({
		type: "GET",
		async:false,
		url: "https://apis.baidu.com/bbtapi/constellation/constellation_query?consName=水瓶座",
		beforeSend: function(request) {
			request.setRequestHeader("apikey","488c586c7bc2e5794aecf0ba4fe4d66b");
		},
		success: function(json) {
			data = json['today'];
			return data;
		}
	});

	rate[0].splice(1, 0, data.all); 
	rate[1].splice(1, 0, data.health); 
	rate[2].splice(1, 0, data.love); 
	rate[3].splice(1, 0, data.money); 
	rate[4].splice(1, 0, data.work); 

	console.log(rate);

	this.el = $('<div class="section h5_page h5_page_today_chart h5_page_today_chart_'+name+'"></div>');
  
	this.addComponent = function(name, cfg) {
			var cfg = cfg || {};
			cfg = $.extend({
				type: 'base'
			},cfg);

			var component;
			switch(cfg.type) {
				case 'base':
					component = new H5ComponentBase(name, cfg);
					break;
				case 'bar':
					component = new H5ComponentBar(name, cfg);
					break;
				default:
			}
			this.el.append(component);

			return this;
		}

	this.addComponent('title', {
			width: 200,
			height: 70,
			text: '今日指数',
			css: {
				top: 80,
				backgroundColor: '#fff',
				borderRadius: 50,
				lineHeight: 35+'px',
				fontSize: 15,
				color: colorArr[consName],
				textAlign: 'center',
				letterSpacing: 4,
				opacity: 0,
			},
			animateIn: {
                opacity: 1,
            },
            animateOut: {
                opacity: 0,
            },
			center: true,
		})
		.addComponent('chart', {
			type: 'bar',
			width: 600,
			height: 800,
			data: rate,
			css: {
				top: '30%',
				left: 60,
			},
		})
	;




	return this.el;
}