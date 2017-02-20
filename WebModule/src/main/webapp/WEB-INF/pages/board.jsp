<!DOCTYPE html>

<html>
<head>
	<meta charset="utf-8">
	<title><c:out value="Доска для рисования"/></title>
	<link rel="stylesheet" href="../../resources/css/bootstrap.css"  type="text/css">
	<style type="text/css">
		.draw
		{
			border: 4px double black;
			background: white; /* Цвет фона */
		}

		h1
		{
			text-align: center;
            color : white;
		}

	</style>
</head>
<body>
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="../../resources/js/bootstrap.js"></script>

	<!--Header-->
	<nav class="navbar navbar-inverse">
		<div class="container-fluid">
				<h1 text-align="center">Board</h1>
		</div>
	</nav>

	<div class="container">
	<div class="jumbotron">
		<canvas id="draw" class = "draw" width="1000" height="700" style="border:4px double black"></canvas>
		<input type="button" class = "btn btn-success btn-lg" id = "clearButton" type="button" value="Clear" onClick="clearBoard()"></button>
	</div>
	<div class="footer">
		<p align="center">&copy; 2017. Created by mativil</p>
	</div>
	</div>
</body>

<script src="//ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>

<script src="../../resources/js/ajaxJSON.js"></script>
<script src="../../resources/js/draw.js"></script>

</html>
