//菜单页面

var H5PageMenu = function() {
	
	this.el = $('<div class="section h5_page h5_page_menu"></div>');

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
        case 'menu':
          component = new H5ComponentMenu(name, cfg);
          break;
        case 'today_brief':
          component = new H5ComponentTodayBrief(name, cfg);
          break;
				default:
			}
			this.el.append(component);

			return this;
		}

    this.addComponent('menu', {
      type: 'menu',
      width: 660,
      height: 1000,
      css: {
        top: '22%',
      },
      center: true,
    })
        .addComponent('title', {
          width: 660,
          text: '星座运势',
          css: {
            top: 40,
            fontSize: 50,
            textAlign: 'center',
          },
          center: true,
        })
        .addComponent('copyright', {
          text: 'by bowiego',
          css: {
            top: 100,
            right: '10%',
            color: '#2e94e1',
            fontSize: 20,
            textAlign: 'center',
          },
        })
	




	return this.el;
}