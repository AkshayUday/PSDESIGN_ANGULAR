<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="./bootstrap.css">
<!-- 	<link rel="stylesheet" href="./font-awesome.css"> -->
<!-- 	<link rel="stylesheet" href="./bootstrap2-toggle.min.css"> -->
 	
	<!-- <script src="script/jquery-3.1.1.slim.min.js"></script> -->
	<!-- <script src="script/bootstrap.min.js" type ="text/javascript"></script> -->
	<!-- <script src="script/bootstrap2-toggle.min.js" type ="text/javascript"></script> -->
  <!-- <link data-require="bootstrap@*" data-semver="3.2.0" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.css" /> -->

  <script data-require="jquery@*" data-semver="2.1.1" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

 <link href="./angular-toggle-switch-bootstrap-3.css" media="all" rel="stylesheet" type="text/css">
  <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" media="all" rel="stylesheet" type="text/css">
  
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular-sanitize.js"></script>
  
  <script type="text/javascript" src="./angular-toggle-switch.min.js"></script>
  <link rel="stylesheet" href="./styles.css">

	<script src="./globalFeatures.js" type ="text/javascript"></script>
</head>

<body ng-app = "myApp" ng-controller="globalCtrl" >
	<header>
		<div class="purple-header ">
			<div class="container">
				<div class="clearfix ">
					<div class="pull-left logo"><span class="f-bold">PS</span> <span class="f-light">Admin </span></div>
					<div class="pull-right mt10"><span class="user-name"><img src="images/icons/icon_features_user.png"/> ${userName} </span>

 
				 <a href="logout" id=logout> Logout</a>  
					</div>
				</div>
			</div>
		</div>
		<div class="main-menu">
			<div class="container">
				<nav class="menu">
					<ul class="clearfix">
						<li><a href="" class="btn" disabled="disabled">Home </a></li>
						<li><a href="" class="active" disabled="disabled"> Features </a></li>
					</ul>
				</nav>
			</div>
		</div>

	</header>
	<div class="container">
		<div class="clearfix mt25">
			<div class="pull-left">
				<h3> Global Features</h3>
			</div>
			<div class="pull-right mt10">
				<button type="button" class="  btn btn-green " disabled="disabled">Audit Log <i class="fa fa-angle-right fa-2" aria-hidden="true"></i></button>
			</div>
		</div>

		<section class="clearfix mt25">
			<div class="row">
				<div class="col-md-3">
					<div class="shadow-box">
						<ul class="left-menu">

							<li><a href="#" class="active">View All <i class="fa fa-caret-right pull-right fa-3" aria-hidden="true"></i></a></li>
						<!--  
							<li><a href="#">General</a></li>
							<li><a href="#" class="active"=>Care Management <i class="fa fa-caret-right pull-right fa-3" aria-hidden="true"></i></a></li>
							<li><a href="#">Rewards</a></li>
							<li><a href="#">Payments</a></li>
							-->
						</ul>
					</div>
				</div>
				<div class="col-md-9">
					<div class="shadow-box right-container">
						<div class="right-header">
							<h3> View All</h3>
						</div>
						<div class="right-content-wrap">
							<p>Placeholder text....orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
							</p>
							<div class="table-section">
								<table class="table CareManagement-table">
									<tr>
										<th>Toggle </th>
										<th>Feature</th>
										<th>Description</th>
										<th>Status </th>
									</tr>
									<!-- data rows -->
									<tr ng-repeat="featureData in myData track by $index">

									<td>
										<div toggle-switch class="switch-success" knob-label="" id="{{$index}}" ng-model="featureData.enabled"  checked></div>
										</td>
								
											<td>
											<p  data-toggle="popover" id="error-popover" data-content='<div class="row"> <div class="col-md-1"> <i class="fa fa-warning fa-2" aria-hidden="true"></i> 
											</div> <div class="col-md-10"><p>  Unable to save the healthy HOA </p> <div class="form-group ">
											<button type="submit" class="btn btn-default"> <i class="fa fa-plus" aria-hidden="true"></i> View more</button> 
											<button type="submit" class="btn btn-default ">Close</button></div></div></div>' data-placement="bottom" data-class="error">
												{{featureData.name}}</p>
										</td>
										<td>Description about Healthy HOA</td>
										<td class="pos-relative"> <span class="status">Scheduled offline</span> <button type="button" class="btn  btn-default btn-green btn-pencil pull-right" disabled ="disabled"> <i class="fa fa-pencil disabled " aria-hidden="true"></i></button></td>
										
					
									</tr>
									<tr>
										<td>
											<div toggle-switch class="switch-success" ng-model="switchStatus"></div>
										</td>


										<td>
											<p  data-toggle="popover" id="error-popover" data-content='<div class="row"> <div class="col-md-1"> <i class="fa fa-warning fa-2" aria-hidden="true"></i> 
											</div> <div class="col-md-10"><p>  Unable to save the healthy HOA </p> <div class="form-group ">
											<button type="submit" class="btn btn-default"> <i class="fa fa-plus" aria-hidden="true"></i> View more</button> 
											<button type="submit" class="btn btn-default ">Close</button></div></div></div>' data-placement="bottom" data-class="error">
												Healthy HOA </p>
										</td>
										<td>Description about Healthy HOA</td>
										<td class="pos-relative"> <span class="status">Scheduled offline</span> <button type="button" class="btn  btn-default btn-green btn-pencil pull-right" disabled ="disabled"> <i class="fa fa-pencil disabled " aria-hidden="true"></i></button></td>
									</tr>
									<tr class="border_bottom"></tr>
								</table>

							</div>
						</div>
					</div>
				</div>
			</div>

		</section>
	</div>
	
	<hr class="style7">

	<!--Footer-->
                <div class="footer copyright">
                <p>Copyright &copy; 2001-2017 Aetna Inc.</p>
                </div>

	<!-- jQuery first, then Tether, then Bootstrap JS. -->

	<script>

		$(document).ready(function() {
		    $("#logout").on("contextmenu",function(e){
 				      return false;
 		   }); 
					});  

		$(function () {

			$('myModal').modal();

			$('#example').popover(
				{
					html: true,
					placement: function (context, src) {
						$(context).addClass('size');
						return 'bottom';
					}
				}
			);
			$('#error-popover').popover(
				{
					html: true,
					placement: function (context, src) {
						$(context).addClass('error');
						return 'bottom';
					}
				}
			);

			$('#success-popover').popover(
				{
					html: true,
					placement: function (context, src) {
						$(context).addClass('success');
						return 'bottom';
					}
				}
			);
		});
	</script>
</body>

</html>
