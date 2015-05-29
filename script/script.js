$("#sendReq").bind("click", senReq); // функция была обернута в function, но я убрал обертку - так вроде тоже реботает, надо без скобок sendReq писать тут.

function senReq(){
    $.ajax({
        type: 'get',
        url: 'http://www.json-generator.com/api/json/get/bUsRkvEmHm?indent=2',
        dataType: 'json',
        beforeSend: function(){
            $("#sendReq").toggleClass("hidden");
            $(".btn-wrapper").append("<img src='img/ajax-loader.gif'>");
			},
        success: function(arr){
            $(".btn-wrapper").remove();
            renderReq(arr);
        }
    });
}

function renderReq(arr){

    $(".heading-form").toggleClass("hidden");
    $("#selectall, #selectclear").toggleClass("hidden");
    $("#submit").toggleClass("hidden");
    if (arr.length > 0) {
        var i = 0;
        for (property in arr[0]) {
            var html = '<li><input type="checkbox" id="' + property + '"><label for="' + property + '">' + property + '</label></li>';
            $('#sel-wrap-' + i++ % 2 + ' ul').append(html);
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

    $("#submit").bind("click", function(){
		renderTable(arr, event);});

};

function renderTable(arr, event) { // Предлагаю оформить обработку нажатия на Сабмит как отдельную функцию типа renderTable. НО когда я ее отделил так, то в Фаерфоксе и Эксплорере перестало срабатывать нажатие на Сабмит!!!Странно.
    event.preventDefault();
	$("#data-wrapper").toggleClass("hidden");
	$("#submit, #selectall, #selectclear, .heading-form").toggleClass("hidden");
    var checkedElements = $("[type='checkbox']:checked");
    var checkedProperties = [];
     $(checkedElements).each(function(){
        checkedProperties.push($(this).attr('id'));
        });
    var data = {
    "properties": checkedProperties,
    "persons": reArrangeData(checkedProperties, arr)
     };

    var template = $("#template").html();
    var rendered = Mustache.render(template, data);
    $(".data-select").empty();
    $('#table-wrapper').html(rendered);
		
    $('#back-btn').bind("click", function(){ //При нажатии кнопки Назад заново уже ничего не сабмитится и таблица не появляется...
		$("#table-wrapper").toggleClass("hidden");
		$("#data-wrapper").toggleClass("hidden");
		senReq();//Можно ли избавиться от повторного запроса???
        });
    };
	
function reArrangeData(checkedProperties, arr){
    var content = [];
    $(arr).each(function(){
        var person = {data: []};
        for(var i = 0, l = checkedProperties.length; i < l; i++){
            person.data.push(this[checkedProperties[i]]);
        }
        content.push(person);
    });
    return content;
};

