//分享组件

var H5ComponentShare = function(name, cfg) {

	var cfg = cfg || {};
	var component = new H5ComponentBase(name, cfg);

	var share = $('<div class="share-btn"><span class="cta">分享</br>一下吧！</span><div class="close"><span></span><span></span></div><ul class="social"><li class="fa fa-weixin weixin"></li><li class="fa fa-weibo weibo"></li></ul></div>');

	var QRcode = $('<div class="QRcode"></div>');
	QRcode.width(200);
	QRcode.height(200);
	QRcode.css({
		'position': 'absolute',
		'top': 35,
		'left': 28,
		'backgroundImage': 'url(../imgs/QRcode.png)',
		'backgroundSize': 'contain',
		});

	share.append(QRcode);
	component.append(share);

	// share.click(function() {
	// 	$(this).addClass("clicked");
	// });
	share.find('.close').click(function(e) {
		share.removeClass('clicked');
  		e.stopPropagation();
	});

	share.find('.weixin').click(function() {
		console.log(1);
		shareFriend();
	});

	component.on('onLoad', function() {
		setTimeout(function() {
			share.addClass('clicked');
			return false;
		},500);
	});
	component.on('onLeave', function() {
		setTimeout(function() {
			share.removeClass('clicked');
			return false;
		});
	});

	return component;
}