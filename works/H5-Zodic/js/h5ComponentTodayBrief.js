//基本今日简述组件

var H5ComponentTodayBrief = function(name, cfg) {

	var consName = cfg.consName;

	// var data;

	// $.ajax({
	// 	type: "GET",
	// 	async:false,
	// 	url: "https://apis.baidu.com/bbtapi/constellation/constellation_query?consName="+consArr[consName]+"",
	// 	beforeSend: function(request) {
	// 		request.setRequestHeader("apikey","488c586c7bc2e5794aecf0ba4fe4d66b");
	// 	},
	// 	success: function(json) {
	// 		data = json;
	// 	}
	// });

	// console.log(data);


	// var cfg = cfg || {};
	var component = new H5ComponentBase(name, cfg);

	var contain = $('<div class="contain"></div>')


	/**添加简介段落
	 * @param {[string]} name    [段落名称]
	 * @param {[string]} tabtext [段落标签]
	 * @param {[string]} text    [段落内容]
	 */
	var addParagraph = function(name, tabtext, text) {
		var div = $('<div class="'+name+'"></div>');
		var tab = $('<p class="tab '+name+'_tab"></p>');
		tab.text(tabtext);
		var p = $('<p class="'+name+'_p"></p>');
		p.text(text);

		div.append(tab);
		div.append(p);
		contain.append(div);
	};

	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth() + 1;
	var nowDate = now.getDate();
	var nowDateText = nowYear + '年' + nowMonth + '月' + nowDate + '日';

	addParagraph('date', '今天是：', nowDateText);
	// addParagraph('sumRate', '综合指数：', data['today']['all']);
	addParagraph('luckyColor', '幸运色：', '???');
	addParagraph('luckyNum', '幸运数字：', '???');
	// addParagraph('healthRate', '健康指数：', data['today']['health']);
	// addParagraph('love', '爱情指数：', data['today']['love']);
	// addParagraph('money', '财运指数：', data['today']['money']);
	// addParagraph('work', '工作指数：', data['today']['work']);
	addParagraph('summary', '总体运势：', '???');

	contain.find('.tab').css('color', '#fff');

	component.append(contain);

	component.on('onload', function() {

	});

	component.on('onleave', function() {
		return false;
	});

	return component;
}