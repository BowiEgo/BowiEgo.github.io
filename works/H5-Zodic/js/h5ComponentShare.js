//分享组件

var H5ComponentShare = function(name, cfg) {

	var cfg = cfg || {};
	var component = new H5ComponentBase(name, cfg);

	var share = $('<div class="share-btn"><span class="cta">分享到</span><div class="close"><span></span><span></span></div><ul class="social"><li class="fa fa-weixin weixin"></li><li class="fa fa-weibo weibo"></li></ul></div>');

	component.append(share);

	share.click(function() {
		$(this).addClass("clicked");
	});
	share.find('.close').click(function(e) {
		share.removeClass('clicked');
  		e.stopPropagation();
	});

	share.find('.weixin').click(function() {
		console.log(1);
		shareFriend();
	});

	return component;
}