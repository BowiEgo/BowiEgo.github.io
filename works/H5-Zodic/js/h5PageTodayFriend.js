//基本今日配对页面

var H5PageTodayFriend = function(name) {
	
	var colorArr = {'aquarius': '#41b0c4'};

	this.el = $('<div class="section h5_page h5_page_today_friend h5_page_today_friend_'+name+'"></div>');
  
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
		text: '星座速配',
		css: {
			top: 80,
			backgroundColor: colorArr[name],
			borderRadius: 50,
			lineHeight: 35+'px',
			fontSize: 15,
			color: '#fff',
			textAlign: 'center',
			letterSpacing: 4,
		},
		center: true,
	});




	return this.el;
}