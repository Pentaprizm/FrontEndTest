	$("#sendReq").bind("click", sendReq);
	
    $("#submit").bind("click", function(event){
        event.preventDefault();
		var check = checkboxScan();
			if (check.length > 0){renderTable(check);}
			else {
				alert("Выберите хотя бы один пункт списка!");
			};
    });
	
    $("#selectall").bind("click", function(event){
        event.preventDefault();
        $("[type='checkbox']").prop("checked", true);
    });

    $("#selectclear").bind("click", function(event){
        event.preventDefault();
        $("[type='checkbox']").prop("checked", false);
    });

    $('#back-btn').bind("click", function(event){
        event.preventDefault();
        $("#table-wrapper").toggleClass("hidden");
        $("#data-wrapper").toggleClass("hidden");
        $("#result-heading").toggleClass("hidden");
        renderReq();
    });

    function sendReq(){
        $.ajax({
            type: 'get',
            url: 'http://www.json-generator.com/api/json/get/bUsRkvEmHm?indent=2',
            dataType: 'json',
            beforeSend: function () {
                $("#sendReq").toggleClass("hidden");
                $(".btn-wrapper").append("<img src='img/ajax-loader.gif'>");
            },
            success: function (arr) {
                $(".btn-wrapper").remove();
                window.requestedData = arr;
                renderReq();
            }
        });
    }

    function renderReq(){
        $(".heading-form").toggleClass("hidden");
        $("#selectall, #selectclear").toggleClass("hidden");
        $("#submit").toggleClass("hidden");
        if (window.requestedData.length > 0){
            var i = 0;
            for (property in window.requestedData[0]){
                var html = '<li><input type="checkbox" id="' + property + '"><label for="' + property + '">' + property + '</label></li>';
                $('#sel-wrap-' + i++ % 2 + ' ul').append(html);
            };
        };
    };

	function checkboxScan(){
    var checkedElements = $("[type='checkbox']:checked");
    var checkedProperties = [];
    $(checkedElements).each(function(){
     checkedProperties.push($(this).attr('id'));
    });
		return checkedProperties;
	};
	
    function renderTable(checkedProperties){
        $("#data-wrapper").toggleClass("hidden");
        $("#result-heading").toggleClass("hidden");
        $("#table-wrapper").toggleClass("hidden");
        $("#submit, #selectall, #selectclear, .heading-form").toggleClass("hidden");
        var data = {
            "properties": checkedProperties,
            "persons": reArrangeData(checkedProperties)
        };
        var template = $("#template").html();
        var rendered = Mustache.render(template, data);
        $(".data-select").empty();
        $('#table-wrapper').html(rendered);
    };

    function reArrangeData(checkedProperties){
        var content = [];
        $(window.requestedData).each(function (){
            var person = {data: []};
            for (var i = 0, l = checkedProperties.length; i < l; i++){
                if(Array.isArray(this[checkedProperties[i]])){
                    var friends = '';
                    for (var j = 0, k = this[checkedProperties[i]].length; j < k; j++){
                        friends += this[checkedProperties[i]][j].name;
                    };
                    person.data.push(friends);
                }
				else {
                    person.data.push(this[checkedProperties[i]]);
                };
            };
            content.push(person);
        });
        return content;
    };
