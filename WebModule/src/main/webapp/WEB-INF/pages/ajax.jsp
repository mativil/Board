<%@ page language="java" contentType="text/html;charset=cp1251"%>
<html>
<head>
    <TITLE>Test JSON by timer</TITLE>

    <style type="text/css">
        body {
            background-image:
                    url('http://cdn.crunchify.com/wp-content/uploads/2013/03/Crunchify.bg_.300.png');
        }
        .canvas
        {
            border: 4px double black;
            background: white; /* Цвет фона */
        }


    </style>


</head>

<body>
<div align="center" >

    <div align="center" id = "mainDiv">
            <canvas id='Board' class = "canvas" height='500' width='500'>Доска для рисовашек</canvas>
    <script>

    </script>

    <br /><span id="outputSpan"></span>
    <br /><span id="mouseXYSpan"></span>
    </div>
    <br> <br> ${message} 123<br> <br>
    <input type="button" id = "clearButton" type="button" value="Очистить" onClick="clearBoard()"></button>
    <br>
    <input type="button" id = "stopButton" type="button" value="Хватит!!!" onClick="StopOrContinue()"></button>
    <input type="button" id = "singleAjaxButton" type="button" value="Ну мам, ну один Ajax запросик" onClick="SingleAjaxQuery()"></button>
    <br>
    <br>
    <div id="result"></div>
    <br>
    <p>
        by <a href="http://crunchify.com">Crunchify.com</a>
    </p>
</div>

</body>

<script type="text/javascript"
        src="http://code.jquery.com/jquery-1.10.1.min.js"></script>

<script src="../../resources/js/ajaxJSON.js"></script>
<script src="../../resources/js/board.js"></script>
<script src="../../resources/js/paint.js"></script>
<script type = "text/javascript">
    var isStop = true;
    var intervalId;
    //Объявляем пользователя и массив для отправки
    var clientID = generateRandomMacAddress();
    var JSONPostArray = [];


    document.getElementById("stopButton").value = "Посылаем ajax запросы";

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

    //Вот тут мы каждую секунду стучимся на сервер
    var ajaxIntervalId = setInterval(synchronizeData, 200);

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


    var canvas = document.getElementById('Board');
    var isPainting = false;

    var myPrevPoint = {
        x : 0,
        y : 0
    };

    var anotherPrevPoint = {
        x : 0,
        y : 0
    };

    canvas.addEventListener("mousemove", doMouseMove, false);
    canvas.addEventListener("mousedown", doMouseDown, false);
    canvas.addEventListener("mouseup", doMouseUp, false);
    canvas.addEventListener("mouseout", doMouseOut);
    var context = canvas.getContext('2d');


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
            addToJSONArray(clientID, "MOVE", mouse.x, mouse.y);
        }
        $("#mouseXYSpan").html("X: " + mouse.x + "   Y: " + mouse.y + "isPainting - "+ isPainting);
        myPrevPoint.x = mouse.x;
        myPrevPoint.y = mouse.y;
    }


    function doMouseDown(eventObject) {
        var mouse = getMousePos(canvas, eventObject);

        context.moveTo(mouse.x, mouse.y);
        isPainting = true;

        addToJSONArray(clientID, "START", mouse.x, mouse.y);
        myPrevPoint.x = mouse.x;
        myPrevPoint.y = mouse.y;
    }

    function doMouseUp(eventObject) {
        isPainting = false;
        //console.log(JSON.stringify(JSONPostArray));
        /*
        submitRealJSON(JSON.stringify(JSONPostArray));
        JSONPostArray = [];
        */
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
         //console.log(type + x + y);

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
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
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
            switch (item.type)
            {
                case "START":
                    anotherPrevPoint.x = result.x;
                    anotherPrevPoint.y = result.y;
                    context.moveTo(anotherPrevPoint.x, anotherPrevPoint.y);
                    break;
                case "MOVE":
                    //context.moveTo(anotherPrevPoint.x, anotherPrevPoint.y);
                    context.lineTo(result.x, result.y);
                    context.stroke();
                    break;
                case "CLEAR":
                    ClearCanvas();
                    break;
                default: break;
            }
        }
    }
</script>

</html>