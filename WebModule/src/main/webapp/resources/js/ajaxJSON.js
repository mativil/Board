//отправка тестовой даты
function submitJSON() {
    var clientId = "60:21:C0:2A:E0:33";
    var type = "START";
    var x = Math.random();
    var y = Math.random();
    var json = {"clientId": "60:21:C0:2A:E0:33", "type": type, "x": x, "y": y};

    $.ajax({
        url: '/ajaxtest',
        data: JSON.stringify(json),
        type: "POST",

        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function (info) {
            var respContent = "";

            respContent += "<span class='success'>We did it!: [";
            respContent += info.clientId + " : ";
            respContent += info.type + " : ";
            respContent += info.x + " : ";
            respContent += info.y + "]</span>"+"<br>";

            $("#result").append(respContent);
        }
    });
}

//отправка реального ниибацца крутого массива JSON
function submitRealJSON(JSONArray) {
    console.log(JSONArray);
    $.ajax({
        url: '/board/api',
        data: JSONArray,
        type: "POST",

        beforeSend: function (xhr) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Content-Type", "application/json");
        },
        success: function (info) {

        }
    });
}