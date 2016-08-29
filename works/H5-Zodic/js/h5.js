/*内容管理对象*/
var consArr = {'aries': '白羊座', 'taurus': '金牛座', 'gemini': '双子座', 'cancer': '巨蟹座', 'leo': '狮子座', 'virgo': '处女座', 'libra': '天秤座', 'scorpio': '天蝎座', 'sagittarius': '射手座', 'capricorn': '摩羯座', 'aquarius': '水瓶座', 'pisces': '双鱼座'};
var colorArr = {'aquarius': '#41b0c4'};
var dateArr = {'aries': '3.21-4.19', 'taurus': '4.20-5.20', 'gemini': '5.21-6.21', 'cancer': '6.22-7.22', 'leo': '7.23-8.22', 'virgo': '8.23-9.22', 'libra': '9.23-10.23', 'scorpio': '10.24-11.22', 'sagittarius': '11.23-12.21', 'capricorn': '12.22-1.19', 'aquarius': '1.20-2.18', 'pisces': '2.19-3.20'};

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
		consName = consName || '';

		switch(type) {
			case 'face':
				page = new H5PageFace(consName);
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
				page = new H5PageFriend(consName);
				page.css('backgroundImage', 'url(../imgs/today_friend_bg.png)');
				break;
			case 'back':
				page = new H5PageBack(type);
				page.css('background', '#000021');
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
	this.loader = function(page) {
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
		if(page){
			$.fn.fullpage.moveTo(page);
		}
	}


	return this;
}