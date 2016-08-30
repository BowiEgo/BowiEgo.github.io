//基本封面对象

var H5PageBack = function(name) {
	
	this.el = $('<div class="section h5_page h5_page_back h5_page_back_'+name+'"></div>');

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
				case 'share':
					component = new H5ComponentShare(name, cfg);
					break;
        		case 'today_brief':
          		component = new H5ComponentTodayBrief(name, cfg);
          break;
				default:
			}
			this.el.append(component);

			return this;
		}


	this.addComponent('QRcode', {
	    	type: 'share',
	    	css: {
	    		top: '40%',
	    	},
	    	center: true,
  	  	})
		.addComponent('shareArrow', {
			width: 256,
			height: 240,
			css: {
				top: 10,
				right: 10,
				backgroundImage: 'url(../imgs/share.png)',
				backgroundSize: 'contain',
			}
		})	
		.addComponent('back', {
			width: 104,
			height: 100,
			css: {
				bottom: 80,
				left: '45%',
				backgroundImage: 'url(../imgs/tail_back.png)',
				backgroundSize: 'contain',
			}
		});

	return this.el;
}