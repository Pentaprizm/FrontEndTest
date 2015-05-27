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
    if (arr.length > 0) {
        var html = '';
        for (x in arr[0]) {
            html += x + ' ';
        }
        console.log(html.length);
        $('.btn-wrapper').html(html);
    }
}