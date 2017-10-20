<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="themes/css2/bootstrap.css">
	<link rel="stylesheet" href="themes/css2/font-awesome.css">
 	<link rel="stylesheet" href="themes/css2/styles.css">
 	<link rel="stylesheet" href="themes/css2/bootstrap-toggle.css">
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
 
 														<li><a href="#" ng-click="show('View All')">View All</a></li>
							<li ng-repeat="data1 in myData | unique : 'categoryName' "><a href="#" ng-click="show(data1,$index)"ng-class="{active:$index == selected}">{{data1.featureCategory.categoryName}}<i  ng-class="{fa fa-caret-right pull-right fa-3:$index == selected}" aria-hidden="true"></i</a></li>
 							
						</ul>
 					</div>
 				</div>
 				<div class="col-md-9">
 					<div class="shadow-box right-container">
 						<div class="right-header">
							<h3>{{showItems}}</h3>
 						</div>
 						<div class="right-content-wrap">
 						<p>{{categorydescription}}</p>
 						
 							<div class="table-section">
 								<table class="table CareManagement-table">
 									<tr>
 										<th>Toggle </th>
 										<th>Feature</th>
 										<th>Description</th>
 										<th>Status </th>
 									</tr>			
 									
 										<tr>
										<!--  <td>
											<div class="checkbox">
												<label>
										<input type="checkbox" data-toggle="toggle">
									  </label>
											</div>
										</td>
										<td>Healthy actions</td>
										<td>Description about Healthy actions</td>-->
									<!-- 	<td class="pos-relative"> <span class="status">Scheduled offline</span> 
										<button id="example" data-toggle="popover" data-placement="bottom" data-content='
										<div>
										
	<h3> Status edit</h2>
	 <div class="form-group">
	<label class="radio-inline">
  <input type="radio" id="inlineCheckbox1" value="option1"> Scheduled offline
</label>
<label class="radio-inline">
  <input type="radio" id="inlineCheckbox2" value="option2"> Temporary offline
</label>
<label class="radio-inline">
  <input type="radio" id="inlineCheckbox3" value="option3"> Online
</label>
<label class="radio-inline">
  <input type="radio" id="inlineCheckbox4" value="option4"> N/A
</label>
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
<div class="form-group">
<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
    Option one is this and that&mdash;be sure to include why its great
  </label>
</div>
<div class="radio">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
    Option two can be something else and selecting it will deselect option one
  </label>
</div>
<div class="radio ">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" >
    Option three is disabled
  </label>
</div>
<div class="radio ">
  <label>
    <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" >
    other
  </label>
</div>
</div>
 <div class="form-group ">
	<textarea class="form-control"> </textarea>
 </div>
  <div class="form-group ">
	<button type="submit" class="btn btn-default btn-green">Save</button>
	<button type="submit" class="btn btn-default btn-green " id="my modal" data-dismiss="modal" aria-hidden="true">Cancel</button>
  </div>

</div>' type="button" class="btn btn-default btn-green btn-pencil pull-right">
											<i class="fa fa-pencil " aria-hidden="true"></i>
											</button>
										</td>
									</tr>
									<!-- ng-repeat="feature in myData track by $index" -->
									<!--  <tr>
										<td>
											<div class="checkbox">
												<label data-toggle="popover" id="success-popover" data-content='<div class="row"> <div class="col-md-1"> <i class="fa fa-check-circle fa-3" aria-hidden="true"></i>
												</div> <div class="col-md-6"><p> Your requested feature change was successfully saved. It will be visible in few minutes.</p> <div class="form-group "></div></div></div>' data-placement="bottom" data-class="success">
										<input type="checkbox" data-toggle="toggle">
									  </label>
											</div>
										</td>
										<td>
											<p data-toggle="popover" id="error-popover" data-content='<div class="row"> <div class="col-md-1"> <i class="fa fa-warning fa-2" aria-hidden="true"></i>
											</div> <div class="col-md-10"><p>  Unable to save the healthy HOA </p> <div class="form-group ">
											<button type="submit" class="btn btn-default"> <i class="fa fa-plus" aria-hidden="true"></i> View more</button>
											<button type="submit" class="btn btn-default ">Close</button></div></div></div>' data-placement="bottom" data-class="error">
												Healthy HOA </p>
										</td>
										<td>NA</td>
										<td class="pos-relative"> <span class="status">Scheduled offline</span> <button type="button" class="btn btn-default btn-green btn-pencil pull-right"> <i class="fa fa-pencil " aria-hidden="true"></i></button></td>
									</tr>
									-->
									<!-- ng-repeat row -->
									<tr ng-repeat="feature in myData | myFilter: showItems track by $index">
										<td>
											<div class="loading"  ng-show="loading && $index==inx1"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />Saving...</div>
											<div class="checkbox" ng-hide="loading && $index==inx1" ng-click="feature.enabled = !feature.enabled">
												<label ng-click="change(feature,$index)">

											<div ng-class="test(feature.enabled)" style="width: 72.9375px; height: 36px;">
											  <input type="checkbox"  ng-model="feature.enabled" data-toggle="toggle" ng-changed="showMessage">
											  <div class="toggle-group">
											  
												<label class="btn btn-primary toggle-on">On</label>
												<label class="btn btn-default active toggle-off" >Off</label>
												
												<span
												  class="toggle-handle btn btn-default"></span>
												</div>
										</div>
							</label>
							<div ng-if="feature.enabled && $index==showMessage" class="popover fade success bottom in" role="tooltip" id="popover529523" style="top: 36px; left: -357.5px; display: block;"><div class="arrow" style="left: 50%;"></div><h3 class="popover-title" style="display: none;"></h3><div class="popover-content"><div class="row"> <div class="col-md-1"> <i class="fa fa-check-circle fa-3" aria-hidden="true"></i>
																			</div> <div class="col-md-6"><p> Your requested feature change was successfully saved. It will be visible in few minutes.</p> <div class="form-group "></div></div></div></div></div>
						</div>
						</td>
						<td>
								<p data-toggle="popover" id="error-popover" data-content='<div class="row"> <div class="col-md-1"> <i class="fa fa-warning fa-2" aria-hidden="true"></i>
								</div> <div class="col-md-10"><p>  Unable to save the healthy HOA </p> <div class="form-group ">
								<button type="submit" class="btn btn-default"> <i class="fa fa-plus" aria-hidden="true"></i> View more</button>
								<button type="submit" class="btn btn-default ">Close</button></div></div></div>' data-placement="bottom" data-class="error">
									{{feature.name}} </p>
						</td>
						<td class="table_Des">{{feature.description}}</td>
								<td class="pos-relative"> <span class="status">{{feature.featureStatus}}</span><button id="example" data-toggle="popover"  data-placement="bottom" ng-click="showPopover= !showPopover;"

							<i class="fa fa-pencil pull-right btn btn-pencil btn-green " aria-hidden="true"></i>
							</button>

							<div class="popover fade size bottom in" ng-show="showPopover" role="tooltip" id="popover948578" style="top: 51.6333px; left: -305.133px; display: block;"><div class="arrow" style="left: 58.5177%;"></div><h3 class="popover-title" style="display: none;"></h3><div class="popover-content"><div>
								<h3> Status edit</h3>
								 <div class="form-group">
								<label class="radio-inline">
							  <input id="inlineCheckbox1" value="option1" type="radio"> Scheduled offline
							</label>
							<label class="radio-inline">
							  <input id="inlineCheckbox2" value="option2" type="radio"> Temporary offline
							</label>
							<label class="radio-inline">
							  <input id="inlineCheckbox3" value="option3" type="radio"> Online
							</label>
							<label class="radio-inline">
							  <input id="inlineCheckbox4" value="option4" type="radio"> N/A
							</label>
							</div>
							<div class="form-group row">
							<div class="col-sm-2">
							    <label>Start date</label>
								<input class="form-control" id="inputPassword2" type="text">
								</div>
								<div class="col-sm-1 mt30 p0 calendar-icon"> <i class="fa fa-calendar fa-3" aria-hidden="true"></i></div>
							                                            <div class="col-sm-3 time p0">
							                                            <label>Time</label>
							                                            <div class="row time-selection">
							                                            <div class="input-group col-sm-3 pull-left">
							                                                <input class="input-group-addon" min="1" max="12" type="number">
							                                                    <span class="input-group-addon p0">
							                                                        <i class="fa fa-sort-asc" aria-hidden="true"></i>
							                                                        <i class="fa fa-sort-desc" aria-hidden="true"></i>
							                                                    </span>
							                                            </div>
							                                            <span class="col-sm-1 time-division">:</span>
							                                            <div class="input-group col-sm-3 pull-left">
							                                                <input class="input-group-addon" min="1" max="60" type="number">
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
							       <label>Expiry date</label>
								<input class="form-control" id="inputPassword2" type="text">
							    </div>
								<div class="col-sm-1 mt30 p0 calendar-icon">  <i class="fa fa-calendar fa-3" aria-hidden="true"></i></div>
							                                            <div class="col-sm-3 time p0">
							                                            <label>Time</label>
							                                            <div class="row time-selection">
							                                            <div class="input-group col-sm-3 pull-left">
							                                                <input class="input-group-addon" min="1" max="12" type="number">
							                                                    <span class="input-group-addon p0">
							                                                        <i class="fa fa-sort-asc" aria-hidden="true"></i>
							                                                        <i class="fa fa-sort-desc" aria-hidden="true"></i>
							                                                    </span>
							                                            </div>
							                                            <span class="col-sm-1 time-division">:</span>
							                                            <div class="input-group col-sm-3 pull-left">
							                                                <input class="input-group-addon" min="1" max="60" type="number">
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
							<div class="form-group">
							<div class="radio">
							  <label>
							    <input name="optionsRadios" id="optionsRadios1" value="option1" checked="" type="radio">
							    Option one is this and that—be sure to include why its great
							  </label>
							</div>
							<div class="radio">
							  <label>
							    <input name="optionsRadios" id="optionsRadios2" value="option2" type="radio">
							    Option two can be something else and selecting it will deselect option one
							  </label>
							</div>
							<div class="radio ">
							  <label>
							    <input name="optionsRadios" id="optionsRadios3" value="option3" type="radio">
							    Option three is disabled
							  </label>
							</div>
							<div class="radio ">
							  <label>
							    <input name="optionsRadios" id="optionsRadios3" value="option3" type="radio">
							    other
							  </label>
							</div>
							</div>
							 <div class="form-group ">
								<textarea class="form-control"> </textarea>
							 </div>
							  <div class="form-group ">
								<button type="submit" class="btn btn-default btn-green">Save</button>
								<button type="submit" class="btn btn-default btn-green " id="my modal" data-dismiss="modal" aria-hidden="true">Cancel</button>
							  </div>

							</div></div></div>


							<!--  popover testing-->

						</td>
						<tr class="border_bottom"></tr>
						</table>
				

					</div>
				</div>
			</div>
	</div>
	</div>

	</section>
			<!--Footer-->
                <div class="copyright">
                <p>Copyright &copy; 2001-2017 Aetna Inc.</p>
                </div>
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
