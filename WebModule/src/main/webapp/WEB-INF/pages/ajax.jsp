<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<html>
<head>
    <TITLE>Test JSON by timer</TITLE>

    <style type="text/css">
        body {
            background-image:
                    url('http://cdn.crunchify.com/wp-content/uploads/2013/03/Crunchify.bg_.300.png');
        }
        .draw
        {
            border: 4px double black;
            background: white; /* Цвет фона */
        }
    </style>
</head>

<body>
<div align="center" >
    <div align="center" id = "mainDiv">
            <canvas id="draw" class = "draw" width="800" height="600"></canvas>
    <script>

    </script>

    <br /><span id="outputSpan"></span>
    <br /><span id="mouseXYSpan"></span>
    </div>
    <br> <br> ${message} 123<br> <br>
    <input type="button" id = "clearButton" type="button" value="Очистить" onClick="clearBoard()"></button>
    <br>
    <input type="button" id = "stopButton" type="button" value="Посылаем ajax запросы" onClick="StopOrContinue()"></button>
    <input type="button" id = "singleAjaxButton" type="button" value="Ну мам, ну один Ajax запросик" onClick="SingleAjaxQuery()"></button>
    <br>
    <input type="button" id = "paintTestButton" type="button" value="Нарисовать тестовые данные" onClick="paintTest()"></button>
    <br>
    <br>
    <div id="result"></div>
    <br>
    <p>
        created by mativil</a>
    </p>
</div>

</body>

<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

<script src="../../resources/js/ajaxJSON.js"></script>
<script src="../../resources/js/draw.js"></script>

</html>