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

function clone(item) {  
    if (!item) { return item; } // null, undefined values check  
  
    var types = [ Number, String, Boolean ],   
        result;  
  
    // normalizing primitives if someone did new String('aaa'), or new Number('444');     
    //一些通过new方式建立的东东可能会类型发生变化，我们在这里要做一下正常化处理  
    //比如new String('aaa'), or new Number('444')  
    types.forEach(function(type) {  
        if (item instanceof type) {  
            result = type( item );  
        }  
    });  
  
    if (typeof result == "undefined") {  
        if (Object.prototype.toString.call( item ) === "[object Array]") {  
            result = [];  
            item.forEach(function(child, index, array) {   
                result[index] = clone( child );  
            });  
        } else if (typeof item == "object") {  
            // testign that this is DOM  
            //如果是dom对象，那么用自带的cloneNode处理  
            if (item.nodeType && typeof item.cloneNode == "function") {  
                var result = item.cloneNode( true );      
            } else if (!item.prototype) { // check that this is a literal  
                // it is an object literal        
            //如果是个对象迭代的话，我们可以用for in 迭代来赋值  
                result = {};  
                for (var i in item) {  
                    result[i] = clone( item[i] );  
                }  
            } else {  
                // depending what you would like here,  
                // just keep the reference, or create new object  
                //这里解决的是带构造函数的情况，这里要看你想怎么复制了，深得话，去掉那个false && ，浅的话，维持原有的引用，                  
                //但是我不建议你去new一个构造函数来进行深复制，具体原因下面会解释  
                if (false && item.constructor) {  
                    // would not advice to do that, reason? Read below  
                //朕不建议你去new它的构造函数  
                    result = new item.constructor();  
                } else {  
                    result = item;  
                }  
            }  
        } else {  
            result = item;  
        }  
    }  
  
    return result;  
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
		}
	}




	//轮播图
	var btnL = document.querySelector(".btn-l"),
		btnR = document.querySelector(".btn-r"),
		imgList = document.querySelector(".img-container").getElementsByTagName("ul")[0],
		imgClone = clone(imgList.getElementsByTagName("li"));
	var oDot = document.querySelector(".dot").getElementsByTagName("li");

	var n = 0;
	var len = document.querySelector(".img-container").getElementsByTagName("li").length;
	console.log(len);

	for(var i = 0; i < oDot.length; i++) {
		oDot[i].onclick = function() {
			n = oDot.indexOf(this);
			imgList.style.left = -420*n + "px";
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
		imgList.style.left = -420*n + "px";
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
			n = 2;
		}
		imgList.style.left = -420*n + "px";
		for(var i = 0; i < oDot.length; i++) {
			removeClass(oDot[i],"active");
			if(i == n) {
				addClass(oDot[i],"active");
			}
		}
	}

	
}







