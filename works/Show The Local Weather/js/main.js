
// window.onload = makeRequest("http://api.map.baidu.com/location/ip?ak=OEs8h623LY7lhguNGGNqDaOR6oMDRvs2");



// function makeRequest(url) {

// 	if (window.XMLHttpRequest) {
// 		xhr = new XMLHttpRequest();
// 	}
// 	else {
// 		if (window.ActiveXObject) {
// 			try {
// 				xhr = new ActiveXObject("Microsoft.XMLHttp");
// 			}
// 			catch (e) {

// 			}
// 		}
// 	}

// 	if (xhr) {
// 		xhr.addEventListener("readystatechange", getLocation, false);
// 		xhr.open("GET", url, true);
// 		xhr.send(null);
// 		// xhr.setRequestHeader("dataType", "JSONP");
// 		// xhr.setRequestHeader('Access-Control-Allow-Origin',"*"); 
// 	}
// }

// function getLocation() {
// 	var location = "";

// 	if(xhr.readyState == 4) {
// 		if(xhr.status == 200) {
// 			console.log(1);	
// 			location = eval("("+xhr.responseText+")");
// 			console.log(location);
// 		}
// 	}
// }


$(document).ready(function(){

	// getLocation();
	getWeather("无锡");

	// switch (weather) {
	// 	case ("晴"):
	// 		$(".icon-weather i").class("pe-7w-sun pe-lg pe-va");
	// 		break;
	// 	case ("雷阵雨"):
	// 		$(".icon-weather i").class("pe-7w-rain-alt pe-lg pe-va");
	// 		break;
	// }
	function getWeather(myLoc) {

		$.ajax({
			type: "GET",
			// dataType: "JSON",
			// async: false;
			url: "http://apis.baidu.com/thinkpage/weather_api/currentweather?location="+myLoc,
			beforeSend: function(request) {
				request.setRequestHeader("apikey","488c586c7bc2e5794aecf0ba4fe4d66b");
				// request.setRequestHeader("location","beijing");
			},
			success: function(data) {
				var a = data.results[0].now;
				var weather = a.text;
				var temp = a.temperature;
				console.log(a);
				console.log(weather);
				console.log(temp);
				$(".location").text("当前城市：  "+myLoc);
				$(".temperature").text(temp+'℃');
				$(".weather").text(weather);

				switch (weather) {
					case ("晴"):
						$(".icon-weather i").attr("class","pe-7w-sun pe-lg pe-va");
						break;
					case ("雷阵雨"):
						$(".icon-weather i").attr("class","pe-7w-lightning-rain pe-lg pe-va");
						break;
					case ("多云"):
						$(".icon-weather i").attr("class","pe-7w-cloud pe-lg pe-va");
						break;
				}

				if(temp >= 29) {
					$(".icon-temp i").attr("class","pe-7w-thermometer-full pe-lg pe-va");	
				}
				else if(temp >= 19 && temp < 29) {
					$(".icon-temp i").attr("class","pe-7w-thermometer-3-4 pe-lg pe-va");
				}
				else if(temp >= 9 && temp < 19) {
					$(".icon-temp i").attr("class","pe-7w-thermometer-1-2 pe-lg pe-va");
				}
				else if(temp >= 0 && temp < 9) {
					$(".icon-temp i").attr("class","pe-7w-thermometer-0 pe-lg pe-va");
				}
			}
		});
	}



	function getLocation() {
		$.ajax({
			type: "GET",
			dataType: "JSONP",
			url: "http://api.map.baidu.com/location/ip?ak=OEs8h623LY7lhguNGGNqDaOR6oMDRvs2",
			success: function(json) {
				var loc = json.content.address_detail.city;
				var array = loc.split("");
				array.pop();
				loc = array.join("");
				console.log(array);
				console.log(typeof(loc));
				console.log(loc);
				getWeather("无锡");
			}
		// });
		// 	var j;
		// 	$.getJSON("http://api.map.baidu.com/location/ip?ak=OEs8h623LY7lhguNGGNqDaOR6oMDRvs2", function(json) {
		// 		 j = JSON.stringify(json);
		// 		console.log(j);
		// 	})
		// 	return j;
		// }
		// var content;
		// var adress;
		// var x_point = "";
		// var y_point = "";
		// console.log(getLocation());
		// loc = getLocation();
		});
	}
});
	






