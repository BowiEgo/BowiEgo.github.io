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


	this.addComponent('share', {
    	type: 'share',
    	css: {
    		top: '40%',
    	},
    	center: true,
  	  });




	return this.el;
}