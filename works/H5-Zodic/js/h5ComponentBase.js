//基本图文组件对象

var H5ComponentBase = function(name, cfg) {
	var cfg = cfg || {};
	var id = ('h5_component_' + Math.random()).replace('.', '_').slice(0, 17);
	var cls = 'h5_component_' + cfg.type;
	var component = $('<div class="h5_component '+cls+' h5_component_'+name+'" id="'+ id +'"></div>');

	cfg.text && component.text(cfg.text);
	cfg.width && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);
	cfg.css && component.css(cfg.css);
	cfg.bg && component.css('backgroundImage', 'url('+cfg.bg+')');
	//组件水平居中
	if(cfg.center == true) {
		component.css({
			marginLeft: (-cfg.width/4) + 'px',
			left: '50%'
		});
	}



	component.on('onLoad', function() {
		setTimeout(function() {
			component.addClass(cls+'_load')
					 .removeClass(cls+'_leave');
			cfg.animateIn && component.animate(cfg.animateIn, 1000);
			
			return false;
		},cfg.animateDelay)
	});
	component.on('onLeave', function() {
		component.addClass(cls+'_leave')
				 .removeClass(cls+'_load');
		cfg.animateOut && component.animate(cfg.animateOut, 500);

		return false;
	})


	return component;
}