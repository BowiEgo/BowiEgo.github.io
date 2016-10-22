/*公用函数*/

/*将字符串首字母大写*/
function ucfirst(str) {
	var str = str.toLowerCase();
	var strArr = str.split(' ');
	var result = '';
	for(var i = 0; i < strArr.length; i++) {
		result += (strArr[i].substring(0,1).toUpperCase() + strArr[i].substring(1) + ''); 
	}
	return result;
} 