//基本今日运势简述页面

var H5PageTodayBrief = function(consName) {
	var nameArr = {'aquarius': '水瓶座'};
	var dateArr = {'aquarius': '1.20-2.18'};
	var colorArr = {'aquarius': '#41b0c4'};

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
	  	  	},
	    	center: true,
    	})
    	.addComponent('name', {
    		width: 180,
    		text: nameArr[consName],
    		css: {
    			top: 140,
    			color: '#fff',
    			fontSize: 20,
    			paddingLeft: 8,
    			textAlign: 'center',
    			letterSpacing: 10,
    		},
    		center: true,
    	})
    	.addComponent('date', {
    		width: 200,
    		text: dateArr[consName],
    		css: {
    			top: 180,
    			color: '#fff',
    			fontSize: 14,
    			paddingLeft: 4,
    			textAlign: 'center',
    			letterSpacing: 4,
    		},
    		center: true,
    	})
    	.addComponent('title', {
    		width: 200,
    		height: 70,
    		text: '今日运势',
    		css: {
    			top: 240,
    			backgroundColor: colorArr[consName],
    			borderRadius: 50,
    			lineHeight: 35+'px',
    			fontSize: 15,
    			color: '#fff',
    			textAlign: 'center',
    			letterSpacing: 4,
    		},
    		center: true,
    	})
    	.addComponent('brief', {
    		type: 'today_brief',
    		consName: consName,
    		width: 600,
    		css: {
    			top: 40+'%'
    		},
    		center: true,
    	})



	return this.el;
}