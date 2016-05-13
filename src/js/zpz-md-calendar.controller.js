angular.module('zpzMdCalendar')
.controller('zpzMdCalendarCtrl', [
	'$scope',
	'zpzMdCalendarSvc',
	'zpzMdCalendarConst',
	'zpzMdCalendarDataSetObject',
	'zpzMdCalendarModelObject',
	'zpzMdCalendarUtilitySvc',
	function(
		$scope,
		zpzMdCalendarSvc,
		zpzMdCalendarConst,
		zpzMdCalendarDataSetObject,
		zpzMdCalendarModelObject,
		zpzMdCalendarUtilitySvc
	) {
		$scope.days = zpzMdCalendarConst.days;
		$scope.weeks = zpzMdCalendarConst.weeks;
		$scope.months = zpzMdCalendarConst.months;
		$scope.years = [];
		
		if($scope.ngConfig == undefined || $scope.ngConfig == null) {
			$scope.ngConfig = zpzMdCalendarSvc.constant.config.default;
		}
		if($scope.ngModel == undefined || $scope.ngModel == null) {
			$scope.ngModel = [];
		};
		
		/**
		 * Set configurations for the range of years available in the year selector
		 * ---------------------------------------------------------------------------
		 */
		if(
			!!$scope.ngConfig.model.range.year.start &&
			!$scope.ngConfig.model.range.year.end
		) {
			var end = (new Date()).getFullYear() + 5;
			for(var i = $scope.ngConfig.model.range.year.start;
				i < end; ++i) {
				$scope.years.unshift(i);
			}
		} else if(
			!$scope.ngConfig.model.range.year.start &&
			!$scope.ngConfig.model.range.year.end
		) {
			var end = (new Date()).getFullYear() + 5;
			for(var i = 1990;
				i < end; ++i) {
				$scope.years.unshift(i);
			}
		} else {
			for(var i = $scope.ngConfig.model.range.year.start;
				i < $scope.ngConfig.model.range.year.end; ++i) {
				$scope.years.unshift(i);
			}
		}
		
		if($scope.ngConfig.control.selectOtherMonths == true &&
			$scope.ngConfig.view.display.showOtherMonths == false) {
			console.error('`control.selectOtherMonths` cannot be `true` when `view.display.showOtherMonths` is false. Setting `view.display.showOtherMonths` to `true`.');
			$scope.ngConfig.view.display.showOtherMonths = true;
		}
		
		/**
		 * Navigation handlers
		 * ---------------------------------------------------------------------------
		 */
		$scope.onNavigate = {
			assignCurrentDay: function() {
				$scope.ngModel.current.day = 
					zpzMdCalendarUtilitySvc.getDayGivenDate(
						$scope.ngModel.current.date,
						$scope.ngModel.current.month,
						$scope.ngModel.current.year
					);
			},
			nextDay: function() {
				$scope.ngModel.nextDay();
				$scope.onNavigate.dayChanged();
			},
			previousDay: function() {
				$scope.ngModel.previousDay();
				$scope.onNavigate.dayChanged();
			},
			nextMonth: function() {
				$scope.ngModel.nextMonth();
				$scope.onNavigate.monthChanged();
			},
			previousMonth: function() {
				$scope.ngModel.previousMonth();
				$scope.onNavigate.monthChanged();
			},
			nextYear: function() {
				$scope.ngModel.nextYear();
				$scope.onNavigate.yearChanged();
			},
			previousYear: function() {
				$scope.ngModel.previousYear();
				$scope.onNavigate.yearChanged();
			},
			dayChanged: function() {
				$scope.onNavigate.assignCurrentDay();
				$scope.ngModel.updateView();
			},
			monthChanged: function() {
				$scope.onNavigate.assignCurrentDay();
				$scope.ngModel.init();
				$scope.ngModel.updateView();
			},
			yearChanged: function() {
				$scope.onNavigate.assignCurrentDay();
				$scope.ngModel.init();
				$scope.ngModel.updateView();
			}
		};
		
		/**
		 * Click handler for the settings button
		 * ---------------------------------------------------------------------------
		 */
		$scope.options = {
			onClick: function($mdOpenMenu, $event) {
				$mdOpenMenu($event);
			}
		};
		
		/**
		 * Click handler for the calendar cells
		 * ---------------------------------------------------------------------------
		 */
		$scope.date = {
			onClick: function(selectedItem, selectedDay) {
				selectedItem.day = selectedDay;
				if($scope.ngConfig.control.selectOtherMonths) {
					if(
						selectedItem.month == $scope.ngModel.current.month
					) {
						switch($scope.ngConfig.control.selectLevels) {
							case 2:
								if(selectedItem.date == $scope.ngModel.current.date) {
									$scope.ngModel.selected.year = $scope.ngModel.current.year;
									$scope.ngModel.selected.month = selectedItem.month;
									$scope.ngModel.selected.date = selectedItem.date;
									$scope.ngModel.selected.day = selectedItem.day;
								} else {
									$scope.ngModel.current.date = selectedItem.date;
									$scope.ngModel.current.day = selectedItem.day;
								}
								break;
							case 1:
								$scope.ngModel.selected.year = $scope.ngModel.current.year;
								$scope.ngModel.selected.month = selectedItem.month;
								$scope.ngModel.selected.date = selectedItem.date;
								$scope.ngModel.selected.day = selectedItem.day;
								break;
							case 0: default:
								break;
						}
					} else if(
						(selectedItem.month > $scope.ngModel.current.month) ||
						( (selectedItem.month == 0) && $scope.ngModel.current.month == 11)
					) {
						// monthal increment
						$scope.ngModel.current.date = selectedItem.date;
						$scope.ngModel.current.day = selectedItem.day;
						$scope.ngModel.nextMonth();
					} else if(
						// monthal decrement
						(selectedItem.month < $scope.ngModel.current.month) ||
						( (selectedItem.month == 11) && $scope.ngModel.current.month == 0 )
					) {
						$scope.ngModel.current.date = selectedItem.date;
						$scope.ngModel.current.day = selectedItem.day;
						$scope.ngModel.previousMonth();
					}
				} else {
					if(selectedItem.month == $scope.ngModel.current.month) {
						switch($scope.ngConfig.control.selectLevels) {
							case 2:
								if(selectedItem.date == $scope.ngModel.current.date) {
									$scope.ngModel.selected.year = $scope.ngModel.current.year;
									$scope.ngModel.selected.month = $scope.ngModel.current.month;
									$scope.ngModel.selected.date = selectedItem.date;
									$scope.ngModel.selected.day = selectedItem.day;
								} else {
									$scope.ngModel.current.date = selectedItem.date;
									$scope.ngModel.current.day = selectedItem.day;
								}
								break;
							case 1:
								$scope.ngModel.selected.year = $scope.ngModel.current.year;
								$scope.ngModel.selected.month = $scope.ngModel.current.month;
								$scope.ngModel.selected.date = selectedItem.date;
								$scope.ngModel.selected.day = selectedItem.day;
								break;
							case 0: default:
								break;
						}
					}
				}
				
				$scope.ngModel.updateView();
			}
		};
		
		$scope.ngModel = new zpzMdCalendarModelObject(
			new zpzMdCalendarDataSetObject($scope.ngModel),
			$scope.ngConfig.model
		);
		$scope.ngModel.init();
		$scope.onNavigate.assignCurrentDay();
		$scope.ngModel.updateView();
	}
]);