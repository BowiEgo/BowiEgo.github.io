//定义常用function	
function hasClass(ele,cls) { 
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); 
} 

function addClass(ele,cls) { 
	if (!hasClass(ele,cls)) {
		ele.className += " "+cls;
	}
} 

function removeClass(ele,cls) { 
	if (hasClass(ele,cls)) { 
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)'); 
		ele.className=ele.className.replace(reg,' '); 
	} 
} 

function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
}  

Object.prototype.indexOf = function(e) {
	var n;
	for(var i = 0; i < this.length; i++) {
		if(this[i] == e) {
			n = i;
		}
	}
	return n;
}

window.onscroll = function() {
	var scrollTop = document.body.scrollTop;
	var oNav = document.querySelector(".top-nav");

	if(scrollTop > 280) {
		addClass(oNav,"show");
	}else{
		removeClass(oNav,"show");
	}
}

window.onload = function() {
	var oLoading = document.querySelector(".loading");
	setTimeout(function() {
		addClass(oLoading, "hide");
	},1000);
	
	//导航条按钮
	var navBtn = document.querySelector(".nav-btn");
	var navContact = document.querySelector(".nav-contact");
	var oNav = document.querySelector(".top-nav");
	navBtn.onclick = function() {
		toggleClass(navContact, "active");
		if(hasClass(navContact, "active")) {
			oNav.style.boxShadow = "none";
		}else{
			oNav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
		}
	}

	//标签切换
	var oTabContent = document.getElementsByClassName("tab-content");
	var tabs = document.querySelector(".tablist").getElementsByTagName("a");
	for(var n = 0; n < tabs.length; n++) {
		tabs[n].onclick = function() {
			for(var j = 0; j < tabs.length; j++) {
				removeClass(tabs[j],'active');
			}
			toggleClass(this,"active");
			var index = tabs.indexOf(this);
			for(var i = 0; i < oTabContent.length; i++) {
				if(i == index) {
					addClass(oTabContent[i],"show");
				}else{
					removeClass(oTabContent[i],"show");	
				}
			}

			if(tabs.indexOf(this) == 1) {
				//轮播图
				var btnL = document.querySelector(".btn-l"),
					btnR = document.querySelector(".btn-r"),
					imgList = document.querySelector(".img-container").getElementsByTagName("ul")[0],
					imgClone = clone(imgList.getElementsByTagName("li"));
				var oDot = document.querySelector(".dot").getElementsByTagName("li");
				var imgWid = imgList.getElementsByTagName("li")[0].offsetWidth;
				console.log(imgWid);

				var n = 0;
				var len = document.querySelector(".img-container").getElementsByTagName("li").length;

				for(var i = 0; i < oDot.length; i++) {
					oDot[i].onclick = function() {
						n = oDot.indexOf(this);
						imgList.style.left = -(imgWid+20)*n + "px";
						for(var i = 0; i < oDot.length; i++) {
							removeClass(oDot[i],"active");
							if(i == n) {
								addClass(oDot[i],"active");
							}
						}
					}
				}

				btnR.onclick = function() {
					n++;
					if(n >= len) {
						n = 0;
					}
					imgList.style.left = -(imgWid+20)*n + "px";
					for(var i = 0; i < oDot.length; i++) {
						removeClass(oDot[i],"active");
						if(i == n) {
							addClass(oDot[i],"active");
						}
					}
				}

				btnL.onclick = function() {
					n--;
					if(n <= -1) {
						n = len - 1;
					}
					imgList.style.left = -(imgWid+20)*n + "px";
					for(var i = 0; i < oDot.length; i++) {
						removeClass(oDot[i],"active");
						if(i == n) {
							addClass(oDot[i],"active");
						}
					}
				}

			}


			if(tabs.indexOf(this) == 2 && window.innerWidth > 400) {

				//瀑布流
				var oFavourite = document.querySelector(".favourite");
				var imgFavourite = oFavourite.getElementsByClassName("fav-img");
				var wid = oFavourite.offsetWidth;
				console.log(wid);
				var heightArr = [];
				var minHeight, minIndex;

				for(var i = 0; i < 2; i++) {
					heightArr.push(imgFavourite[i].offsetHeight);
					imgFavourite[i].style.left = wid/2.5*i + "px";
				}
				minHeight = Math.min.apply(null, heightArr);
				minIndex = heightArr.indexOf(minHeight);

				for(var i = 2; i < imgFavourite.length; i++) {
					imgFavourite[i].style.left = wid/2.5*minIndex + "px";
					imgFavourite[i].style.top = minHeight + parseInt(i/2)*20 + "px";
					heightArr[minIndex] = minHeight + imgFavourite[i].offsetHeight;
					minHeight = Math.min.apply(null, heightArr);
					minIndex = heightArr.indexOf(minHeight);
				}
			}
		}
	}
	
}







