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
            background: white; /* ���� ���� */
            padding: 10px; /* ���� ������ ������ */
        }


    </style>


</head>

<body>
<div align="center" >

    <div align="center" id = "mainDiv">
            <canvas id='Board' class = "canvas" height='500' width='500'>����� ��� ���������</canvas>
    <script>

    </script>

    <br /><span id="outputSpan"></span>
    <br /><span id="mouseXYSpan"></span>
    </div>
    <br> <br> ${message} 123<br> <br>

    <input type="button" id = "stopButton" type="button" value="������!!!" onClick="StopOrContinue()"></button>
    <input type="button" id = "clearButton" type="button" value="��������" onClick="ClearCanvas()"></button>
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
<script src="../../resources/js/Board.js"></script>
<script type = "text/javascript">
    var isStop = true;
    var intervalId;
    //��������� ������������ � ������ ��� ��������
    var clientID = "user";
    var JSONPostArray = [];


    document.getElementById("stopButton").value = "�������� ajax �������";

    function StopOrContinue() {
        if(isStop == false)
        {
            isStop = true;
            clearInterval(intervalId);
            document.getElementById("stopButton").value = '�� �����, ��� ��������';
        }
        else
        {
            isStop = false;
            intervalId = setInterval(submitJSON, 1000);
            document.getElementById("stopButton").value = '�� ������, ������ ���!';
        }
    }

    var canvas = document.getElementById('Board');
    var isPainting = false;

    canvas.addEventListener("mousemove", doMouseMove, false);
    canvas.addEventListener("mousedown", doMouseDown, false);
    canvas.addEventListener("mouseup", doMouseUp, false);
    var context = canvas.getContext('2d');


    context.lineWidth = 5;


    function doMouseMove(eventObject) {
        var mouse = getMousePos(canvas, eventObject);
        if (isPainting) {

        context.lineTo(mouse.x, mouse.y);
        context.stroke();
            addToJSONArray("MOVE", mouse.x, mouse.y);
        }
        $("#mouseXYSpan").html("X: " + mouse.x + "   Y: " + mouse.y + "isPainting - "+ isPainting);
    }


    function doMouseDown(eventObject) {
        var mouse = getMousePos(canvas, eventObject);

        context.moveTo(mouse.x, mouse.y);
        isPainting = true;

        addToJSONArray("START", mouse.x, mouse.y);
    }

    function doMouseUp(eventObject) {
        isPainting = false;
        //console.log(JSON.stringify(JSONPostArray));
        submitRealJSON(JSON.stringify(JSONPostArray));
    }



    function ClearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        }


     function addToJSONArray(type, x, y) {
         console.log(type + x + y);

         JSONPostArray.push({
             "clientID": clientID,
             "type": type,
             "X": x,
             "Y": y
             }
         );
     }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left - 6,
            y: evt.clientY - rect.top - 6
        };
    }

</script>

</html>