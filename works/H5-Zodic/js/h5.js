/*内容管理对象*/

var H5 = function() {

	this.id = ('h5_' + Math.random()).replace('.', '_').slice(0, 7);
	this.el = $('<div class="h5" id="'+ this.id +'"></div>');
	this.page = [];
	$('body').append(this.el);

	/*
	 *	新增一个页面
	 *	@param {string} name 页面的名称，会加入到className中
	 *	@param {string} text 页面内到默认文本
	 *	@return {H5} H5对象，可重复使用H5对象支持的方法
	*/	
	this.addPage = function(type, consName) {
		var page;

		switch(type) {
			case 'face':
				page = new H5PageFace(name);
				page.css('background', '#000021');
				break;
			case 'today_brief':
				page = new H5PageTodayBrief(consName);
				page.css('backgroundImage', 'url(../imgs/today_bg.png)');
				break;
			case 'today_chart':
				page = new H5PageTodayChart(consName);
				page.css('backgroundImage', 'url(../imgs/today_chart_bg.png)');
				break;
			case 'today_friend':
				page = new H5PageTodayFriend(consName);
				page.css('backgroundImage', 'url(../imgs/today_friend_bg.png)');
				break;
			// case 'week_brief':
			// 	page = new H5PageWeekBiref(name);
			// 	break;
			default:
		}



		this.el.append(page);
		this.page.push(page);

		return this;
	}

	/* 
	 *	新增一个页面组件 
	 *	@param {string} name 组件的名称，会加入到className中
	 *	@param {object} cfg 组件的相关设置
	 *	@return {H5} H5对象，可重复使用H5对象支持的方法
	*/
	this.addComponent = function(name, cfg) {
		var cfg = cfg || {};
		cfg = $.extend({
			type: 'base'
		},cfg);

		var component;
		var page = this.page.slice(-1)[0];
		switch(cfg.type) {
			case 'base':
				component = new H5ComponentBase(name, cfg);
				break;
			case 'today_brief':
				component = new H5ComponentTodayBrief(name, cfg);
				break;
			default:
		}
		page.append(component);

		return this;
	}

	/*H5对象元素的初始化呈现*/
	this.loader = function() {
		this.el.fullpage({
			onLeave: function(index, nextIndex, direction) {
				// console.log($(this).find('.h5_component').offset().top);
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad: function(anchorLink, index) {
				$(this).find('.h5_component').trigger('onLoad');
			}
		});
		// this.el.show();
	}


	return this;
}