

$("#sendReq").bind("click", function () {
    $("#sendReq").addClass("hidden");
    $(".btn-wrapper").append("<img src='img/ajax-loader.gif'>");
    $.ajax({
        type: 'get',
        url: 'http://www.json-generator.com/api/json/get/bUsRkvEmHm?indent=2',
        dataType: 'json',
        success: function (arr) {
            renderReq(arr);
        }
    });
});

function renderReq(arr) {
        $(".btn-wrapper").remove(); // Я заменид empty на remove, потому что иначе блок занимал место, хотя и становился пустым. Теперь чекбоксы выводятся вверху страницы как и надо. Плюс вынес эту команду вне условия if.
		$("form").prepend("<p>Please select data that you want to display:</p>"); //Эти две строчки генерят кусочек разметки. А вот как быть с двумя ссылками снизу и кнопкой Сабмит? Генерить ее таким же образом??
		$("form p").addClass("form-des"); //Короче надо както пересмотреть генерирование разметки!! Иначе мне кажется что это не дело такое писать и вручную добавлять все классы, атрибуты итд.
		
    if (arr.length > 0) {

        var i = 0;
        for (property in arr[0]) {
            var html = '<li><input type="checkbox" id="' + property + '"><label for="' + property + '">' + property + '</label></li>';
            $('#sel-wrap-' + i++ % 2 + ' ul').append(html);
        }
    }
};



// Обе функции почему-то срабатывают только по разу а потом не работают. Как это почитить? Ты ж программист)))

$("#selectall").bind("click", function(event){
	event.preventDefault();
	$("[type='checkbox']").attr("checked", true);

});


$("#selectclear").bind("click", function(event){
	event.preventDefault();
	$("[type='checkbox']").attr("checked", false);

});