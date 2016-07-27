window.onload = function() {
	var btn = document.querySelectorAll(".btn-default");
	var btnOperator = document.querySelectorAll(".btn-operator");
	var btnNum = document.querySelectorAll(".btn-num");
	var btnEqual = document.getElementById("btn-equal");
	var btnAC = document.getElementById("btn-AC");
	var btnCE = document.getElementById("btn-CE");
	var btnDot = document.getElementById("btn-dot");
	var display = document.querySelector(".display");

	var result = 0;
	var arr = [];
	var flag = false;

	for(i in btnNum) {
		btnNum[i].onclick = function() {
			if(flag) {
				arr[arr.length - 1] = parseInt(this.innerText);
				display.innerText = this.innerText;
				flag = false;
			}else{
				display.innerText += this.innerText;
				if(!isNaN(arr[arr.length - 1])) {
					arr[arr.length - 1] = arr[arr.length - 1]*10 + parseInt(this.innerText);
				}else{
					arr.push(parseInt(this.innerText));	
				}
			}
			console.log(arr);
		}
	}

	for(i in btnOperator) {
		btnOperator[i].onclick = function() {

			if(arr.length > 0 && !isNaN(arr[arr.length - 1])) {
				display.innerText += this.innerText;
				arr.push(this.innerText);
				console.log(arr);
			}else{
				arr.pop();
				arr.push(this.innerText);
				display.innerText = arr.join("");
				console.log(arr);
			}
		}
	}

	btnAC.onclick = function() {
		arr = [];
		display.innerText = "";
		flag = false;
	}

	btnCE.onclick = function() {
		if(!isNaN(arr[arr.length - 1])) {
			arr.pop();
			display.innerText = arr.join("");
		}
			console.log(arr);
	}

	btnDot.onclick = function() {
		arr.push(this.innerText);
		display.innerText += this.innerText;
		console.log(arr);
	}

	btnEqual.onclick = function() {	
		flag = true;
		console.log(flag);
		result = eval(display.innerText);
		display.innerText = result;
		arr = [];
		arr.push(result);
		console.log(arr);
	}
}