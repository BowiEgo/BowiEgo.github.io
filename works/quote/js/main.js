
$(document).ready(function() {
  	var color = ['#ff5722', '#ff9800', '#4caf50', '#009688', '#006bbf', '#3f51b5', '#673ab7', '#e91e63', '#f44336'];
	var curNum = 0;  	
	var count = 0;

  	changeColor();

  	showQuote();

	$("#btn").click(function() {
		if(!$("#quote").is(":animated")){
			changeColor();
			showQuote();
			count ++;
		}
	});

	function randomNum() {
		 
		var	indRandom = Math.floor(Math.random()*9);

		if(indRandom == curNum) {
			if(indRandom-1 > 0) {
				indRandom -= 1;
			} else {
				indRandom += 1;
			}
		}
		
		console.log(indRandom);
		return indRandom;
	}

	function changeColor() {

		curNum = randomNum();

	    $("body").css({
	      "background-color": color[curNum]
	    });  

	    $("#btn").css({
	      "background-color": color[curNum]
	    });

	    $("#quote").css({
	      "color": color[curNum]
	    }).animate({
	    	opacity: 0
	    },10);

	    $(".share-icon").css({
	      "color": color[curNum]
	    });
	}

	function showQuote() {
	    	$.ajax({
				type: "GET",
				url: "https://apis.baidu.com/txapi/dictum/dictum",
				beforeSend: function(request) {
					request.setRequestHeader("apikey","488c586c7bc2e5794aecf0ba4fe4d66b");
				},
				success: function(json) {
					var content = json.newslist[0].content;
					var mrname = json.newslist[0].mrname;
					// console.log(json.newslist[0].content);
					if(!$("#quote").is(":animated")){
			   			$("#quote").animate({
			   				opacity: 1
			   			},1000);
					}
					$(".content").text(content);
					$(".mrname").text("--" + mrname);
				}
			});
	    }

})
























