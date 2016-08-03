
function addClass(obj, cls) {
    obj.className += " " + cls;
}

function hasClass(ele,cls) { 
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')); 
} 
	
function removeClass(ele,cls) { 
	if (hasClass(ele,cls)) { 
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)'); 
		ele.className=ele.className.replace(reg,' '); 
	} 
} 



