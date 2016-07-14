

//JS事件委托
window.onload = function(){

	//开局入场特效

	var body = document.getElementsByTagName("body");
			console.log(body);
	var oPlay = document.getElementById("playground");
	var oBtnStart = document.getElementById("btn-start");
	var chooseDifficult = document.getElementById("difficult");
	var easyBtn = document.getElementById("easy");
	var normalBtn = document.getElementById("normal");
	var hardBtn = document.getElementById("hard");
	var heart = document.getElementById("heart");
	var toggleHeart = document.getElementById("toggle");
	var confirm = document.querySelector(".confirm");
	var confirmBtn = document.querySelector(".btn-confirm");
	var confirmP = confirm.getElementsByTagName("p");
	console.log(confirmP);

	confirmBtn.onclick = function() {
		console.log(1);
		if(confirmBtn.innerText == "关闭") {
			addClass(confirm,"hide");
			removeClass(heart,"hide");
			body[0].style.background = "#000";
			setTimeout(function(){
				toggle.checked = true;
			}, 1000)	
		}
		confirmP[0].innerText = "嗒哒～";
		confirmBtn.innerText = "关闭";

	}

	function showPlay(dif) {

		addClass(oPlay,"active");

		play(dif);

		chooseDifficult.style.display = "none";
	}

	oBtnStart.onclick = function(){

		addClass(chooseDifficult,"active");

		this.style.display = "none";
	}

	easyBtn.onclick = function() {

		showPlay(10);
		
	}

	normalBtn.onclick = function() {


		showPlay(25);

	}

	hardBtn.onclick = function() {

		showPlay(40);

	}

	function play(difficult) {
		var grid = [
		[1,2,3,4,5,6,7,8,9],
		[4,5,6,7,8,9,1,2,3],
		[7,8,9,1,2,3,4,5,6],
		[2,3,4,5,6,7,8,9,1],
		[5,6,7,8,9,1,2,3,4],
		[8,9,1,2,3,4,5,6,7],
		[3,4,5,6,7,8,9,1,2],
		[6,7,8,9,1,2,3,4,5],
		[9,1,2,3,4,5,6,7,8],
		]

		var tds = document.getElementsByTagName("td");


		//遍历table中的td
		var findTd = function(x,y){
			for(var i = 0; i < 81; i++){
				if(tds[i].parentElement.rowIndex == x && tds[i].cellIndex == y){
					return tds[i];
				}
			}
		}

		//给网格填上初始数字
		for(var i = 0; i < 9; i++){
			for(var j = 0; j < 9; j++){
				findTd(i,j).innerHTML = grid[i][j];
			}
		}

		var tdNum = [];

		//给网格数字随机排序

			//横向随机排序

		var xSort = function(){
			var num = 0 ,xList = [], list = [] ,result = [] ,xResult = [] ,xFinal = [];

			for(var i = 0; i < 81; i++){
				tdNum.push(tds[i].innerHTML)
			}

			for(var i = 0; i < 9; i++){
				for(var j = 0; j < 9; j++){
					if((j+10)%9 == 0){
						xList.push(tdNum[i*9+j]);
						list.push(xList);
						xList = [];
						continue;
					}
					xList.push(tdNum[i*9+j]);
				}

			}

			for(var i = 0; i < 9; i++){
				if((i+4)%3 == 0){
					result.push(list[i]);
					xResult.push(result);
					result = [];
					continue;
				}
				result.push(list[i]);
			}

			for(var i = 0; i < 3; i++){
				xResult[i].sort(function(a,b){return Math.random()>.5?-1:1;});
			}

			for(var i = 0; i < 3; i++){
				for(var j = 0; j < 3; j++){
					xFinal.push(xResult[i][j]);
				}
			}

			for(var i = 0; i < 9; i++){
				for(var j = 0; j < 9; j++){
					tds[i*9+j].innerHTML = xFinal[i][j];
				}
			}
		}
		
		xSort();

			//纵向随机排序

		var ySort = function(){
			var num = 0 ,yList = [], list = [] ,result = [] ,yResult = [] ,yFinal = [];

			for(var i = 0; i < 9; i++){
				for(var j = 0; j < 9; j++){
					if((j+10)%9 == 0){
						yList.push(findTd(j,i).innerHTML);
						list.push(yList);
						yList = [];
						continue;
					}
					yList.push(findTd(j,i).innerHTML);
				}
			}

			for(var i = 0; i < 9; i++){
				if((i+4)%3 == 0){
					result.push(list[i]);
					yResult.push(result);
					result = [];
					continue;
				}
				result.push(list[i]);
			}

			for(var i = 0; i < 3; i++){
				yResult[i].sort(function(a,b){return Math.random()>.5?-1:1;});
			}

			for(var i = 0; i < 3; i++){
				for(var j = 0; j < 3; j++){
					yFinal.push(yResult[i][j]);
				}
			}

			for(var i = 0; i < 9; i++){
				for(var j = 0; j < 9; j++){
					tds[i*9+j].innerHTML = yFinal[j][i];
				}
			}
		}

		ySort();

		//随机删除表格数字

		var stage = document.getElementById("stage");
		var tdsUp = stage.getElementsByTagName("td");

		function getRandom(opt) {
		    var old_arry = opt.arry;
		        range = opt.range;
		    //防止超过数组的长度
		    range = range > old_arry.length?old_arry.length:range;
		    var newArray = [].concat(old_arry), //拷贝原数组进行操作就不会破坏原数组
		        valArray = [];
		    for (var n = 0; n < range; n++) {
		        var r = Math.floor(Math.random() * (newArray.length));
		        valArray.push(newArray[r]);
		        //在原数组删掉，然后在下轮循环中就可以避免重复获取
		        newArray.splice(r, 1);
		    }
		    return valArray;
		}

		var blankIndex = [];
		for(var i = 0; i < 81; i++){
			blankIndex.push(i);
		}

		var new_val = getRandom({'arry':blankIndex,'range':difficult});

		for(var i in new_val){
			num = new_val[i];
			addClass(tdsUp[num],"blank");
		}

		var blank = document.getElementsByClassName("blank");
		var keyboard = document.getElementById("keyboard");
		var tdboard = keyboard.getElementsByTagName("td");

	    //关闭数字键盘功能
		document.addEventListener("click",function(ev){
			var op = getComputedStyle(keyboard,null).opacity;   //用getComputedStyle(obj,null)获取元素外部样式表属性
			if(ev.target.nodeName == "DIV"){
				removeClass(keyboard,"active");
			}
			if(op == 1){
				console.log(1);
				if(ev.target.parentElement.parentElement.parentElement){
					if(ev.target.parentElement.parentElement.parentElement.id == "stage"){
						removeClass(keyboard,"active");
					}
				}else{
					return;
				}
			}
		});

		//判断结果功能

		var judge = function(){
			var isRight = true;
			// console.log(isRight);
			for(var a = 0; a < blank.length; a++){
				var present = blank[a];
				var x = present.parentElement.rowIndex;
				var y = present.cellIndex;
				if(present.innerHTML == findTd(x,y).innerHTML){
					isRight = true;
				}else{
					isRight = false;
					return isRight;
				}
			}
			return isRight;
		}

		//填写数字功能
		for(var i in blank){
			blank[i].onclick = function(){
				var now = this;
				var x = now.parentElement.rowIndex;
				var y = now.cellIndex;
				if(!hasClass(keyboard,"active")){
					addClass(keyboard,"active");
					for(var j in tdboard){
						tdboard[j].onclick = function(){

							if(this.innerHTML == ""){   //空格键功能
								now.innerHTML = "";
								removeClass(keyboard,"active");
								if(hasClass(now,"wrong")){
									removeClass(now,"wrong");
								}
								return;
							}else{   					//数字键功能
								now.innerHTML = this.innerHTML;
								removeClass(keyboard,"active");
								var z = findTd(x,y).innerHTML;
								console.log(z);
								if(now.innerHTML == z && !now.innerHTML == ""){
									removeClass(now,"wrong");

								}else{
									if(!hasClass(now,"wrong")){
										addClass(now,"wrong");
									}
								}

								//判断结果
								var win = judge();
								console.log(win);
								if(judge()){
									alert("恭喜你，过关了！");
									removeClass(oPlay,"active");
									addClass(oPlay,"hide");
									removeClass(confirm,"hide");
									// location.reload();
								}
							}
						}
					}
				}
			}
		}
	}
}