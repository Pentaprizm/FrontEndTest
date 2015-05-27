$("#sendReq").bind("click", function(){$("#sendReq").addClass("hidden");
	$(".btn-wrapper").append("<img src='img/ajax-loader.gif'>");});
	
	
function reqListener() {
  var data = JSON.parse(this.responseText);    
}

var oReq = new XMLHttpRequest();  
oReq.onload = reqListener;
oReq.open('GET', 'http://www.json-generator.com/api/json/get/bUsRkvEmHm?indent=2', true);
oReq.send();