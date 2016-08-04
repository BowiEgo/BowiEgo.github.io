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



//设置日期
var now = new Date();
var nowObject = new DayObject(now);
var nowYear = nowObject.year;
var nowMonth = nowObject.month;
var nowDay = nowObject.day;
var nowDate = nowObject.date;
var nowMonthName = getMonthName(nowMonth);
var nowDayName = getDayName(nowDay);
var oDays = document.getElementById("days").children;
var oMonth = document.getElementById("month").children[0];
var oYear = document.getElementById("month").children[1];
var oCalendar = document.getElementById("calendar");
var oNote = document.getElementById("note");
var curMonth = nowMonth;
var curYear = nowYear;
var dataArr = [];

//定义日期对象
function DayObject(time) {
	var o = new Object();
	o.year = time.getFullYear();
	o.month = time.getMonth();
	o.date = time.getDate();
	o.day = time.getDay();
	return o;
}
//定义日期数据对象
function DateObject(year,month,date,text,edited) {
	var o = new Object();
	o.year = year;
	o.month = month;
	o.date = date;
	o.text = text;
	o.edited = edited;
	return o;
}

function getMonthName(month) {
	var arrMonth = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
	return arrMonth[month];
}

function getDayName(day) {
	var arrDay = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
	return arrDay[day];
}

function getFirstDay(year, month) {
	return new Date(year, month, 1);
}

function getLastDay(year, month) {
	var newYear = year;
	var newMonth = month + 1;
	if(month > 12) {
		newMonth -= 12;
		newYear ++;
	}

	var newDate = new Date(newYear, newMonth, 1);
	var lastDayTime = new Date(newDate.getTime() - 1000*60*60*24);
	
	return lastDayTime;
}

function toggleExpand() {
	var oInput = document.querySelector(".note-input");

	if(hasClass(oCalendar,"active")) {
			removeClass(oCalendar,"active");
			removeClass(oNote,"active");
	}else{
		oInput.focus();  //输入框默认获取焦点
		addClass(oCalendar,"active");
		addClass(oNote,"active");
	}
}

function dateClick() {
	for(var i = 0; i < oDays.length; i++) {
		oDays[i].onclick = function() {

			var noteText = document.querySelector(".note-text");
			var oP = this.getElementsByTagName("p")[0];
				if(hasClass(oP,"select")) {
					toggleExpand();
				}else{
					if(hasClass(oCalendar,"active")) {
						noteText.innerText = "";
						removeClass(oCalendar,"active");
						removeClass(oNote,"active");
						setTimeout(function() {
							toggleExpand();
							for(var i = 0; i < dataArr.length; i++) {
								if(dataArr[i].year == curYear && dataArr[i].month == curMonth && dataArr[i].date == oP.innerText) {
									noteText.innerText = dataArr[i].text;
								}
							}
						},400);
					}else{
						toggleExpand();
						for(var i = 0; i < dataArr.length; i++) {
							if(dataArr[i].year == curYear && dataArr[i].month == curMonth && dataArr[i].date == oP.innerText) {
								noteText.innerText = dataArr[i].text;
							}
						}
					}
				}

			for(var j = 0; j < oDays.length; j++) {
				removeClass(oDays[j].getElementsByTagName("p")[0],"select");
			}
			if(!hasClass(this,"now")){
				addClass(oP,"select");
			}
		}
	}
}

function clearDatePos() {
	for(var i = oDays.length-1;i>=0;i--) {
		var o = oDays[i].parentNode;
		o.removeChild(oDays[i]);
	}	

	for(var i = 0; i < 42; i++) {
		var oDiv = document.createElement("div");
		var oP = document.createElement("p")
		oDiv.className = "day";
		oDiv.appendChild(oP);
		document.getElementById("days").appendChild(oDiv);
	}

	dateClick();
}


function setDatePos(year, month) {
	var lastDayObject = new DayObject(getLastDay(year, month));
	var lastDate = lastDayObject.date;
	var firstDayObject = new DayObject(getFirstDay(year, month));
	var firstDay = firstDayObject.day;
	var oDiv = document.createElement("div");
	var oHide = document.getElementsByClassName("hide");
	oDiv.className = "day";

	if(firstDay === 0) {
		firstDay = 7;
	}

	for(var i = 1; i <= lastDate; i++) {
		oDays[i + firstDay - 2].getElementsByTagName("p")[0].innerText = i;
		addClass(oDays[i + firstDay - 2],"show");
		var od = new DateObject(curYear,curMonth,i,"",true);
		for(var j = 0; j < dataArr.length; j++) {
			if(dataArr[j].year == od.year && dataArr[j].month == od.month && dataArr[j].date == od.date && dataArr[j].edited == true) {
				addClass(oDays[i + firstDay - 2].getElementsByTagName("p")[0],"edited");
			}
		}
	}

	nowDayHighLight();
}

function nowDayHighLight() {
	for(i = 0; i < oDays.length; i++) {
		if(oDays[i].innerText == nowDate && curMonth == nowMonth && curYear == nowYear) {
			addClass(oDays[i],"now");
		}else if(hasClass(oDays[i]),"now") {
			removeClass(oDays[i],"now");
		}
	}
}



window.onload = function() {
	setDatePos(nowYear, nowMonth);
	oMonth.innerText = getMonthName(nowMonth);
	oYear.innerText = nowYear;


	dateClick(); //日期按钮功能

	//月份切换按钮功能
	var lastMtBtn = document.getElementById("lastMt");
	var nextMtBtn = document.getElementById("nextMt");

	lastMtBtn.onclick = function() {
		curMonth --;
		if(curMonth < 0) {
			curYear --;
			curMonth += 12;
		}
		clearDatePos();
		setTimeout(function(){
			setDatePos(curYear, curMonth);
		},10);
		oMonth.innerText = getMonthName(curMonth);
		oYear.innerText = curYear;
		removeClass(oCalendar,"active");
		removeClass(oNote,"active");
	}

	nextMtBtn.onclick = function() {
		curMonth ++;
		if(curMonth > 11) {
			curYear ++;
			curMonth -= 12;
		}
		clearDatePos();
		setTimeout(function(){
			setDatePos(curYear, curMonth);
		},10);
		oMonth.innerText = getMonthName(curMonth);
		oYear.innerText = curYear;
		removeClass(oCalendar,"active");
		removeClass(oNote,"active");
	}

	var closeNote = document.querySelector(".close-note");
	closeNote.onclick = function() {
		removeClass(oCalendar,"active");
		removeClass(oNote,"active");
	}

	var noteSub = document.querySelector(".note-submit");
	noteSub.onclick = function() {
		var noteText = document.querySelector(".note-text");
		var text = document.querySelector(".note-input").value;

		var dateActive = document.querySelector(".select");
		var dataDate = new DateObject(curYear,curMonth,dateActive.innerText,text,true);
		var flag = true;
		for(var i = 0; i < dataArr.length; i++) {
			if(dataArr[i].year == dataDate.year && dataArr[i].month == dataDate.month && dataArr[i].date == dataDate.date) {
				dataArr.splice(i,1);
			}
		}
		if(text != "") {
			addClass(dateActive,"edited")
		}else{
			removeClass(dateActive,"edited");
			dataDate.edited = false;
		}
		dataArr.push(dataDate);
		noteText.innerText = text;
		document.querySelector(".note-input").value = "";
	}


}