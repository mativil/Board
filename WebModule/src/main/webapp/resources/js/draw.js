/**
 * Логика работы с элементом canvas
 */
var isStop = true;
var intervalId;
//Объявляем пользователя и массив для отправки
var clientID = generateRandomMacAddress();
var JSONPostArray = [];

//Вот тут мы каждую секунду стучимся на сервер
var ajaxIntervalId = setInterval(synchronizeData, ajaxMillisecondsTime);

var ajaxMillisecondsTime = 200;

var canvas = document.getElementById('draw');
var isPainting = false;

var myPrevPoint = {
    x : 0,
    y : 0
};

var anotherPrevPoint = {
    x : 0,
    y : 0
};

function StopOrContinue() {
    if(isStop == false)
    {
        isStop = true;
        clearInterval(intervalId);
        document.getElementById("stopButton").value = 'Ну ладно, ещё капельку';
    }
    else
    {
        isStop = false;
        intervalId = setInterval(submitJSON, 1000);
        document.getElementById("stopButton").value = 'Ну хватит, достал уже!';
    }
}

function synchronizeData() {
    if(!JSONPostArray.length) {
        addToJSONArray(clientID, "NONE", 0, 0);
    }
    submitRealJSON(JSON.stringify(JSONPostArray));
    JSONPostArray = [];
}

function SingleAjaxQuery()
{
    submitJSON();
}




canvas.addEventListener("mousemove", doMouseMove, false);
canvas.addEventListener("mousedown", doMouseDown, false);
canvas.addEventListener("mouseup", doMouseUp, false);
canvas.addEventListener("mouseout", doMouseOut, false);
var context = canvas.getContext('2d');
context.lineCap = 'round';

context.lineWidth = 5;


function doMouseOut(eventObject){
    isPainting = false;
}

function doMouseMove(eventObject) {
    var mouse = getMousePos(canvas, eventObject);
    if (isPainting) {
        context.moveTo(myPrevPoint.x, myPrevPoint.y);
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
        myPrevPoint.x = mouse.x;
        myPrevPoint.y = mouse.y;
        addToJSONArray(clientID, "MOVE", mouse.x, mouse.y);
    }
    $("#mouseXYSpan").html("X: " + mouse.x + "   Y: " + mouse.y);

}


function doMouseDown(eventObject) {
    var mouse = getMousePos(canvas, eventObject);

    isPainting = true;

    addToJSONArray(clientID, "START", mouse.x, mouse.y);
    myPrevPoint.x = mouse.x;
    myPrevPoint.y = mouse.y;
    context.moveTo(myPrevPoint.x, myPrevPoint.y);
}

function doMouseUp(eventObject) {
    isPainting = false;
}

function clearBoard() {

    $.ajax({
        url: '/board/clear'
    });
}

function ClearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
}


function addToJSONArray(clientID, type, x, y) {
    var result = toRecentCoord(canvas.width, canvas.height, x, y);
    var value = {
        "clientId": clientID,
        "type": type,
        "x": result.x,
        "y": result.y
    }
    JSONPostArray.push(
        value
    );
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) ,
        y: (evt.clientY - rect.top)
    };
}

function toRecentCoord(canvasWidth, canvasHeight, x, y)
{
    return{
        x: x/canvasWidth ,
        y: y/canvasHeight
    };
}

function toCanvasCoord(canvasWidth, canvasHeight, x, y)
{
    return{
        x: x*canvasWidth ,
        y: y*canvasHeight
    };
}

function paintAnotherOne(dataArray)
{
    for(i in dataArray)
    {
        var item = dataArray[i];
        var result = toCanvasCoord(canvas.width, canvas.height, item.x, item.y);
        //console.log(item);
        context.beginPath();
        switch (item.type)
        {
            case "START":
                anotherPrevPoint.x = result.x;
                anotherPrevPoint.y = result.y;
                context.moveTo(anotherPrevPoint.x, anotherPrevPoint.y);
                break;
            case "MOVE":
                context.moveTo(anotherPrevPoint.x, anotherPrevPoint.y);
                context.lineTo(result.x, result.y);
                anotherPrevPoint.x = result.x;
                anotherPrevPoint.y = result.y;
                break;
            case "CLEAR":
                ClearCanvas();
                break;
            default: break;
        }
        context.stroke();
    }
}

