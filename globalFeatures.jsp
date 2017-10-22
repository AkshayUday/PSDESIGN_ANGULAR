<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="themes/css2/bootstrap.css">
	<link rel="stylesheet" href="themes/css2/font-awesome.css">
 	<link rel="stylesheet" href="themes/css2/styles.css">
 	<link rel="stylesheet" href="themes/css2/bootstrap-toggle.css">
	<link rel="stylesheet" href="themes/css2/stylesplanSponsor.css">
	<script src="script/bootstrap-toggle.js" type ="text/javascript"></script
	<script src="script/jquery-2.2.4.min.js"></script>
	<script src="script/bootstrap.min.js" type ="text/javascript"></script>
	<script src="script/angular.min.js" type ="text/javascript"></script>
	<script src="script/angular-sanitize.js" type ="text/javascript"></script>
	<script src="script/globalFeatures.js" type ="text/javascript"></script>
	<script>window.cardData=${getGlobalFeaturesList}</script>
</head>
<body ng-app="myApp" ng-controller="globalCtrl">
	<header>
		<div class="purple-header ">
 			<div class="container">
 				<div class="clearfix ">
 				<div class="pull-left logo"><span class="f-bold">PS</span> <span class="f-light">Admin </span></div>
 					<div class="pull-right mt10"><span class="user-name"><img src="images/icons/icon_features_user.png"/>${userName}</span>
 				 <a href="logout" id=logout> Logout</a>  
 					</div>
 				</div>
 			</div>
 		</div>
 		<div class="main-menu">
 			<div class="container">
 				<nav class="menu">
 					<ul class="clearfix">
 						<li><a href="" class="active" disabled="disabled">Home </a></li>
 						<li><a href="" class="active" disabled="disabled"> Features </a></li>
 						<li><a href="script/planSponsor.html" class="active" disabled="disabled">Plan Sponsor </a></li>
 					</ul>
 				</nav>
 			</div>
 		</div>
 
 	</header>
 	<div class="container">
		<div ui-view></div>
	</div>
	<!-- jQuery first, then Tether, then Bootstrap JS. -->

	<script>
		$(function() {

			$('myModal').modal();

			$('#example').popover({
				html: true,
				placement: function(context, src) {
					$(context).addClass('size');
					return 'bottom';
				}
			});

			$('#error-popover').popover({
				html: true,
				placement: function(context, src) {
					$(context).addClass('error');
					return 'bottom';
				}
			});
			$('#success-popover').popover({
				html: true,
				placement: function(context, src) {
					$(context).addClass('success');
					return 'bottom';
				}
			});
	</script>
</body>

</html>
