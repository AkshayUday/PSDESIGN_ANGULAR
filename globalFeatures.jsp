<!DOCTYPE html>
<html>

<head>

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="../themes/css2/bootstrap-3.3.2.min.css">
	<link rel="stylesheet" href="../themes/css2/font-awesome-4.3.0.min.css">
 	<link rel="stylesheet" href="../themes/css2/bootstrap-toggle.css">
	<link rel="stylesheet" href="../themes/css2/bootstrap-datetimepicker.min.css">
	 <link rel="stylesheet" href="../themes/css2/styles.css">
 <link rel="stylesheet" href="../themes/css2/stylesplanSponsor.css"> 
 
 
 
 	<script src="../script/jquery-2.2.4.min.js"></script>
	<script src="../script/bootstrap-toggle.js" type ="text/javascript"></script>
	<script src="../script/bootstrap-3.3.2.min.js" type ="text/javascript"></script>
 

	
    <script src="../script/angular.min.js" type ="text/javascript"></script>
	<script src="../script/angular-sanitize.js" type ="text/javascript"></script>
	<script src="../script/angular-ui-router.min.js" type ="text/javascript"></script>
	
	<script type='text/javascript' src="../script/moment-with-locales.min.js"></script>
	<script type='text/javascript' src="../script/bootstrap-datetimepicker-3.1.4.min.js"></script>
	
	<script src="../script/globalFeatures.js" type ="text/javascript"></script>
	<script src="../script/planSponsor.js" type ="text/javascript"></script>
	<script>window.cardData=${getGlobalFeaturesList}</script>
</head>
<body ng-app="myApp" ng-controller="globalCtrl">
	<header>
		<div class="purple-header ">
 			<div class="container">
 				<div class="clearfix ">
 				<div class="pull-left logo"><span class="f-bold">PS</span> <span class="f-light">Admin </span></div>
 					<div class="pull-right mt10"><span class="user-name"><img src="../images/icons/icon_features_user.png"/>${userName},</span>
 				 <a href="logout" id=logout> Logout</a>  
 					</div>
 				</div>
 			</div>
 		</div>
 		<div class="main-menu">
 			<div class="container">
 				<nav class="menu">
 					<ul class="clearfix">
 						<!--  <li><a href="" class="active" disabled="disabled">Home </a></li>
 						<li><a href="" class="active" disabled="disabled"> Features </a></li>
 						<li><a href="script/planSponsor.html" class="active" disabled="disabled">Plan Sponsor </a></li>
 						-->
 						
 						<li><a ui-sref="HOME"> Home </a></li>
						<li><a ui-sref="FEATURES" ui-sref-active="active"> Features </a></li>
						<li><a ui-sref="PLANSPONSOR" ui-sref-active="active">Plan Sponsor</a></li>
 					</ul>
 				</nav>
 			</div>
 		</div>
 
 	</header>
 	<div class="container">
		<div ui-view>
		</div>
	</div>
	<!--Footer-->
                <div class="copyright">
                <p>Copyright &copy; 2001-2017 Aetna Inc.</p>
                </div>
	</div>
	<!-- jQuery first, then Tether, then Bootstrap JS. -->

<!--  	<script>
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
	</script> -->
</body>

</html>
