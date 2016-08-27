//基本今日运势图表

var H5PageTodayChart = function(name) {

	var colorArr = {'aquarius': '#41b0c4'};

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
				color: colorArr[name],
				textAlign: 'center',
				letterSpacing: 4,
			},
			center: true,
		});




	return this.el;
}