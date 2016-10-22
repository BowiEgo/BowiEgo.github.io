//基本今日配对页面

var H5PageFriend = function(consName) {
	
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
				case 'friend':
					component = new H5ComponentFriend(name, cfg);
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
			backgroundColor: '#fff',
			borderRadius: 50,
			lineHeight: 35+'px',
			fontSize: 15,
			color: '#fff',
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
		.addComponent('friend', {
			type: 'friend',
			consName: consName,
			width: 500,
			// height: 800,
			css: {
				top: 140,
				opacity: 0,
			},
			animateIn: {
                opacity: 1,
            },
            animateOut: {
                opacity: 0,
            },
            animateDelay: 500,
			center: true
		});




	return this.el;
}