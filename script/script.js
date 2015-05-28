

$("#sendReq").bind("click", function () {
    $("#sendReq").addClass("hidden");
    $(".btn-wrapper").append("<img src='img/ajax-loader.gif'>");
    $.ajax({ //можно ли заменить .ajax на .load(), чтобы попроще выглядело??
        type: 'get',
        url: 'http://www.json-generator.com/api/json/get/bUsRkvEmHm?indent=2',
        dataType: 'json',
        success: function (arr) {
            renderReq(arr);
        }// Я так и не понял куда сохранились данные JSON. Где лежит наш массив объектов?
    });
});

function renderReq(arr) {
        $(".btn-wrapper").remove(); // Я заменил empty на remove, потому что иначе блок занимал место, хотя и становился пустым. Теперь чекбоксы выводятся вверху страницы как и надо. Плюс вынес эту команду вне условия if.
		$("form").prepend("<p>Please select data that you want to display:</p>"); //Эти две строчки генерят кусочек разметки. А вот как быть с двумя ссылками снизу и кнопкой Сабмит? Генерить ее таким же образом??
		$("form p:first").addClass("form-des"); //Короче надо както пересмотреть генерирование разметки!! Иначе мне кажется что это не дело такое писать и вручную добавлять все классы, атрибуты итд.
		
    if (arr.length > 0) { // Я попробовал удалить это условие и все работает. Оно нам точно надо?? А что есть length=0? Надо написать else?

        var i = 0;
        for (property in arr[0]) {
            var html = '<li><input type="checkbox" id="' + property + '"><label for="' + property + '">' + property + '</label></li>'; // Я так и не понял зачем с обеих сторон плюсики у property
            $('#sel-wrap-' + i++ % 2 + ' ul').append(html); //может можно как-то переписать этот селектор?
        }
    }
};


//Глянь еще этот кусок. Вроде все работает, но можно ли чтото улучшить или переписать красиво??

$("#selectall").bind("click", function(event){
	event.preventDefault();
	$("[type='checkbox']").prop("checked", true);

});


$("#selectclear").bind("click", function(event){
	event.preventDefault();
	$("[type='checkbox']").prop("checked", false);

});