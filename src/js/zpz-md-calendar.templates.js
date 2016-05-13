/**
 * This module declares directives for use in zpzMdCalendar.
 * Directive template code is stored in the file postfixed
 * with `.templates.data.js`.
 * 
 * @since v1.0.0
 * @author Joseph <joseph-at-joeir-dot-net>
 */
angular.module("zpzMdCalendarTemplates", [])
/**
 * Core directive for displaying the entire product.
 * 
 * @example 
 * 	<zpz-md-calendar 
 * 		ng-config="config : Object"
 * 		ng-model="data : Array[zpzMdCalendarDataRowObject]"
 * 	></zpz-md-calendar>
 * 
 * @since v1.0.0
 * @author Joseph <joseph-at-joeir-dot-net>
 */
.directive('zpzMdCalendar', [
	'zpzMdCalendarSvc',
	function(
		zpzMdCalendarSvc
	) {
		return {
			controller: 'zpzMdCalendarCtrl',
			restrict: 'E',
			scope: {
				ngConfig: '=',
				ngModel: '='
			},
			templateUrl: (
				zpzMdCalendarSvc.constant.templateFile.element.main ||
				'zpz/mdcalendar/template/zpz-md-calendar.html'
			)
		}
	}
])
/**
 * Directive for the options button.
 * 
 * @example 
 * 	<zpz-md-calendar-button-options>
 * 	</zpz-md-calendar-button-options>
 * 
 * @since v1.0.0
 * @author Joseph <joseph-at-joeir-dot-net>
 */
.directive('zpzMdCalendarButtonOptions', [
	'zpzMdCalendarSvc',
	function(
		zpzMdCalendarSvc
	) {
		return {
			replace: true,
			restrict: 'E',
			templateUrl: (
				zpzMdCalendarSvc.constant.templateFile.button.options ||
				'zpz/mdcalendar/template/zpz-md-calendar-button-options.html'
			),
		};
	}
])
/**
 * Displays the date number
 * 
 * @example 
 * 	<zpz-md-calendar-element-date>
 * 	</zpz-md-calendar-element-date>
 * 
 * @since v1.0.0
 * @author Joseph <joseph-at-joeir-dot-net>
 */
.directive('zpzMdCalendarElementDate', [
	'zpzMdCalendarSvc',
	function(
		zpzMdCalendarSvc
	) {
		return {
			replace: true,
			restrict: 'E',
			templateUrl: (
				zpzMdCalendarSvc.constant.templateFile.element.date ||
				'zpz/mdcalendar/template/zpz-md-calendar-element-date.html'
			),
		}
	}
])
/**
 * Displays number of events within a date cell.
 * 
 * @example 
 * 	<zpz-md-calendar-element-events>
 * </zpz-md-calendar-element-events>
 * 
 * @since v1.0.0
 * @author Joseph <joseph-at-joeir-dot-net>
 */
.directive('zpzMdCalendarElementEvents', [
	'zpzMdCalendarSvc',
	function(
		zpzMdCalendarSvc
	) {
		return {
			replace: true,
			restrict: 'E',
			templateUrl: (
				zpzMdCalendarSvc.constant.templateFile.element.events ||
				'zpz/mdcalendar/template/zpz-md-calendar-element-events.html'
			),
		}
	}
])
/**
 * The header/footer showing a month and year selector
 * and the inter-date/month/year navigation controls
 * 
 * @example 
 * 	<zpz-md-calendar-toolbar-controller>
 *  </zpz-md-calendar-toolbar-controller>
 * 
 * @since v1.0.0
 * @author Joseph <joseph-at-joeir-dot-net>
 */
.directive('zpzMdCalendarToolbarController', [
	'zpzMdCalendarSvc',
	function(
		zpzMdCalendarSvc
	) {
		return {
			replace: true,
			restrict: 'E',
			templateUrl: (
				zpzMdCalendarSvc.constant.templateFile.toolbar.controller ||
				'zpz/mdcalendar/template/zpz-md-calendar-toolbar-controller.html'
			),
		};
	}
])
/**
 * The day headers displaying name of the days (ie
 * Mon, Tue, Wed etc).
 * 
 * @example 
 * 	<zpz-md-calendar-toolbar-days>
 * 	</zpz-md-calendar-toolbar-days>
 * 
 * @since v1.0.0
 * @author Joseph <joseph-at-joeir-dot-net>
 */
.directive('zpzMdCalendarToolbarDays', [
	'zpzMdCalendarSvc',
	function(
		zpzMdCalendarSvc
	) {
		return {
			replace: true,
			restrict: 'E',
			templateUrl: (
				zpzMdCalendarSvc.constant.templateFile.toolbar.days ||
				'zpz/mdcalendar/template/zpz-md-calendar-toolbar-days.html'
			),
		};
	}
]);