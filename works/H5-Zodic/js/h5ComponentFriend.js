//基本今日图表组件

var H5ComponentFriend = function(name, cfg) {

	var consName = cfg.consName;
	// var consNameCN = consArr[consName].replace('座','');

	var qFriendName;
	var data;
	console.log(2);

	// $.ajax({
	// 	type: "GET",
	// 	async:false,
	// 	url: "https://apis.baidu.com/bbtapi/constellation/constellation_query?consName=水瓶座",
	// 	beforeSend: function(request) {
	// 		request.setRequestHeader("apikey","488c586c7bc2e5794aecf0ba4fe4d66b");
	// 	},
	// 	success: function(json) {
	// 		qFriendName = json['today']['QFriend'];
	// 	}
	// });

	// var qFriendNameCN =qFriendName.replace('座','');
	// console.log(qFriendNameCN);

	// $.ajax({
	// 	type: "GET",
	// 	async:false,
	// 	url: 'https://apis.baidu.com/txapi/xingzuo/xingzuo?me='+consNameCN+'&he='+qFriendNameCN+'',
	// 	beforeSend: function(request) {
	// 		request.setRequestHeader("apikey","488c586c7bc2e5794aecf0ba4fe4d66b");
	// 	},
	// 	success: function(json) {
	// 		data = json;
	// 	}
	// });

	var cfg = cfg || {};
	var component = new H5ComponentBase(name, cfg);

	var contain = $('<div class="contain"></div>');

	var myCons = $('<div class="myCons"></div>');
	// myCons.text(consArr[consName]);
	myCons.css('color', '#fff');
	var qFriend = $('<div class="qFriend"></div>');
	// qFriend.text(qFriendName);
	qFriend.css('color', '#fff');

	contain.append(myCons);
	contain.append(qFriend);

	var heart = $('<div class="heart"></div>');
	heart.width(172/2);
	heart.height(139/2);
	heart.css('backgroundImage', 'url(../imgs/heart.png)');
	heart.css('backgroundSize', 'contain');
	heart.css('marginLeft', (heart.width()*(-1)/2));
	contain.append(heart);

	var grade = $('<div class="grade"></div>');
	for(var i = 0; i < 4; i++) {
		var gradeSet = $('<div class="gradeSet"></div>');
		switch(i) {
			case 0:
				gradeSet.text('友情：');
				break;
			case 1:
				gradeSet.text('爱情：');
				break;
			case 2:
				gradeSet.text('婚姻：');
				break;
			case 3:
				gradeSet.text('亲情：');
				break;
			default:
		}
		var gradeStar = $('<div class="star"></div>');
		gradeSet.append(gradeStar);
		grade.append(gradeSet);
	}
	contain.append(grade);

	var content = $('<div class="content"></div>');
	// content.text(data['newslist'][0]['content']);
	contain.append(content);
	component.append(contain);


	return component;
}