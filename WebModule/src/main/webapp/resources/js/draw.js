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

var ajaxMillisecondsTime = 100;

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

function paintTest() {
    var data = [
        {"clientId": "60:21:C0:2A:E0:33", "type": "START", "x": 0.15703125, "y": 0.28644067},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.15625, "y": 0.29208717},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.15970543, "y": 0.33328888},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.16322884, "y": 0.3755889},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.1742769, "y": 0.46476725},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.17899701, "y": 0.5016842},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.18739669, "y": 0.5753495},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.19161554, "y": 0.6078391},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.19468312, "y": 0.6287661},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.19868055, "y": 0.66990584},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.19934128, "y": 0.686075},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.2, "y": 0.6983051},
        {"clientId": "60:21:C0:2A:E0:33", "type": "START", "x": 0.10390625, "y": 0.35084745},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.12242915, "y": 0.35254237},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.1388959, "y": 0.3508753},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.16835937, "y": 0.33559322},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.19429092, "y": 0.3200875},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.22283547, "y": 0.29848275},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.26982895, "y": 0.27162662},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.28587398, "y": 0.26073387},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.29707852, "y": 0.2555639},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.31008545, "y": 0.24807382},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.3140625, "y": 0.2457627},
        {"clientId": "60:21:C0:2A:E0:33", "type": "START", "x": 0.3015625, "y": 0.561017},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.3039382, "y": 0.55758095},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.31144127, "y": 0.550301},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.32270548, "y": 0.5380822},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.33458185, "y": 0.5213808},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.34789175, "y": 0.50172734},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.35182595, "y": 0.4943437},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.3536582, "y": 0.49036866},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.34875688, "y": 0.4764865},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.34137857, "y": 0.46495175},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.33127812, "y": 0.45848984},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.3220474, "y": 0.45636302},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.30540282, "y": 0.4598267},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.29622608, "y": 0.4742892},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.29121134, "y": 0.49014676},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.2884161, "y": 0.511628},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.28676364, "y": 0.565654},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.29233673, "y": 0.6070781},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.29585055, "y": 0.62436837},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.31057486, "y": 0.6488154},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.32115442, "y": 0.65180653},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.3363533, "y": 0.64758974},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.3526297, "y": 0.6385535},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.37934694, "y": 0.6143602},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.38839582, "y": 0.60672444},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.3984375, "y": 0.6},
        {"clientId": "60:21:C0:2A:E0:33", "type": "START", "x": 0.50625, "y": 0.44067797},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.49753493, "y": 0.42842102},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.48560295, "y": 0.41364047},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.46828508, "y": 0.4022044},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.43044335, "y": 0.39894757},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.41697955, "y": 0.41062063},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.41490316, "y": 0.4213893},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.4341077, "y": 0.48429006},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.45722333, "y": 0.5150669},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.48219913, "y": 0.53743064},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.5295892, "y": 0.57004714},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.54470634, "y": 0.5781549},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.5540911, "y": 0.5850131},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.5571662, "y": 0.59012336},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.5533876, "y": 0.6014101},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.5433668, "y": 0.61080104},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.5307044, "y": 0.6152542},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.5152965, "y": 0.6152542},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.5087373, "y": 0.6135593},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.50625, "y": 0.6135593},
        {"clientId": "60:21:C0:2A:E0:33", "type": "START", "x": 0.58984375, "y": 0.18644068},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.592456, "y": 0.19399707},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.6006567, "y": 0.2231209},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.608836, "y": 0.25867817},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.6165336, "y": 0.3022129},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.6337737, "y": 0.3720974},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.6472014, "y": 0.44244844},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.6513656, "y": 0.4655274},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.65594596, "y": 0.5055523},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.65725607, "y": 0.5254359},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.659375, "y": 0.5423729},
        {"clientId": "60:21:C0:2A:E0:33", "type": "START", "x": 0.56640625, "y": 0.4779661},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.5703401, "y": 0.4717115},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.596326, "y": 0.44516215},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.6238175, "y": 0.42488006},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.673257, "y": 0.38544124},
        {"clientId": "60:21:C0:2A:E0:33", "type": "MOVE", "x": 0.70234376, "y": 0.36949152}
    ];
    paintAnotherOne(data);
}
