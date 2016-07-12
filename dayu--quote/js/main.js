
$(document).ready(function() {
	var data = [{
        "id": "1",  //ID
        "content": "我记得他的样子，我不知道他的名字。",
        "mrname": "椿"  //来源
	},
    {
        "id": "2",  //ID
        "content": "怕你飞远去，怕你离我而去，更怕你永远停留在这里；每一滴泪水，都向你流淌去，倒流回最初的相遇。",
        "mrname": ""  //来源
    },
    {
        "id": "3",  //ID
        "content": "有的鱼是永远都关不住的，因为他们属于天空。",
        "mrname": ""  //来源
    },
    {
        "id": "4",  //ID
        "content": "我会化作人间的风雨，永远陪伴在你身边。",
        "mrname": "湫"  //来源
    },
    {
        "id": "5",  //ID
        "content": "有的鱼是永远都关不住的，因为他们属于天空。",
        "mrname": ""  //来源
    },
    {
        "id": "6",  //ID
        "content": "只要你的心是善良的，对错都是别人的事。",
        "mrname": ""  //来源
    },
    {
        "id": "",  //ID
        "content": "世界上每一个活着的人都是海里活着的一条大鱼，人生就是航越大海。",
        "mrname": ""  //来源
    },
    {
        "id": "7",  //ID
        "content": "这个世界上我最害怕的就是让你受苦。",
        "mrname": ""  //来源
    },
    {
        "id": "8",  //ID
        "content": "总有一天，我将在另一个世界的晨光里对你歌唱。在地球的光里，在人类的爱里，我曾经见过你",
        "mrname": ""  //来源
    },
    {
        "id": "9",  //ID
        "content": "北冥有鱼，其名为鲲。鲲之大，不知其几千里也。",
        "mrname": ""  //来源
    },
    {
        "id": "10",  //ID
        "content": "我们会重聚的，无论变成什么模样，我们互相都会认得出来。",
        "mrname": ""  //来源
    },
    {
        "id": "11",  //ID
        "content": "守望轮回，爱苦别离。生命轮回，本就是一场奇迹。爱一个人，攀一座山，追一个梦，不妨大胆一些。",
        "mrname": ""  //来源
    },
    {
        "id": "12",  //ID
        "content": "这个世界所谓的真理是“我相信”，因为没有永恒的正义。",
        "mrname": ""  //来源
    }];




  	var color = ['#ff5722', '#ff9800', '#4caf50', '#009688', '#006bbf', '#3f51b5', '#673ab7', '#e91e63', '#f44336'];
	var curNum = 0;  	

  	changeColor();	
  	showQuote();

	$("#btn").click(function() {
		if(!$("#quote").is(":animated")) {
			changeColor();
			// if(!$("#quote").is(":animated")) {
				// showQuote();
			// }
		}
			// $("#quote").animate({
   // 				opacity: 1	
   // 			},1000);
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
	    	opacity: 1
	    },1000, showQuote());



	    $(".share-icon").css({
	      "color": color[curNum]
	    });
	}

	function showQuote() {
    	// var n = randomNum(12);
    	// console.log(curNum);

		var curRandom = 0;

		var random = Math.floor(Math.random()*11) + 1;

		if(random == curRandom) {
			if(random-1 > 0) {
				random -= 1;
			} else {
				random += 1;
			}
		}
		curRandom = random;

		var content = data[curRandom].content;

		$("body").css({
			"background": "url(http://o9kkuebr4.bkt.clouddn.com/blog/dayu" + curRandom + ".jpg) no-repeat",
			"background-size": "cover"
		})

		if(!$("#quote").is(":animated")){
			console.log(99);
   			$("#quote").animate({
   				opacity: 0	
   			},100, function(){
				$(".content").text(content);
   			});
		}

		console.log(content);
	};

	// console.log(data[1].content);
});


// var encoded = JSONObject.toJ 























