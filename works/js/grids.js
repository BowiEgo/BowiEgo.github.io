
$(function(){
	$(".grid").hover(function(e){
		var num = $(this).index();
		console.log(num);
		e.stopPropagation();
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$(this).siblings().removeClass("active");
			// $(this).removeClass("blur");
			// if($(this).siblings().hasClass("blur")){
			$(this).parent().siblings().children('.grid').removeClass("blur");
			// }else{
				// $(this).siblings().addClass("blur");
			// }
			$("#header").removeClass("blur");
		}else{
			$(this).addClass("active");
			$(".work-intro p").eq(num).addClass("active");
			if($(this).parent().siblings().children('.grid').hasClass("active")){
				$(this).removeClass("blur");
				$(".container > p").removeClass("active");
				$(this).siblings().addClass("active");
				$(this).parent().siblings().children('.grid').removeClass("active");
				$(this).parent().siblings().children('.grid').addClass("blur");
			}else{
				$(this).parent().siblings().children('.grid').addClass("blur");
				$(this).siblings().addClass("active");
			}
			// $(this).siblings().removeClass("active");
			$("#header").addClass("blur");
		}
		// if(!$(this).hasClass("active")&&!$(this).siblings().hasClass("active")){
		// 	$(this).removeClass("blur");
		// 	$(this).siblings().removeClass("blur");
		// }
	})
	// $(document).click(function(){
	// 	console.log(2);
	// 	if($(".grid").hasClass("active")){
	// 		$(".grid").removeClass("active");
	// 		$(".grid").removeClass("blur");
	// 		$(".work-intro > p").removeClass("active");
	// 		$("#mainWrapper").removeClass("active");
	// 	}
	// })
})