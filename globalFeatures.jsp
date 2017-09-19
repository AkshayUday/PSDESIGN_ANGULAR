<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="themes/css2/bootstrap.css">
	<link rel="stylesheet" href="themes/css2/font-awesome.css">
	<link rel="stylesheet" href="themes/css2/bootstrap2-toggle.min.css">
 	<link rel="stylesheet" href="themes/css2/styles.css">
	<script src="script/jquery-3.1.1.slim.min.js"></script>
	<script src="script/bootstrap.min.js" type ="text/javascript"></script>
	<script src="script/bootstrap2-toggle.min.js" type ="text/javascript"></script>
	<script src="script/angular.min.js" type ="text/javascript"></script>
	<script src="script/globalFeatures.js" type ="text/javascript"></script>
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
									<tr>
									<div class="checkbox" ng-repeat="i in [false, true]">
												<label>
										<input type="checkbox" data-toggle="toggle" ng-model="i">
									  </label>
											</div>
									
									</tr>
									<tr ng-repeat="featureData in myData">
											<td>
											
											<div class="checkbox">
												<label>
						<!-- - 		<input type="checkbox" ng-model="featureData.enabled" ng-true-value="true" ng-false-value="false" data-toggle="toggle">-->		
										<input type="checkbox" data-toggle="toggle" ng-model="true">
									  </label>
											</div>
										</td>
										<td>{{featureData.name}}</td>
										<td>Not Applicable</td>
										<td class="pos-relative"> <span class="status">Not Applicable</span><button id="example"  data-toggle="popover" data-placement="bottom"
											 data-content='<div >
	        <h3> Status-Edit</h2>
            <div class="form-group">
                <input type="radio" name="status" value="option1" checked="" id="inlineradio1"     />
                <label class="radio-inline p0 active" for="inlineradio1">Scheduled offline</label>

                <input type="radio" name="status" value="option2"  id="inlineradio2" />
                <label class="radio-inline" for="inlineradio2">Temporary offline</label>

                <input type="radio" name="status" value="option3" id="inlineradio3" />
                <label class="radio-inline" for="inlineradio3">Online</label>
                                            
                <input type="radio" name="status" value="option4" id="inlineradio4" />
                <label class="radio-inline" for="inlineradio4">N/A</label>
           </div>
<div class="form-group row">
<div class="col-sm-2">
    <label>Start date</label>
	<input type="text" class="form-control" id="inputPassword2">  
	</div>
	<div class="col-sm-1 mt30 p0 calendar-icon"> <i class="fa fa-calendar fa-3" aria-hidden="true"></i></div>
                <div class="col-sm-3 time p0">
                <label>Time</label>
                <div class="row time-selection">
                <div class="input-group col-sm-3 pull-left">
                    <input type="number" class="input-group-addon" min="1" max="12" />
                        <span class="input-group-addon p0">
                            <i class="fa fa-sort-asc" aria-hidden="true"></i>
                            <i class="fa fa-sort-desc" aria-hidden="true"></i>
                        </span>
                </div>
                <span class="col-sm-1 time-division">:</span>
                <div class="input-group col-sm-3 pull-left">
                    <input type="number" class="input-group-addon" min="1" max="60"  />
                        <span class="input-group-addon p0">
                            <i class="fa fa-sort-asc" aria-hidden="true"></i>
                            <i class="fa fa-sort-desc" aria-hidden="true"></i>
                        </span>

                </div>
                <div class="time-format col-sm-2 p0">
                <span class="active-format">AM</span><span>PM</span>
                </div>
                </div>
                </div>                                       
    <div class="col-sm-2">
       <label  >Expiry date</label>
	<input type="text" class="form-control" id="inputPassword2" > 
    </div>
	<div class="col-sm-1 mt30 p0 calendar-icon">  <i class="fa fa-calendar fa-3" aria-hidden="true"></i></div>
                                            <div class="col-sm-3 time p0">
                                            <label>Time</label>
                                            <div class="row time-selection">
                                            <div class="input-group col-sm-3 pull-left">
                                                <input type="number" class="input-group-addon" min="1" max="12" />
                                                    <span class="input-group-addon p0">
                                                        <i class="fa fa-sort-asc" aria-hidden="true"></i>
                                                        <i class="fa fa-sort-desc" aria-hidden="true"></i>
                                                    </span>
                                            </div>
                                            <span class="col-sm-1 time-division">:</span>
                                            <div class="input-group col-sm-3 pull-left">
                                                <input type="number" class="input-group-addon" min="1" max="60" />
                                                    <span class="input-group-addon p0">
                                                        <i class="fa fa-sort-asc" aria-hidden="true"></i>
                                                        <i class="fa fa-sort-desc" aria-hidden="true"></i>
                                                    </span>
                                            </div>
                                            <div class="time-format col-sm-2 p0">
                                            <span class="active-format">AM</span><span>PM</span>
                                            </div>
                                            </div>
                                            </div>  
  </div>

  <br>
  <br>
  <br>
<div class="form-group">
<div class="Message">
  <label>
   MESSAGE
  </label>
   <br>
   <br>
      <p>We are scheduled for maintenance from [start/time] to [end/time].</p>
</div>
<br>
<br>
<br>
<div class="form-group ">
	<button type="submit" class="btn btn-default btn-green">Save</button>
	<button type="submit" class="btn cancel " id="my modal" data-dismiss="modal" aria-hidden="true">Cancel</button>
  </div>
</div>


  
</div>' type="button" class="btn btn-default btn-green btn-pencil pull-right" disabled ="disabled">
											<i class="fa fa-pencil "  aria-hidden="true"></i>
											</button>
										</td>
									</tr>
									<tr>
										<td>
											<div class="checkbox">
												<label data-toggle="popover" id="success-popover" data-content='<div class="row"> <div class="col-md-1"> <i class="fa fa-check-circle fa-3" aria-hidden="true"></i>
												</div> <div class="col-md-8"><p> Your requested feature change was saved. It will be visible shortly.</p> <div class="form-group "></div></div></div>' data-placement="bottom" data-class="success">
										<input type="checkbox" data-toggle="toggle">
									  </label>
											</div>
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
