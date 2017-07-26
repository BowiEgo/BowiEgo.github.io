//基本柱状图组件

var H5ComponentBar = function(name, cfg) {

	var component = new H5ComponentBase(name, cfg);
	var rateArr = [];
	$.each(cfg.data, function(index, item) {
		console.log(item);
		var bar = $('<div class="bar bar_'+index+'"></div>');
		var name = $('<div class="name">'+item[0]+'</div>');
		var line = $('<div class="line"></div>');
		var lineBg = $('<div class="lineBg"></div>');
		var rate = $('<div class="rate">'+item[1]+'</div>');
		if(item[2]) {
			lineBg.css('background', item[2]);
			rate.css('color', item[2]);
		}
		line.append(lineBg);
		var per = item[1];	
		line.width(per);
		bar.append(name).append(line).append(rate);
		component.append(bar);
		rateArr.push(item[1].replace('%','')/100);
	});

	//按最大值的百分比来给每一项重新划分长度
	var maxRate = (Math.max.apply(null, rateArr)*100 + '%');
	$.each(component.find('.line'), function(index, item) {
		var per = parseInt(item.style.width.replace('%', ''))/parseInt(maxRate.replace('%', '')) * 70 + '%';
		item.style.width = per;
		console.log(item.style.width);
	});


	return component;
}