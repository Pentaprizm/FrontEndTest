

$("#sendReq").bind("click", function () {
    $("#sendReq").addClass("hidden");
    $(".btn-wrapper").append("<img src='img/ajax-loader.gif'>");
    $.ajax({
        type: 'get',
        url: 'http://www.json-generator.com/api/json/get/bUsRkvEmHm?indent=2',
        dataType: 'json',
        success: function (arr) {
		    $(".btn-wrapper").remove();
            renderReq(arr);
        }
    });
});

function renderReq(arr) {

		$(".heading-form").removeClass("hidden");
	    $("#selectall, #selectclear").removeClass("hidden");
		$("#submit").removeClass("hidden");
    if (arr.length > 0) {
        var i = 0;
        for (property in arr[0]) {
            var html = '<li><input type="checkbox" id="' + property + '"><label for="' + property + '">' + property + '</label></li>'; 
            $('#sel-wrap-' + i++ % 2 + ' ul').append(html); //может можно как-то переписать этот селектор?
        }
    }
};


$("#selectall").bind("click", function(event){
	event.preventDefault();
	$("[type='checkbox']").prop("checked", true);
});

$("#selectclear").bind("click", function(event){
	event.preventDefault();
	$("[type='checkbox']").prop("checked", false);
});


$("#submit").bind("click", function(event){
	event.preventDefault();
	$("#data-wrapper").empty();
	var template = $("#template").html();
	var rendered = Mustache.render(template, {
	"names": [
    { "name": "Moe" },
    { "name": "Larry" },
    { "name": "Curly" },
	{ "name": "Moe" },
    { "name": "Larry" },
    { "name": "Curly" },
	{ "name": "Moe" },
    { "name": "Larry" },
    { "name": "Curly" },
	{ "name": "Moe" },
    { "name": "Larry" },
    { "name": "Curly" }
  ]
});
	$("#data-wrapper").html(rendered);
});

