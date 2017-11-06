<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="css/font-awesome.css">
	<link rel="stylesheet" href="css/bootstrap-toggle.css">
	<link rel="stylesheet" href="css/styles.css">
	<link rel="stylesheet" href="css/stylesplanSponsor.css">



	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-sanitize.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.3/angular-ui-router.min.js"></script>




<script src="js/jquery-3.1.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
<!-- <script src="js/bootstrap-toggle.js"></script> -->
	<script src="./globalFeatures.js" type="text/javascript"></script>
	<script src="./planSponsor.js" type="text/javascript"></script>

</head>

<body ng-app="myApp" ng-controller="globalCtrl">
	<header>
		<div class="purple-header ">
			<div class="container">
				<div class="clearfix ">
					<div class="pull-left logo"><span class="f-bold">PS</span> <span class="f-light">Admin </span></div>
					<div class="pull-right mt10"><span class="user-name"><img src="icons/icon_features_user.png"/> Ted Robins, </span> <span class="logout btn btn-link "> Logout </span></div>
				</div>
			</div>
		</div>
		<div class="main-menu">
			<div class="container">
				<nav class="menu">
					<ul class="clearfix">
						<li><a ui-sref="HOME"> Home </a></li>
						<li><a ui-sref="FEATURES" class="active"> Features </a></li>
						<li><a ui-sref="PLANSPONSOR" class="active"> Plan Sponsor</a></li>

					</ul>
				</nav>
			</div>
		</div>

	</header>
	<div class="container">
		<div ui-view></div>
	</div>

	<!-- jQuery first, then Tether, then Bootstrap JS. -->

</body>

</html>
