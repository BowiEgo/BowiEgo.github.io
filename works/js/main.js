$(function(){
	$(".nav_toggle").click(function(){
		if($(this).children().hasClass('active')){
			$(this).children().removeClass('active');
		}else{
			$(this).children().addClass('active');
		}
		if($("nav ul").hasClass('active')){
			$("nav ul").removeClass('active');
		}else{
			$("nav ul").addClass('active');
		}
	});
});