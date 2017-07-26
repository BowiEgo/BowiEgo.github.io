/*内容管理对象*/

var consData = {'aries': {
					name: '白羊座',
					date: '3.21-4.19',
					color: '#ff6445',
					idiom: '白头偕老',
				},
			 	'taurus': {
			 		name: '金牛座',
			 		date: '4.20-5.20',
			 		color: '#21d2f6',
			 		idiom: '千金不换',
			 	}, 
			 	'gemini': {
			 		name: '双子座',
			 		date: '5.21-6.21',
			 		color: '#ffab3b',
			 		idiom: '执子之手',
			 	},
			 	'cancer': {
			 	 	name: '巨蟹座',
			 	 	date: '6.22-7.22',
			 	 	color: '#e1eaef',
			 	 	idiom: '蛮横霸道',
			 	}, 
			 	'leo': {
			 		name: '狮子座',
			 		date: '7.23-8.22',
			 		color: '#fdd818',
			 		idiom: '河东狮吼',
			 	}, 
			 	'virgo': {
			 		name: '处女座',
			 		date: '8.23-9.22',
			 		color: '#b2d047',
			 		idiom: '洞房花烛',
			 	},
			 	'libra': {
			 		name: '天秤座',
			 		date: '9.23-10.23',
			 		color: '#f3689e',
			 		idiom: '相敬如宾',
			 	}, 
			 	'scorpio': {
			 		name: '天蝎座',
			 		date: '10.24-11.22',
			 		color: '#cf6cd7',
			 		idiom: '以毒攻毒',
			 	}, 
			 	'sagittarius': {
			 		name: '射手座',
			 		date: '11.23-12.21',
			 		color: '#94f0aa',
			 		idiom: '一箭穿心',
			 	}, 
			 	'capricorn': {
			 		name: '摩羯座',
			 		date: '12.22-1.19',
			 		color: '#36b1ee',
			 		idiom: '竭尽全力',
			 	}, 
			 	'aquarius': {
			 		name: '水瓶座',
			 		date: '1.20-2.18',
			 		color: '#9df2ee',
			 		idiom: '水乳交融',
			 	}, 
			 	'pisces': {
			 		name: '双鱼座',
			 		date: '2.19-3.20',
			 		color: '#e9e979',
			 		idiom: '相濡以沫',
			 	},
			 };

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
			case 'menu':
				page = new H5PageMenu();
				// page.css('backgroundImage', 'url(../imgs/today_friend_bg.png)');
				break;
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