$("#sendReq").bind("click", function () {
    $.ajax({
        type: 'get',
        url: 'http://www.json-generator.com/api/json/get/bUsRkvEmHm?indent=2',
        dataType: 'json',
		beforeSend: function(){    
			$("#sendReq").addClass("hidden");
			$(".btn-wrapper").append("<img src='img/ajax-loader.gif'>");
			},
        success: function (arr){
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
	/*	var ids = $("input:checked").map(function(){(this.id==undefined) ? null : this.id;}).get();
			alert(ids[0]);
	$("#data-wrapper").empty(); */
	var data = {
	"names": [
    { "name": "Moe" },
    { "name": "Larry" },
    { "name": "Curly" },
	{ "name": "Joe" },
    { "name": "Mike" },
    { "name": "Pete" },
	{ "name": "Po" },
    { "name": "Lars" },
    { "name": "Kate" },
	{ "name": "Mic" },
    { "name": "Carl" },
    { "name": "Sully" }
  ],
  "titles": [
    { "title": "1" },
    { "title": "2" },
    { "title": "3" },
	{ "title": "4" },
    { "title": "5" },
    { "title": "6" },
	{ "title": "7" },
    { "title": "8" },
    { "title": "9" },
	{ "title": "10" },
    { "title": "11" },
    { "title": "12" }
  
  ]
};

	var template = $("#template").html();
	var rendered = Mustache.render(template, data);
	$("#data-wrapper").html(rendered);
});

