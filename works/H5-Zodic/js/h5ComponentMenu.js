//菜单组件

var H5ComponentMenu = function(name, cfg) {

	var component = new H5ComponentBase(name, cfg);

	var arr = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
	for(var i = 0; i < 12; i++) {
		var btn = $('<div class="menu-btn"></div>');
		btn.css('position', 'relative');
		var name = $('<div class="menu-name"></div>');
		name.width(cfg.width/6-20);
		name.css({
			'position': 'absolute',
			'bottom': -30,
			'color': '#2c2c5a',
			'textAlign': 'center',
		});
		name.text(consData[arr[i]]['name']);
		btn.append(name);
		btn.width(cfg.width/6-20);
		btn.height(cfg.width/6-20);
	    btn.css('backgroundImage', 'url(../imgs/logos/'+arr[i]+'_logo.png)');
	    btn.css({'backgroundSize': 'contain',
	    		'float': 'left',
	    		'boxShadow': '0 0 30px rgba(0, 0, 0, 0.3)', 
	    		'marginRight': 30,
	    		'marginBottom': 40,
			});
	    btn.css('animationDelay', 0.03*i+'s');
	    if((i+1)%3 == 0) {
	    	btn.css({
	    		'marginRight': 0,
	    	});
	    }

	

	    component.append(btn);
	}

	return component;
}