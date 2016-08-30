//基本今日运势简述页面

var H5PageTodayBrief = function(consName) {

  	this.el = $('<div class="section h5_page h5_page_today_brief h5_page_today_brief_'+name+'"></div>');

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
				case 'today_brief':
			        component = new H5ComponentTodayBrief(name, cfg);
			        break;
				default:
			}
			this.el.append(component);

			return this;
		}

    this.addComponent('logo', {
	    	width: 130,
	    	height: 130,
	  	  	bg: '../imgs/logos/'+consName+'_logo.png',
	  	  	css: {
	  	  		top: 50,
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
    	.addComponent('name', {
    		width: 180,
    		text: '???',
    		css: {
    			top: 140,
    			color: '#fff',
    			fontSize: 20,
    			paddingLeft: 8,
    			textAlign: 'center',
    			letterSpacing: 10,
                opacity: 0,
    		},
            animateIn: {
                opacity: 1,
            },
            animateOut: {
                opacity: 0,
            },
            animateDelay: 200,
    		center: true,
    	})
    	.addComponent('date', {
    		width: 260,
    		text: '???',
    		css: {
    			top: 180,
    			color: '#fff',
    			fontSize: 14,
    			paddingLeft: 4,
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
            animateDelay: 400,
    		center: true,
    	})
    	.addComponent('title', {
    		width: 200,
    		height: 70,
    		text: '今日运势',
    		css: {
    			top: 240,
    			backgroundColor: "#fff",
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
            animateDelay: 600,
    		center: true,
    	})
    	.addComponent('brief', {
    		type: 'today_brief',
    		consName: consName,
    		width: 700,
    		css: {
    			top: 40+'%',
                opacity: 0,
    		},
            animateIn: {
                opacity: 1,
            },
            animateOut: {
                opacity: 0,
            },
            animateDelay: 800,
    		center: true,
    	})



	return this.el;
}