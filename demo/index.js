angular.module('zpzMdCalendarDemo', [
	'ngMaterial',
	'ngMessages',
	'ngSanitize',
	'zpzMdCalendar'
])
.controller('masterCtrl', [
	'$interval',
	'$scope',
	'dataSvc',
	'zpzMdCalendarSvc',
	function(
		$interval,
		$scope,
		dataSvc,
		zpzMdCalendarSvc
	) {
		var dataRows = dataSvc.getMockData();
		$scope.config = {
			view: {
				display: {
					navigation: {
						year: false
					}
				}
			}
		};
		$scope.days = zpzMdCalendarSvc.constant.days;
		$scope.months = zpzMdCalendarSvc.constant.months;
		$scope.dataModel = dataSvc.getMockData();
	}
])