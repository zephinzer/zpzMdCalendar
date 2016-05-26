angular.module('zpzMdCalendar', [
	'ngMaterial',
	'ngMessages',
	'zpzMdCalendarTemplates',
])
.provider('zpzMdCalendarSvc', [
	function() {
		var pvd = {};
		
		pvd.templateFile = {
			button: {
				options: null
			},
			toolbar: {
				controller: null,
				days: null,
			},
			element: {
				form: null,
				main: null
			}
		};
		
		pvd.template = function(
			componentType,
			componentName,
			componentUrl
		) {
			this.templateFile[componentType][componentName] = componentUrl;
			return pvd;
		};
		
		pvd.$get = [
			'zpzMdCalendarConst',
			'zpzMdCalendarDataRowObject',
			function(
				zpzMdCalendarConst,
				zpzMdCalendarDataRowObject
			) {
				var svc = {};
				
				/// initialize constants
				zpzMdCalendarConst.templateFile = pvd.templateFile;
				svc.constant = zpzMdCalendarConst;
				
				svc.createEvent = function(
					title,
					description,
					dateStart,
					dateEnd,
					options,
					data
				) {
					return new zpzMdCalendarDataRowObject(
						title,
						description,
						dateStart,
						dateEnd,
						options,
						data
					);
				};
				
				return svc;
			}
		];
		
		return pvd;
	}
]);
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
				ngConfig: '=?',
				ngModel: '=?'
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
angular.module("zpzMdCalendarTemplates").run(["$templateCache", function($templateCache) {$templateCache.put("zpz/mdcalendar/template/zpz-md-calendar.html","<style>\n	md-select:not([disabled]):focus .md-select-value {\n		border-bottom-color: {{ngConfig.view.display.date.selected.background.color || \'#d01818\'}} !important; \n	}\n	md-select-menu md-option[selected] {\n		color: {{ngConfig.view.display.date.selected.background.color || \'#d01818\'}} !important;\n	}\n	.zpz-md-calendar.container {\n		font-family: {{ngConfig.view.display.font.family || \'Source Code Pro\'}} !important;\n	}\n	.zpz-md-calendar.container .week .date {\n		background-color: {{ngConfig.view.display.date.background.color || \'#FFFFFF\'}};\n	}\n	/* view.display.checkered == true */\n	.zpz-md-calendar.container.checkered .week:nth-child(2n) .date:nth-child(2n+1),\n	.zpz-md-calendar.container.checkered .week:nth-child(2n+1) .date:nth-child(2n) {\n		background-color: {{ngConfig.view.display.date.checks.background.color.light || \'rgba(255,255,255,0.3)\'}};\n	}\n	.zpz-md-calendar.container.checkered .week:nth-child(2n) .date:nth-child(2n),\n	.zpz-md-calendar.container.checkered .week:nth-child(2n+1) .date:nth-child(2n+1) {\n		background-color: {{ngConfig.view.display.date.checks.background.color.dark || \'rgba(255,255,255,0.5)\'}};\n	}\n	/* end */\n	.zpz-md-calendar.container .week .date .label {\n		color: {{ngConfig.view.display.date.color || \'#333333\'}} !important;\n		font-family: {{ngConfig.view.display.date.font.family}} !important;\n		font-size: {{ngConfig.view.display.date.font.size || \'1.1em\'}};\n	}\n	/* view.display.date.today */\n	.zpz-md-calendar.container .week .date.today {\n		background-color: {{ngConfig.view.display.date.today.background.color || \'transparent\'}} !important;\n	}\n	.zpz-md-calendar.container .week .date.today .label {\n		color: {{ngConfig.view.display.date.today.color || \'#00FF00\'}} !important;\n		font-weight: {{ngConfig.view.display.date.today.fontWeight || \'600\'}} !important;\n	}\n	/**/\n	/* view.display.date.inactive */\n	.zpz-md-calendar.container .week .date.inactive {\n		background-color: {{ngConfig.view.display.date.inactive.background.color || \'transparent\'}} !important;\n	}\n	.zpz-md-calendar.container .week .date.inactive .label { \n		color: {{ngConfig.view.display.date.inactive.color || \'#CCC\'}} !important;\n	}\n	/**/\n	/* view.display.date.inactive */\n	.zpz-md-calendar.container .week .date.disabled {\n		background-color: {{ngConfig.view.display.date.inactive.background.color || \'transparent\'}} !important;\n	}\n	.zpz-md-calendar.container .week .date.disabled .label { \n		color: {{ngConfig.view.display.date.inactive.color || \'#CCC\'}} !important;\n		transform: none !important;\n		-webkit-transform: none !important;\n	}\n	/**/\n	/* view.display.date.active */\n	.zpz-md-calendar.container .week .date.active {\n		background-color: {{ngConfig.view.display.date.active.background.color || \'transparent\'}} !important;\n		cursor:pointer;\n	}\n	.zpz-md-calendar.container .week .date.active .label { \n		color: {{ngConfig.view.display.date.active.color || \'#5599FF\'}} !important;\n	}\n	/**/\n	/* view.display.date.selected */\n	.zpz-md-calendar.container .week .date.selected {\n		background-color: {{ngConfig.view.display.date.selected.background.color || \'transparent\'}} !important;\n	}\n	.zpz-md-calendar.container .week .date.selected .label {\n		color: {{ngConfig.view.display.date.selected.color || \'#FF0000\'}} !important;\n	}\n	/**/\n	/* view.display.date.inactive */\n	.zpz-md-calendar.container .week .date.inactive.selected,\n	.zpz-md-calendar.container .week .date.disabled.selected {\n		background-color: {{ngConfig.view.display.date.inactiveSelected.background.color || \'#FFC8C8\'}} !important;\n	}\n	.zpz-md-calendar.container .week .date.inactive.selected .label,\n	.zpz-md-calendar.container .week .date.disabled.selected .label { \n		color: {{ngConfig.view.display.date.inactiveSelected.color || \'#FEFEFE\'}} !important;\n	}\n	/**/\n	/* view.display.date.hidden */\n	.zpz-md-calendar.container .week .date.hidden.selected {\n		background-color: {{ngConfig.view.display.date.inactiveSelected.background.color || \'transparent\'}} !important;\n	}\n	.zpz-md-calendar.container .week .date.hidden.selected .label { \n		color: {{ngConfig.view.display.date.inactiveSelected.color || \'transparent\'}} !important;\n	}\n	/**/\n	/* view.display.date.event.indicator */\n	.zpz-md-calendar.container .week .date .events-container .event .indicator {\n		color: {{ngConfig.view.display.date.event.indicator.color || \'#000000\'}} !important;\n	}\n	/**/\n	.zpz-md-calendar.container .week .date,\n	.zpz-md-calendar.container .week .date .label {\n		cursor: default;\n		transition: {{ngConfig.view.display.animation.transitionTime}} ease all;\n	}\n	@media screen and (max-width:230px) {\n		.zpz-md-calendar.container .week .date .label {\n			font-size:0.8em;\n		}\n	}\n</style>\n<div class=\"zpz-md-calendar container\"\n	layout=\"column\"\n	ng-class=\"{\n		\'checkered\': ngConfig.view.display.checkered == true\n	}\"\n	ng-init=\"ngModel.init()\"\n	style=\"height:100%;widht:100%;\">\n	<zpz-md-calendar-toolbar-controller\n		ng-if=\"ngConfig.view.month.controller.visible == true &&\n			ngConfig.view.month.controller.position == \'top\'\"\n	></zpz-md-calendar-toolbar-controller>\n	\n	<div ng-if=\"ngConfig.view.month.controller.layout == 1 &&ngConfig.view.month.controller.position ==\'bottom\'\">\n		<div class=\"toolbar options\"\n			layout=\"column\"\n			ng-if=\"ngConfig.view.display.options.visible == true\">\n			<zpz-md-calendar-button-options\n				ng-if=\"ngConfig.view.display.options.visible == true\"\n			></zpz-md-calendar-button-options>\n		</div>\n	</div>\n	\n	<zpz-md-calendar-toolbar-days\n		ng-if=\"ngConfig.view.month.dayNames.visible && \n			ngConfig.view.month.dayNames.position == \'top\'\"\n	></zpz-md-calendar-toolbar-days>\n	\n	<div flex\n		layout=\"column\">\n		<div class=\"week\"\n			flex\n			layout=\"row\"\n			ng-if=\"($index == 0) || (!!ngModel.view.data[$index][0].date)\"\n			ng-init=\"week.index = $index\"\n			ng-repeat=\"week in weeks\">\n			<div class=\"toolbar week\"\n				layout=\"column\"\n				layout-align=\"center\"\n				ng-if=\"ngConfig.view.month.weekNumber.visible\">\n				<small ng-bind=\"$index\"></small>\n			</div>\n			<div class=\"date\"\n				flex \n				id=\"date_{{ngModel.current.year + \'_\' + ngModel.current.month + \'_\' + ngModel.view.data[week.index][$index].date}}\"\n				layout=\"column\"\n				ng-class=\"{\n					\'today\'				: (ngModel.current.today.year == ngModel.current.year) &&\n											(ngModel.current.today.month == ngModel.current.month) &&\n											(ngModel.view.data[week.index][$index].month == ngModel.current.month) &&\n											(ngModel.view.data[week.index][$index].date == ngModel.current.today.date),\n					\'active\'			: (ngModel.view.data[week.index][$index].month == ngModel.current.month) &&\n											(ngModel.view.data[week.index][$index].date == ngModel.current.date) &&\n											(ngConfig.control.selectLevels == 2),\n					\'selected\'			: (ngModel.selected.year == ngModel.current.year) &&\n											(ngModel.selected.month == ngModel.view.data[week.index][$index].month) &&\n											(ngModel.selected.date == ngModel.view.data[week.index][$index].date) &&\n											(ngConfig.control.selectLevels >= 1),\n					\'inactive\'			: (ngConfig.control.selectOtherMonths) && \n											(ngModel.view.data[week.index][$index].month != ngModel.current.month),\n					\'disabled\'			: ( (!ngConfig.control.selectOtherMonths && ngConfig.view.display.showOtherMonths) && \n											(ngModel.view.data[week.index][$index].month != ngModel.current.month) ) ||\n											ngModel.view.data[week.index][$index].outOfRange,\n					\'hidden\'			: !(ngConfig.control.selectOtherMonths || ngConfig.view.display.showOtherMonths) && \n											(ngModel.view.data[week.index][$index].month != ngModel.current.month),\n					\'hover-scale\'		: (ngConfig.view.display.date.hover.effect == \'scale\'),\n					\'hover-translate\'	: (ngConfig.view.display.date.hover.effect == \'translate\'),\n				}\"\n				ng-click=\"date.onClick(ngModel.view.data[week.index][$index], (($index + ngConfig.model.firstDay) > 6) ? (7 - ($index + ngConfig.model.firstDay)) : ($index + ngConfig.model.firstDay))\"\n				ng-repeat=\"day in days\"\n				style=\"position:relative;\">\n				<zpz-md-calendar-element-date\n					ng-if=\"\n						(ngModel.view.data[week.index][$index].month == ngModel.current.month) ||\n						(ngConfig.view.display.showOtherMonths == true)\n					\"\n				></zpz-md-calendar-element-date>\n				<zpz-md-calendar-element-events\n					ng-if=\"ngConfig.view.display.date.event.visible == true\">\n				<zpz-md-calendar-element-events>\n			</div>\n		</div>\n	</div>\n	<zpz-md-calendar-toolbar-days\n		ng-if=\"ngConfig.view.month.dayNames.visible && \n			ngConfig.view.month.dayNames.position == \'bottom\'\"\n	></zpz-md-calendar-toolbar-days>\n\n	<div ng-if=\"ngConfig.view.month.controller.layout == 1 &&ngConfig.view.month.controller.position ==\'top\'\">\n		<div class=\"toolbar options\"\n			layout=\"column\"\n			ng-if=\"ngConfig.view.display.options.visible == true\">\n			<zpz-md-calendar-button-options\n				ng-if=\"ngConfig.view.display.options.visible == true\"\n			></zpz-md-calendar-button-options>\n		</div>\n	</div>\n	<zpz-md-calendar-toolbar-controller\n		ng-if=\"ngConfig.view.month.controller.visible == true &&\n			ngConfig.view.month.controller.position == \'bottom\'\"\n	></zpz-md-calendar-toolbar-controller>\n</div>");
$templateCache.put("zpz/mdcalendar/template/zpz-md-calendar-button-options.html","<md-menu id=\"button-options\">\n	<md-button aria-label=\"Settings\"\n		ng-class=\"{\n			\'full-width\': ngConfig.view.month.controller.layout == 1,\n			\'md-icon-button\': ngConfig.view.month.controller.layout == 2\n		}\"\n		ng-click=\"options.onClick($mdOpenMenu, $event)\">\n		<div layout=\"row\"\n			layout-align=\"center center\"\n			ng-if=\"ngConfig.view.month.controller.layout == 1\">\n			<div style=\"text-align:center;width:1.5em;\">\n				<i class=\"fa fa-gear\"></i>\n			</div>\n			Settings\n		</div>\n		<i class=\"fa fa-gear\" ng-if=\"ngConfig.view.month.controller.layout == 2\"></i>\n	</md-button>\n	<md-menu-content>\n		<md-menu-item>\n			<md-button aria-label=\"Year Navigation\"\n				ng-click=\"ngConfig.view.display.navigation.year = !ngConfig.view.display.navigation.year\">\n				<div layout=\"row\"\n					layout-align=\"start center\">\n					<div style=\"width:2em;text-align:center;\">\n						<i class=\"fa fa-check-circle\"\n							ng-if=\"ngConfig.view.display.navigation.year == true\"\n							style=\"color:#008800;\"></i>\n						<i class=\"fa fa-circle-thin\"\n							ng-if=\"ngConfig.view.display.navigation.year == false\"\n							style=\"color:#CCC;\"></i>\n					</div>\n					Year Navigation\n				</div>\n			</md-button>\n		</md-menu-item>\n		<md-menu-item>\n			<md-button aria-label=\"Month Navigation\"\n				ng-click=\"ngConfig.view.display.navigation.month = !ngConfig.view.display.navigation.month\">\n				<div layout=\"row\"\n					layout-align=\"start center\">\n					<div style=\"width:2em;text-align:center;\">\n						<i class=\"fa fa-check-circle\"\n							ng-if=\"ngConfig.view.display.navigation.month == true\"\n							style=\"color:#008800;\"></i>\n						<i class=\"fa fa-circle-thin\"\n							ng-if=\"ngConfig.view.display.navigation.month == false\"\n							style=\"color:#CCC;\"></i>\n					</div>\n					Month Navigation\n				</div>\n			</md-button>\n		</md-menu-item>\n		<md-menu-item>\n			<md-button aria-label=\"Day Navigation\"\n				ng-click=\"ngConfig.view.display.navigation.date = !ngConfig.view.display.navigation.date\">\n				<div layout=\"row\"\n					layout-align=\"start center\">\n					<div style=\"width:2em;text-align:center;\">\n						<i class=\"fa fa-check-circle\"\n							ng-if=\"ngConfig.view.display.navigation.date == true\"\n							style=\"color:#008800;\"></i>\n						<i class=\"fa fa-circle-thin\"\n							ng-if=\"ngConfig.view.display.navigation.date == false\"\n							style=\"color:#CCC;\"></i>\n					</div>\n					Day Navigation\n				</div>\n			</md-button>\n		</md-menu-item>\n		<md-divider></md-divider>\n		<md-menu-item>\n			<md-button aria-label=\"Checkered Calendar\"\n				ng-click=\"ngConfig.view.display.checkered = !ngConfig.view.display.checkered\">\n				<div layout=\"row\"\n					layout-align=\"start center\">\n					<div style=\"width:2em;text-align:center;\">\n						<i class=\"fa fa-check-circle\"\n							ng-if=\"ngConfig.view.display.checkered == true\"\n							style=\"color:#008800;\"></i>\n						<i class=\"fa fa-circle-thin\"\n							ng-if=\"ngConfig.view.display.checkered == false\"\n							style=\"color:#CCC;\"></i>\n					</div>\n					Checkered Calendar\n				</div>\n			</md-button>\n		</md-menu-item>\n		<md-menu-item>\n			<md-button aria-label=\"Other Months Visible\"\n				ng-click=\"ngConfig.view.display.showOtherMonths = !ngConfig.view.display.showOtherMonths\">\n				<div layout=\"row\"\n					layout-align=\"start center\">\n					<div style=\"width:2em;text-align:center;\">\n						<i class=\"fa fa-check-circle\"\n							ng-if=\"ngConfig.view.display.showOtherMonths == true\"\n							style=\"color:#008800;\"></i>\n						<i class=\"fa fa-circle-thin\"\n							ng-if=\"ngConfig.view.display.showOtherMonths == false\"\n							style=\"color:#CCC;\"></i>\n					</div>\n					Other Months Visible\n				</div>\n			</md-button>\n		</md-menu-item>\n		<md-divider></md-divider>\n		<md-menu-item>\n			<md-button aria-label=\"Day Headers\"\n				ng-click=\"ngConfig.view.month.dayNames.visible = !ngConfig.view.month.dayNames.visible\">\n				<div layout=\"row\"\n					layout-align=\"start center\">\n					<div style=\"width:2em;text-align:center;\">\n						<i class=\"fa fa-check-circle\"\n							ng-if=\"ngConfig.view.month.dayNames.visible == true\"\n							style=\"color:#008800;\"></i>\n						<i class=\"fa fa-circle-thin\"\n							ng-if=\"ngConfig.view.month.dayNames.visible == false\"\n							style=\"color:#CCC;\"></i>\n					</div>\n					Day Name Header Bar\n				</div>\n			</md-button>\n		</md-menu-item>\n		<md-menu-item>\n			<md-button aria-label=\"Week Numbers\"\n				ng-click=\"ngConfig.view.month.weekNumber.visible = !ngConfig.view.month.weekNumber.visible\">\n				<div layout=\"row\"\n					layout-align=\"start center\">\n					<div style=\"width:2em;text-align:center;\">\n						<i class=\"fa fa-check-circle\"\n							ng-if=\"ngConfig.view.month.weekNumber.visible == true\"\n							style=\"color:#008800;\"></i>\n						<i class=\"fa fa-circle-thin\"\n							ng-if=\"ngConfig.view.month.weekNumber.visible == false\"\n							style=\"color:#CCC;\"></i>\n					</div>\n					Week Numbers Bar\n				</div>\n			</md-button>\n		</md-menu-item>\n	</md-menu-content>\n</md-menu>");
$templateCache.put("zpz/mdcalendar/template/zpz-md-calendar-element-date.html","<div \n	layout=\"column\"\n	layout-align=\"start start\"\n	style=\"\n	bottom:0;\n	height:100%;\n	position:absolute;\n	top:0;\n	width:100%;\n	z-index:5;\n\">\n	<span class=\"label\"\n		style=\"padding:4px;\">\n		{{ngModel.view.data[week.index][$index].date}}\n	</span>\n</div>");
$templateCache.put("zpz/mdcalendar/template/zpz-md-calendar-element-events.html","<div \n	class=\"events-container\"\n	layout=\"row\"\n	layout-align=\"end end\"\n	layout-wrap\n	style=\"\n	bottom:0;\n	height:100%;\n	padding:3px;\n	position:absolute;\n	top:0;\n	width:100%;\n	z-index:3;\n\">\n	<div class=\"event\" \n		ng-if=\"\n			(ngModel.view.data[week.index][$index].month == ngModel.current.month) ||\n			(ngConfig.view.display.showOtherMonths == true)\n		\"\n		style=\"font-size:10px;\">\n		<i class=\"{{ngConfig.view.display.date.event.indicator.classes}}\"\n			ng-class=\"{\'indicator\':true}\"\n			ng-if=\"\n				(ngConfig.view.display.date.event.indicator.style == \'dots\') ||\n				(ngConfig.view.display.date.event.indicator.style == \'both\')\n			\"\n			ng-repeat=\"\n				item in ngModel.data.data.map[ngModel.current.year][ngModel.view.data[week.index][$index].month][ngModel.view.data[week.index][$index].date]\n			\"\n			style=\"padding:1px;\">\n		</i><i class=\"{{ngConfig.view.display.date.event.indicator.classes}}\"\n			ng-class=\"{\'indicator\':true}\"\n			ng-if=\"\n				(ngConfig.view.display.date.event.indicator.style == \'dots\') ||\n				(ngConfig.view.display.date.event.indicator.style == \'both\')\n			\"\n			ng-repeat=\"\n				item in ngModel.data.data.every[\'year\'][ngModel.view.data[week.index][$index].month][ngModel.view.data[week.index][$index].date]\n			\"\n			style=\"padding:1px;\">\n		</i><i class=\"{{ngConfig.view.display.date.event.indicator.classes}}\"\n			ng-class=\"{\'indicator\':true}\"\n			ng-if=\"\n				(ngConfig.view.display.date.event.indicator.style == \'dots\') ||\n				(ngConfig.view.display.date.event.indicator.style == \'both\')\n			\"\n			ng-repeat=\"\n				item in ngModel.data.data.every[\'month\'][ngModel.view.data[week.index][$index].date]\n			\"\n			style=\"padding:1px;\">\n		</i><i class=\"{{ngConfig.view.display.date.event.indicator.classes}}\"\n			ng-class=\"{\'indicator\':true}\"\n			ng-if=\"\n				(ngConfig.view.display.date.event.indicator.style == \'dots\') ||\n				(ngConfig.view.display.date.event.indicator.style == \'both\')\n			\"\n			ng-repeat=\"\n				item in ngModel.data.data.every[\'week\'][( (($index + ngConfig.model.firstDay) > 6) ? (7 - ($index + ngConfig.model.firstDay)) : ($index + ngConfig.model.firstDay) )]\n			\"\n			style=\"padding:1px;\">\n		</i>\n		<span\n			ng-bind=\"\'[\' \n				+ \n				(\n					ngModel.data.data.map[ngModel.current.year][ngModel.view.data[week.index][$index].month][ngModel.view.data[week.index][$index].date].length +\n					ngModel.data.data.every[\'year\'][ngModel.view.data[week.index][$index].month][ngModel.view.data[week.index][$index].date].length +\n					ngModel.data.data.every[\'month\'][ngModel.view.data[week.index][$index].date].length + \n					ngModel.data.data.every[\'week\'][( (($index + ngConfig.model.firstDay) > 6) ? (7 - ($index + ngConfig.model.firstDay)) : ($index + ngConfig.model.firstDay) )].length\n				) \n				+  \n			\']\'\" \n			ng-if=\"\n				( (ngConfig.view.display.date.event.indicator.style == \'number\') ||\n					(ngConfig.view.display.date.event.indicator.style == \'both\')\n				) && (\n					(\n						ngModel.data.data.map[ngModel.current.year][ngModel.view.data[week.index][$index].month][ngModel.view.data[week.index][$index].date].length +\n						ngModel.data.data.every[\'year\'][ngModel.view.data[week.index][$index].month][ngModel.view.data[week.index][$index].date].length +\n						ngModel.data.data.every[\'month\'][ngModel.view.data[week.index][$index].date].length + \n						ngModel.data.data.every[\'week\'][( (($index + ngConfig.model.firstDay) > 6) ? (7 - ($index + ngConfig.model.firstDay)) : ($index + ngConfig.model.firstDay) )].length\n					) \n					> 0\n				)\n			\"\n			style=\"font-size:1.5em;\">\n		</span>\n	</div>\n</div>");
$templateCache.put("zpz/mdcalendar/template/zpz-md-calendar-toolbar-controller.html","<div class=\"toolbar top\"\n	layout=\"row\"\n	layout-align=\"center center\">\n	<div layout=\"row\"\n		layout-align=\"start center\"\n		ng-class=\"{\n			\'flex-xs-30 flex-20\': ngConfig.view.month.controller.layout == 1\n		}\"\n		ng-if=\"ngConfig.view.month.controller.layout == 1\">\n		\n		<md-button aria-label=\"Previous Year\"\n			class=\"md-icon-button\"\n			ng-click=\"onNavigate.previousYear()\"\n			ng-if=\"ngConfig.view.display.navigation.year == true\"\n			style=\"margin:0;\">\n			<md-tooltip aria-label=\"Previous Year\"\n				md-direction=\"right\"\n				ng-if=\"ngConfig.view.display.navigation.tooltip == true\">\n				Previous Year\n			</md-tooltip>\n			<i class=\"fa fa-chevron-left fa-2x\"></i>\n		</md-button>\n		<md-button aria-label=\"Previous Month\"\n			class=\"md-icon-button\"\n			ng-click=\"onNavigate.previousMonth()\"\n			ng-if=\"ngConfig.view.display.navigation.month == true\"\n			style=\"margin:0;\">\n			<md-tooltip aria-label=\"Previous Month\"\n				md-direction=\"right\"\n				ng-if=\"ngConfig.view.display.navigation.tooltip == true\">\n				Previous Month\n			</md-tooltip>\n			<i class=\"fa fa-caret-left fa-2x\"></i>\n		</md-button>\n		<md-button aria-label=\"Previous Day\"\n			class=\"md-icon-button\"\n			ng-click=\"ngModel.previousDay()\"\n			ng-if=\"ngConfig.view.display.navigation.date == true\"\n			style=\"margin:0;\">\n			<md-tooltip aria-label=\"Yesterday\"\n				md-direction=\"right\"\n				ng-if=\"ngConfig.view.display.navigation.tooltip == true\">\n				Yesterday\n			</md-tooltip>\n			<i class=\"fa fa-chevron-left\"></i>\n		</md-button>\n	</div>\n	<zpz-md-calendar-button-options\n		ng-if=\"ngConfig.view.month.controller.layout == 2 &&\n			ngConfig.view.display.options.visible == true\"\n	></zpz-md-calendar-button-options>\n	<div\n		layout=\"row\"\n		layout-wrap\n		ng-class=\"{\n			\'flex layout-align-center-center\': ngConfig.view.month.controller.layout == 1,\n			\'flex-xs-30 flex-40 layout-align-start-center\': ngConfig.view.month.controller.layout == 2\n		}\">\n		<div flex-gt-xs=\"5\" ng-if=\"ngConfig.view.display.options.visible != true\"></div>\n		<div flex-xs=\"100\"\n			layout-xs=\"row\">\n			<div hide-gt-xs style=\"width:10px;\"></div>\n			<div flex>\n				<md-select\n					aria-label=\"Month Selector\"\n					ng-change=\"onNavigate.monthChanged()\"\n					ng-model=\"ngModel.current.month\"\n					style=\"margin-top:0;margin-bottom:0;\">\n					<md-option ng-value=\"month.value\" ng-repeat=\"month in months\">\n						<span hide-xs ng-bind=\"month.full\"></span>\n						<span hide-gt-xs ng-bind=\"month.short\"></span>\n					</md-option>\n				</md-select>\n			</div>\n		</div>\n		<div flex-xs=\"100\"\n			layout-xs=\"row\">\n			<div hide-gt-xs style=\"width:10px;\"></div>\n			<div flex>\n				<md-select\n					aria-label=\"Year Selector\"\n					ng-change=\"onNavigate.yearChanged()\"\n					ng-model=\"ngModel.current.year\"\n					style=\"margin-top:0;margin-bottom:0;\">\n					<md-option ng-value=\"year\" ng-repeat=\"year in years\">\n						<span ng-bind=\"year\"></span>\n					</md-option>\n				</md-select>\n			</div>\n		</div>\n	</div>\n	<div \n		layout=\"row\"\n		layout-align=\"end center\"\n		ng-class=\"{\n			\'flex-xs-30 flex-20\': ngConfig.view.month.controller.layout == 1,\n			\'flex-xs-70 flex-60\': ngConfig.view.month.controller.layout == 2\n		}\">\n		<md-button aria-label=\"Previous Year\"\n			class=\"md-icon-button\"\n			ng-click=\"onNavigate.previousYear()\"\n			ng-if=\"ngConfig.view.month.controller.layout == 2 && (ngConfig.view.display.navigation.year == true)\"\n			style=\"margin:0;\">\n			<md-tooltip aria-label=\"Previous Year\"\n				md-direction=\"right\"\n				ng-if=\"ngConfig.view.display.navigation.tooltip == true\">\n				Previous Year\n			</md-tooltip>\n			<i class=\"fa fa-chevron-left fa-2x\"></i>\n		</md-button>\n		<md-button aria-label=\"Previous Month\"\n			class=\"md-icon-button\"\n			ng-click=\"onNavigate.previousMonth()\"\n			ng-if=\"ngConfig.view.month.controller.layout == 2 && (ngConfig.view.display.navigation.month == true)\"\n			style=\"margin:0;\">\n			<md-tooltip aria-label=\"Previous Month\"\n				md-direction=\"right\"\n				ng-if=\"ngConfig.view.display.navigation.tooltip == true\">\n				Previous Month\n			</md-tooltip>\n			<i class=\"fa fa-caret-left fa-2x\"></i>\n		</md-button>\n		<md-button aria-label=\"Previous Day\"\n			class=\"md-icon-button\"\n			ng-click=\"onNavigate.previousDay()\"\n			ng-if=\"ngConfig.view.month.controller.layout == 2 && (ngConfig.view.display.navigation.date == true)\"\n			style=\"margin:0;\">\n			<md-tooltip aria-label=\"Yesterday\"\n				md-direction=\"right\"\n				ng-if=\"ngConfig.view.display.navigation.tooltip == true\">\n				Yesterday\n			</md-tooltip>\n			<i class=\"fa fa-angle-left fa-2x\"></i>\n		</md-button>\n		<md-button aria-label=\"Next Day\"\n			class=\"md-icon-button\"\n			ng-click=\"onNavigate.nextDay()\"\n			ng-if=\"ngConfig.view.display.navigation.date == true\"\n			style=\"margin:0;\">\n			<md-tooltip aria-label=\"Tomorrow\"\n				md-direction=\"left\"\n				ng-if=\"ngConfig.view.display.navigation.tooltip == true\">\n				Tomorrow\n			</md-tooltip>\n			<i class=\"fa fa-angle-right fa-2x\"></i>\n		</md-button>\n		<md-button aria-label=\"Next Month\"\n			class=\"md-icon-button\"\n			ng-click=\"onNavigate.nextMonth()\"\n			ng-if=\"ngConfig.view.display.navigation.month == true\"\n			style=\"margin:0;\">\n			<md-tooltip aria-label=\"Next Month\"\n				md-direction=\"left\"\n				ng-if=\"ngConfig.view.display.navigation.tooltip == true\">\n				Next Month\n			</md-tooltip>\n			<i class=\"fa fa-caret-right fa-2x\"></i>\n		</md-button>\n		<md-button aria-label=\"Next Year\"\n			class=\"md-icon-button\"\n			ng-click=\"onNavigate.nextYear()\"\n			ng-if=\"ngConfig.view.display.navigation.year == true\"\n			style=\"margin:0;\">\n			<md-tooltip aria-label=\"Next Year\"\n				md-direction=\"left\"\n				ng-if=\"ngConfig.view.display.navigation.tooltip == true\">\n				Next Year\n			</md-tooltip>\n			<i class=\"fa fa-chevron-right fa-2x\"></i>\n		</md-button>\n	</div>\n</div>");
$templateCache.put("zpz/mdcalendar/template/zpz-md-calendar-toolbar-days.html","<div class=\"toolbar days\" \n	layout=\"row\"\n	style=\"background-color:{{ngConfig.view.month.dayNames.background.color || \'transparent\'}};\">\n	<div class=\"toolbar week\"\n		ng-if=\"ngConfig.view.month.weekNumber.visible\"></div>\n	\n	<div class=\"day\"\n		flex \n		layout=\"column\"\n		ng-repeat=\"day in days.slice(ngModel.config.firstDay)\"\n		style=\"color:{{ngConfig.view.month.dayNames.color || \'#333\'}};\">\n		<span ng-bind=\"day.short\" hide-xs></span>\n		<span ng-bind=\"day.alpha\" hide-gt-xs></span>\n	</div>\n	<div class=\"day\"\n		flex \n		layout=\"column\"\n		ng-repeat=\"day in days.slice(0, ngModel.config.firstDay)\"\n		style=\"color:{{ngConfig.view.month.dayNames.color || \'#333\'}};\">\n		<span ng-bind=\"day.short\" hide-xs></span>\n		<span ng-bind=\"day.alpha\" hide-gt-xs></span>\n	</div>\n</div>");}]);
angular.module('zpzMdCalendar')
.constant('zpzMdCalendarConst', {
	/**
	 * Configuration
	 */
	config: {
		/**
		 * Default configuration
		 */
		default: {
			control: {
				/**
				 * Allows cross-selection of months ie assuming
				 * we are currently in January, users will be
				 * allowed to select dates from December and
				 * February. Must be used in conjunction with
				 * `config.view.display.showOtherMonths` 
				 */
				selectOtherMonths: false,
				/**
				 * Number of selection levels. When 1, user 
				 * interaction with a date cell immediately
				 * indicates selection. When 2, user
				 * interaction with a date cell sets the
				 * cell to an active state but does not
				 * select it.
				 */
				selectLevels: 2
			},
			model: {
				range: {
					allowable: {
						// default.model.range.allowable.start
						start: {
							date: 4,
							month: 4,
							year: 2016
						},
						// default.model.range.allowable.end
						end: {
							date: null,
							month: null,
							year: null
						}
					},
					year: {
						/**
						 * Earliest year to show in the select
						 * box for years
						 */
						start: 1990,
						/**
						 * Latest year to show in the select
						 * box for years. Defaults to 5 years
						 * after the current year if set to
						 * `null`.
						 */
						end: null
					}
				},
				/**
				 * 0 based indexing of days starting from
				 * Sunday at 0. Monday is 1 and so on.
				 */
				firstDay: 1,
				/**
				 * Initial settings for the active date
				 */
				date: (new Date()).getDate(),
				/**
				 * Initial settings for the active month
				 */
				month: (new Date()).getMonth(),
				/**
				 * Initial setting sfor the active year
				 */
				year: (new Date()).getFullYear(),
			},
			view: {
				display: {
					animation: {
						/**
						 * This controls the duration for
						 * the changing of colours on the
						 * calendar
						 */
						transitionTime: '0.4s',
					},
					/**
					 * If set to true, alternates box
					 * colors
					 */
					checkered: true,
					/**
					 * Configuration options for the 
					 * date cell.
					 */
					date: {
						active: {
							background: {
								/**
								 * Background color for active cell
								 */
								color: '#e3e3e3'
							},
							/**
							 * Text color for active cell
							 */
							color: '#d01818',
						},
						/**
						 * This is only applied if `view.display.checkered` == false
						 * @see view.display.date.checks
						 */
						background: {
							color: '#FCFCFC',
						},
						/**
						 * This is only applied if `view.display.checkered` == true
						 * @see view.display.date.background
						 */
						checks: {
							background: {
								color: {
									dark: 'rgba(0,0,0,0.05)',
									light: 'rgba(0,0,0,0.01)',
								}
							}
						},
						/**
						 * Text color of the date cell's label (the date number)
						 */
						color: '#333',
						event: {
							/**
							 * If `true`, event indicators will appear
							 */
							visible: true,
							indicator: {
								/**
								 * Classes to apply to event indicator
								 * if style is set to `dot`
								 */
								classes: 'fa fa-circle ',
								/**
								 * Text color of indicators
								 */
								color: '#BBB',
								/**
								 * 'dots' results in symbol indicators
								 * where the number of symbols indicate
								 * the number of events on the date
								 * 
								 * 'number' results in a number indicating
								 * the number of events on the date
								 */
								style: 'dots' // {'dots', 'number', 'both'}
							}
						},
						font: {
							/**
							 * font-family as it would appear in the CSS
							 */
							family: '"Source Code Pro", serif',
							/**
							 * font-size of the text in the date element
							 */
							size: '1.1em'
						},
						hover: {
							/**
							 * {'translate', 'scale', 'none'}
							 * 	translate: cell dates move on hover
							 * 	scale: cell dates increase in size on hover
							 * 	none: no animation on hover
							 */
							effect: 'scale'
						},
						selected: {
							background: {
								color: '#d01818'
							},
							color: '#FEFEFE',
						},
						today: {
							background: {
								color: '#ccc'
							},
							color: '#FEFEFE',
							fontWeight: 600
						}
					},
					font: {
						family: '"Source Code Pro", serif'
					},
					navigation: {
						date: true,
						month: true,
						year: true,
						tooltip: false,
					},
					showOtherMonths: false,
					options: {
						data: {
							dayVisibility: true
						},
						visible: true
					}
				},
				year: {
					
				},
				month: {
					controller: {
						layout: 2,
						position: 'bottom',
						visible: true,
					},
					dayNames: {
						background: {
							color: 'transparent',
						},
						color: "#333",
						position: 'top',
						visible: true
					},
					firstDay: 1,
					weekNumber: {
						visible: false
					}
				},
				week: {
					
				},
				day: {
					
				}
			},
		}
	},
	view: {
		mode: {
			calendar: 0,
			datePicker: 1,
			timePicker: 2	
		},
		modeCalendar: {
			year: 0,
			month: 1,
			week: 2,
			day: 3
		},
		modeDatePicker: {
			
		},
		modeTimePicker: {
			hourly: 0,
			halfHourly: 1,
			quaterHourly: 2,
			fiveMinutes: 3
		},
	},
	days: [
		{
			full: 'Sunday',
			short: 'Sun',
			alpha: 'S',
		},
		{
			full: 'Monday',
			short: 'Mon',
			alpha: 'M',
		},
		{
			full: 'Tuesday',
			short: 'Tue',
			alpha: 'T',
		},
		{
			full: 'Wednesday',
			short: 'Wed',
			alpha: 'W',
		},
		{
			full: 'Thursday',
			short: 'Thu',
			alpha: 'T',
		},
		{
			full: 'Friday',
			short: 'Fri',
			alpha: 'F',
		},
		{
			full: 'Saturday',
			short: 'Sat',
			alpha: 'S',
		},
	],
	weeks: [
		{
			id: 1
		},
		{
			id: 2
		},
		{
			id: 3
		},
		{
			id: 4
		},
		{
			id: 5
		},
		{
			id: 6
		}
	],
	months: [
		{
			full: 'January',
			short: 'Jan',
			value: 0,
		},
		{
			full: 'February',
			short: 'Feb',
			value: 1,
		},
		{
			full: 'March',
			short: 'Mar',
			value: 2,
		},
		{
			full: 'April',
			short: 'Apr',
			value: 3,
		},
		{
			full: 'May',
			short: 'May',
			value: 4,
		},
		{
			full: 'June',
			short: 'Jun',
			value: 5,
		},
		{
			full: 'July',
			short: 'Jul',
			value: 6,
		},
		{
			full: 'August',
			short: 'Aug',
			value: 7,
		},
		{
			full: 'September',
			short: 'Sep',
			value: 8,
		},
		{
			full: 'October',
			short: 'Oct',
			value: 9,
		},
		{
			full: 'November',
			short: 'Nov',
			value: 10,
		},
		{
			full: 'December',
			short: 'Dec',
			value: 11,
		},
	]
});
angular.module('zpzMdCalendar')
.service('zpzMdCalendarUtilitySvc', [
	function() {
		var svc = {};
		
		/**
		 * Recursively merges the destination object with the source.
		 * If property `x` exists in both `dst` and `src`, src will be
		 * overwritten.
		 */
		svc.mergeRecursive = function(dst, src) {
			// for every property in destination item,
			//   check if property exists in source item,
			//   if property exists in src,
			//     if both properties are objects, recurse with both properties
			//       set current property in dst to return value of recurse
			//     else overwrite dst with value of src
			//   else do nothing
			for(var i in dst) {
				if(src.hasOwnProperty(i)) {
					if((typeof src[i]) == (typeof dst[i])) {
						if(typeof src[i] === 'object') {
							dst[i] = svc.mergeRecursive(dst[i], src[i]);
						} else {
							dst[i] = src[i];
						}
					} else {
						dst[i] = src[i];
					} 
				}
			}
			return dst;
		};
		
		/**
		 * Returns the day of the date :date of the month :monthIndex, 
		 * given the year :year.
		 * 
		 * @param {Number} date of the month (valid: 1 - 31)
		 * @param {Number} monthIndex 0 based index of month (valid: 0 - 11)
		 * @param {Number} year in the Gregorian Calendar
		 * 
		 * @returns {Number} from 0 - 6 indicating Sun to Sat
		 */
		svc.getDayGivenDate = function(date, monthIndex, year) {
			year -= (monthIndex<=1) ? 1 : 0;
			var m = (monthIndex+10)%12+1, y=year%100, 
				c = Math.floor(year/100),
				n = date+(2.6*m-0.2)+y+Math.floor(y/4)+Math.floor(c/4)-(2*c),
				r = (n<0)?Math.floor(7 + n % 7):Math.floor(n % 7);
			if(r == 7) r = 0;
			return r;
		};
		
		/**
		 * Returns the day of the first of the month :month, given the year :year.
		 * 0 <= return() <= 6, 0 indicates Sunday. This is a convenience method
		 * and returns output from svc.getDayGivenDate
		 * 
		 * @see svc.getDayGivenDate for implementation
		 * 
		 * @param {Number} monthIndex 0 based index of month (valid: 0 - 11)
		 * @param {Number} year in the Gregorian Calendar
		 * 
		 * @returns {Number} from 0 - 6 indicating Sun to Sat
		 */
		svc.getFirstDayOfMonth = function(monthIndex, year) {
			return svc.getDayGivenDate(1, monthIndex, year);
		};
		
		/**
		 * Returns the number of days in the month with 0-based index :monthIndex
		 * and year :year.
		 * 
		 * @param {Integer} monthIndex 0 based index of month (valid: 0 - 11)
		 * @param {Integer} year in the Gregorian Calendar as an integer
		 * 
		 * @returns {Number} 
		 * 
		 * @tests yes
		 */
		svc.getNumberOfDaysInMonth = function(monthIndex, year) {
			switch(monthIndex) {
				case 0: case 2: case 4: case 6: case 7: case 9: case 11:
					return 31;
				case 3: case 5: case 8: case 10:
					return 30;
				default:
					return 28 + (svc.isLeapYear(year) ? 1 : 0);
			}
		};
		
		/**
		 * Returns true if :year is a leap year, false otherwise.
		 * 
		 * @param {Integer} year in the Gregorian Calendar as an integer
		 * 
		 * @returns {Boolean}
		 * 
		 * @tests yes 
		 */
		svc.isLeapYear = function(year) {
			var divisibleByFour = year % 4;
			var divisibleByHundred = year % 100;
			var divisibleByFourHundred = year % 400;
			if(divisibleByFour === 0) {
				if(divisibleByHundred === 0) {
					if(divisibleByFourHundred === 0) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			} else {
				return false;
			}
		};
		
		return svc;
	}
]);
angular.module('zpzMdCalendar')
.factory('zpzMdCalendarDataRowObject', [
	function() {
		/**
		 * Constructor
		 * 
		 * @param {String} eventTitle 
		 * @param {String} eventDescription 
		 * @param {Date} eventDateStart 
		 * @param {Date} eventDateEnd 
		 * @param {Object} eventOptions
		 * 	=> recurring
		 * 		=> every : {'year', 'month', 'week'}
		 * 			- on year, the month and date are repeated every year
		 * 			- on month, the date is repeated every month
		 * 			- on week, the day of the provided date/month/year is repeated every week
		 * @param {Object} eventData
		 * @returns {zpzMdCalendarDataRowObject}
		 * @tests yes
		 * 
		 * @since v1.0.0
		 * @author Joseph <joseph-at-joeir-dot-net>
		 */
		function zpzMdCalendarDataRowObject(
			eventTitle,
			eventDescription,
			eventDateStart,
			eventDateEnd,
			eventOptions,
			eventData
		) {
			this.title = eventTitle || 'Unnamed Event';
			this.description = eventDescription || 'No description provided.';
			this.dateStart = eventDateStart || (new Date());
			this.dateEnd = (!!eventDateEnd) ? eventDateEnd : null;
			this.options = eventOptions || {};
			this.data = eventData || {};
			
			return this;
		}
		
		/**
		 * Returns the data property of this event.
		 * 
		 * @returns {Object}
		 * 
		 * @since v1.0.0
		 * @author Joseph <joseph-at-joeir-dot-net> 
		 */
		zpzMdCalendarDataRowObject.prototype.getData = function() {
			return this.data;
		}
		
		/**
		 * Gets starting date for this instance. Returns a Date object by default
		 * unless :breakdown is set to `true`, then it returns an Object. Defaults
		 * to start if :startOrEnd is not specified.
		 * 
		 * @param {String} startOrEnd => { 'start', 'end' }
		 * @param {Boolean} breakdown indicates whether to return a Date object
		 * @returns {Date} 
		 * @returns {Object} => {
		 * 	year : Number,
		 * 	month : Number,
		 * 	date : Number,
		 * 	hour : Number,
		 * 	minute : Number
		 * }
		 * @tests yes
		 * 
		 * @since v1.0.0
		 * @author Joseph <joseph-at-joeir-dot-net>
		 */
		zpzMdCalendarDataRowObject.prototype.getDate = function(startOrEnd, breakdown) {
			switch(startOrEnd) {
				case 'end':
					return this.getDateEnd(breakdown);
				default:
					return this.getDateStart(breakdown);
			}
		};
		
		/**
		 * Returns the ending date of this data row.
		 * 
		 * @param {Boolean} breakdown if true, returns an Object
		 * @returns {Object} => {
		 * 	year : Number,
		 * 	month : Number,
		 * 	date : Number,
		 * 	hour : Number,
		 * 	minute : Number
		 * }
		 * @returns {Date}
		 * @throws {EvalError} if end date is not specified
		 * @tests yes
		 * 
		 * @since v1.0.0
		 * @author Joseph <joseph-at-joeir-dot-net>
		 */
		zpzMdCalendarDataRowObject.prototype.getDateEnd = function(breakdown) {
			if(!!this.dateEnd) {
				if(!!breakdown) {
					return {
						year: this.dateEnd.getFullYear(),
						month: this.dateEnd.getMonth(),
						date: this.dateEnd.getDate(),
						hour: this.dateEnd.getHour(),
						minute: this.dateEnd.getMinute()
					}
				} else {
					return this.dateEnd;
				}
			} else {
				throw new EvalError('End date for this data row is not available');
			}
		};
		
		/**
		 * Returns the starting date of this data row.
		 * 
		 * @param {Boolean} breakdown if true, returns an Object
		 * @returns {Object} => {
		 * 	year : Number,
		 * 	month : Number,
		 * 	date : Number,
		 * 	hour : Number,
		 * 	minute : Number
		 * }
		 * @returns {Date} on :breakdown == { undefined, null, false }
		 * @tests yes
		 * 
		 * @since v1.0.0
		 * @author Joseph <joseph-at-joeir-dot-net>
		 */
		zpzMdCalendarDataRowObject.prototype.getDateStart = function(breakdown) {
			if(!!breakdown) {
				return {
					year: this.dateStart.getFullYear(),
					month: this.dateStart.getMonth(),
					date: this.dateStart.getDate(),
					hour: this.dateStart.getHours(),
					minute: this.dateStart.getMinutes()
				}
			} else {
				return this.dateStart;
			}
		};
		
		/**
		 * Returns the description of this event.
		 * 
		 * @returns {String}
		 * 
		 * @since v1.0.0
		 * @author Joseph <joseph-at-joeir-dot-net>
		 */
		zpzMdCalendarDataRowObject.prototype.getDescription = function() {
			return this.description;
		};
		
		/**
		 * Returns the duration between the ending date and starting date
		 * disregarding time direction (1 day ago is same as 1 day more -
		 * returns 1).
		 * 
		 * @param {String} timeUnit => {
		 * 	'ms', 'millisecond', (default option if not specified)
		 * 	's', 'second',
		 * 	'min', 'minute',
		 * 	'hr', 'hour',
		 * 	'd', 'day',
		 * 	'mon', 'month',
		 * 	'y', 'year'
		 * }
		 * @returns {Number} rounded to the lower integer
		 * @throws {EvalError} if end date is not specified
		 * @tests yes
		 * 
		 * @since v1.0.0
		 * @author Joseph <joseph-at-joeir-dot-net>
		 */
		zpzMdCalendarDataRowObject.prototype.getDuration = function(timeUnit) {
			if(!this.dateEnd) {
				throw new EvalError('End date for this data row is not available.');
			} else {
				var starting = this.dateStart.getTime(),
					ending = this.dateEnd.getTime(),
					duration = ending - starting,
					retval = duration;
				switch(timeUnit) {
					case 's': case 'second':
						retval = duration / 1000;
						break;
					case 'min': case 'minute':
						retval = (duration / 1000) / 60;
						break;
					case 'hr': case 'hour':
						retval = ((duration / 1000) / 60) / 60;
						break;
					case 'd': case 'day':
						retval = (((duration / 1000) / 60) / 60) / 24;
						break;
					case 'mon': case 'month':
						retval = ((((duration / 1000) / 60) / 60) / 24) / 30;
						break;
					case 'y': case 'year':
						retval = ((((duration / 1000) / 60) / 60) / 24) / 365;
						break;
					case 'ms': case 'millisecond': default:
						break;
				}
				return Math.abs(Math.floor(retval));
			}
			
		};
		
		/**
		 * Returns the options set for this event.
		 * 
		 * @returns {Object} 
		 * 
		 * @since v1.0.0
		 * @author Joseph <joseph-at-joeir-dot-net>
		 */
		zpzMdCalendarDataRowObject.prototype.getOptions = function() {
			return this.options;
		};
		
		/**
		 * Returns the title of this event.
		 * 
		 * @returns {String} 
		 * 
		 * @since v1.0.0
		 * @author Joseph <joseph-at-joeir-dot-net>
		 */
		zpzMdCalendarDataRowObject.prototype.getTitle = function() {
			return this.title;
		};
		
		return zpzMdCalendarDataRowObject;
	}
]);
angular.module('zpzMdCalendar')
.factory('zpzMdCalendarDataSetObject', [
	'zpzMdCalendarDataRowObject',
	'zpzMdCalendarUtilitySvc',
	function (
		zpzMdCalendarDataRowObject,
		zpzMdCalendarUtilitySvc
	) {
		/**
		 * Object constructor for zpzMdCalendarDataSetObject
		 * 
		 * @param {zpzMdCalendarDataRowObject[]} dataRowObjects 
		 */
		function zpzMdCalendarDataSetObject(dataRowObjects) {
			this.data = {
				every: {}, // {'year', 'month', 'week'}
				list: [],
				map: {},
			};
			dataRowObjects = dataRowObjects || [];
			for(var i = 0; i < dataRowObjects.length; ++i) {
				this.insertEvent(dataRowObjects[i]);
			}
			
			return this;
		};
		
		/**
		 * Facade method for retrieving events. If :startDate and :endDate is 
		 * specified, returns all events between the two dates. If only :startDate is
		 * specified, gets all events from :startDate onwards. If only :endDate is
		 * specified
		 * 
		 * @param {Date} startDate 
		 * @param {Date} endDate 
		 */
		zpzMdCalendarDataSetObject.prototype.getEvents = function(startDate, endDate) {
			var gotStart = !(startDate === undefined || startDate === null),
				gotEnd = !(endDate === undefined || endDate === null);
			if(!gotStart && !gotEnd) {			// get all events
				return this.getAllEvents();
			} else if(!gotStart && gotEnd) { 	// get all events before :endDate
				return this.getEventsBefore(endDate);
			} else if(gotStart && !gotEnd) {	// get all events after :startDate
				return this.getEventsAfter(startDate);
			} else { // get events between :startDate and :endDate
				return this.getEventsBetween(startDate, endDate);
			}
		};
		
		/**
		 * Retrieves all events stored in this data set.
		 * 
		 * @returns {Object[]} => zpzMdCalendarDataRowObject[] 
		 */
		zpzMdCalendarDataSetObject.prototype.getAllEvents = 
			function() {
				return this.data.list;
			};
		
		/**
		 * Retrieves all events happening after :date
		 * 
		 * @param {Date} date 
		 * 
		 * @returns {Object[]} => zpzMdCalendarDataRowObject[] 
		 */
		zpzMdCalendarDataSetObject.prototype.getEventsAfter = 
			function(date) {
				var indexStart = this.findIndexOfRowJustAfter(startDate);
				return this.data.list.slice(indexStart);
			};
		
		/**
		 * Retrieves all events happening before :date
		 * 
		 * @param {Date} date
		 * 
		 * @returns {Object[]} => zpzMdCalendarDataRowObject[] 
		 */
		zpzMdCalendarDataSetObject.prototype.getEventsBefore = 
			function(date) {
				var indexEnd = this.findIndexOfRowJustAfter(endDate);
				return this.data.list.slice(0, indexEnd);
			};
			
		/**
		 * Returns the number of zpzMdCalendarDataRowObjects stored in this instance.
		 * 
		 * @alias this.getLength()
		 * 
		 * @returns {Number} indicating size of this.data.list.length
		 */
		zpzMdCalendarDataSetObject.prototype.getSize =
			function() {
				return this.data.list.length;
			};
		/**
		 * @alias this.getSize()
		 */
		zpzMdCalendarDataSetObject.prototype.getLength =
			zpzMdCalendarDataSetObject.prototype.getSize;
		
		/**
		 * Retrieves all events happening between :startDate and :endDate
		 * 
		 * @param {Date} startDate 
		 * @param {Date} endDate 
		 * 
		 * @returns {Object[]} => zpzMdCalendarDataRowObject[] 
		 */
		zpzMdCalendarDataSetObject.prototype.getEventsBetween = 
			function(startDate, endDate) {
				var indexStart = this.findIndexOfRowJustAfter(startDate),
					indexEnd = this.findIndexOfRowJustAfter(endDate);
				return this.data.list.slice(indexStart, indexEnd);
			};
		
		/**
		 * Retrieves all events happening on :date by using 0000 of :date
		 * as the start date and 2359 of :date as the end date. Calls
		 * this.getEventsBetween() to retrieve the results.
		 * 
		 * @param {Date} date
		 * 
		 * @returns {Object[]} => zpzMdCalendarDataRowObject[]
		 */
		zpzMdCalendarDataSetObject.prototype.getEventsOn =
			function(date) {
				var startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
					endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
				return this.getEventsBetween(startDate, endDate);
			};
		
		/**
		 * Inserts a data row into this instance. Adds an entry to both the map and
		 * list data model.
		 * 
		 * @param {zpzMdCalendarDataRowObject} dataRowObject
		 * 
		 * @returns {Object} => this
		 */
		zpzMdCalendarDataSetObject.prototype.insertEvent = 
			function(dataRowObject) {
				if(!(dataRowObject instanceof zpzMdCalendarDataRowObject)) {
					throw new TypeError('dataRowObject needs to be an instance of zpzMdCalendarDataRowObject');
				}
				var date = dataRowObject.getDate('start', true);
				
				if((!!dataRowObject.options.recurring) && (dataRowObject.options.recurring.enabled == true)) {
					if(!this.data.every[dataRowObject.options.recurring.every]) {
						this.data.every[dataRowObject.options.recurring.every] = {};
					}
					switch(dataRowObject.options.recurring.every) {
						case 'year':
							/// this.data.every.year[0:11] = {};
							/// eg. zpzMdCalendarDataSetObject.data.every.year[6][4] refers to all events on the 4th of July
							
							/// check for events via zpzMdCalendarDataSetObject.data.every.year[MONTH_INDEX]
							/// and add all to view
							var dateObject = dataRowObject.getDate('start', true),
								month = dateObject.month,
								date = dateObject.date;
							if(this.data.every['year'][month] === undefined) {
								/// create an array and fill it
								this.data.every['year'][month] = new Array(32);
								for(var i = 0; i < this.data.every['year'][month].length; ++i) {
									this.data.every['year'][month][i] = [];
								}
								//console.log('month', month, 'created with', this.data.every['year'][month].length, 'array units');
							} 
							this.data.every['year'][month][date].push(dataRowObject);
							break;
						case 'month':
							/// this.data.every.month[1:31] = [];
							/// to extract, check for index [1:31] where 1 to 31 represents the date of the month
							
							/// eg. zpzMdCalendarDataSetObject.data.every.month[13] to get all events happening on the 13th
							/// get if selected date is a 13
							///  
							var date = dataRowObject.getDate('start', true).date;
							this.data.every['month'][date] = this.data.every['month'][date] || [];
							this.data.every['month'][date].push(dataRowObject);
							break;
						case 'week':
							/// this.data.every.week[0:6] = [];
							/// to extract, check for index [0:6] where 0 to 6 represents sunday to saturday
							 
							/// eg, zpzMdCalendarDataSetObject.data.every.week[3] to get all events on thursday
							/// get if selected event is a thursday? 
							 var day = zpzMdCalendarUtilitySvc.getDayGivenDate(
								 dataRowObject.getDate('start', true).date,
								 dataRowObject.getDate('start', true).month,
								 dataRowObject.getDate('start', true).year
							 );
							this.data.every['week'][day] = this.data.every['week'][day] || [];
							this.data.every['week'][day].push(dataRowObject);
					}
				} else {
					this.data.map[date.year] = 
						this.data.map[date.year] || {};
					this.data.map[date.year][date.month] = 
						this.data.map[date.year][date.month] || {};
					this.data.map[date.year][date.month][date.date] = 
						this.data.map[date.year][date.month][date.date] || [];
						
					this.data.map[date.year][date.month][date.date].push(dataRowObject);
					
					this.data.list.splice(
						this.findIndexOfRowJustAfter(dataRowObject.getDate()),
						0,
						dataRowObject
					);
				}
				return this;
			};
		
		/**
		 * Returns an index, 0 <= index < this.data.list.length, such that
		 * this.data.list[index] refers to an event where the starting date
		 * is immediately after the provided :date. This means that
		 * this.data.list[index - 1], if index != 0, will be an event where
		 * the starting date is before :date.
		 *   
		 * This method implements a modified binary search where terminating 
		 * condition includes the original error condition when :minPosition
		 * is greater than :maxPosition. This implementation is done using 
		 * recursion.
		 * 
		 * Call this with only :date defined. 
		 * 
		 * @example 
		 *  dataSet = new zpzMdCalendarDataSetObject( ... data ... );
		 * 	dataSet.findItemIndexJustBefore( date );
		 * 
		 * @param {Date} date 
		 * 	when running recursively, this parameter is a Number which is
		 * 	a time string derived from date.getTime().
		 * 
		 * @param {Number} currentPosition (DO NOT USE)
		 * 	used internally during subsequent recursions, when this is
		 * 	undefined, initializing is triggered.
		 * 
		 * @param {Number} minPosition lower bound (DO NOT USE)
		 * 	used internally during subsequent recursions.
		 * 
		 * @param {Number} maxPosition upper bound (DO NOT USE)
		 * 	used internally during subsequent recursions.
		 * 
		 * @returns {Number} index of item in this.data
		 * 
		 * @tests yes
		 */
		zpzMdCalendarDataSetObject.prototype.findIndexOfRowJustAfter = 
			function(
				date, 
				currentPosition, 
				minPosition, 
				maxPosition
			) {
				if(currentPosition === undefined || currentPosition == null) {
					// initialization
					minPosition = 0;
					maxPosition = this.data.list.length;
					date = date.getTime();
				}
				if(minPosition > maxPosition) {
					// terminating condition #1 - all other situations
					return minPosition;
				} else {
					currentPosition = Math.floor( (minPosition + maxPosition) / 2);
					if( 
						currentPosition === this.data.list.length
					) { // terminating condition #2 - when :date exceeds all dates
						return currentPosition;
					} else if(
						this.data.list[currentPosition].getDateStart().getTime() < date
					) {	// branch condition #1 - when current item is before date
						// 	discard all items earlier (on the left) than this
						return this.findIndexOfRowJustAfter(
							date, 
							currentPosition, 
							currentPosition + 1, 
							maxPosition
						);
					} else if(
						this.data.list[currentPosition].getDateStart().getTime() > date
					) { // branch condition #2 - when current item is after date
						//	discard all items later (on the right) than this
						return this.findIndexOfRowJustAfter(
							date, 
							currentPosition, 
							minPosition, 
							currentPosition - 1
						);
					} else {
						// termination condition #3 - when dates are exactly equal
						return currentPosition;
					}
				}
			};
		
		return zpzMdCalendarDataSetObject;
	}
]);
angular.module('zpzMdCalendar')
.factory('zpzMdCalendarViewObject', [
	'zpzMdCalendarConst',
	'zpzMdCalendarUtilitySvc',
	function(
		zpzMdCalendarConst,
		zpzMdCalendarUtilitySvc
	) {
		/**
		 * Constructor
		 * 
		 * Initializes a 7x6 grid (7 days horizontally, 6 weeks vertically)
		 * 
		 * @returns {zpzMdCalendarViewObject}
		 */
		function zpzMdCalendarViewObject(modeInitial) {
			modeInitial = modeInitial || {};
			this.mode = {
				primary: modeInitial.primary || zpzMdCalendarConst.view.mode.calendar,
				secondary: null
			};
			this.data = new Array(6);
			for(var i = 0; i < this.data.length; ++i) {
				this.data[i] = new Array(7);
				for(var j = 0; j < this.data[i].length; ++j) {
					this.data[i][j] = {
						events: []
					};
				}
			}
			return this;
		};
		
		
		
		return zpzMdCalendarViewObject;
	}
]);
angular.module('zpzMdCalendar')
.factory('zpzMdCalendarModelObject', [
	'$timeout',
	'zpzMdCalendarConst',
	'zpzMdCalendarDataSetObject',
	'zpzMdCalendarUtilitySvc',
	'zpzMdCalendarViewObject',
	function(
		$timeout,
		zpzMdCalendarConst,
		zpzMdCalendarDataSetObject,
		zpzMdCalendarUtilitySvc,
		zpzMdCalendarViewObject
	) {
		/**
		 * Constructor
		 * 
		 * @param {zpzMdCalendarDataSetObject} dataSetObject
		 * @param {Object} options 
		 * 
		 * @returns {zpzMdCalendarModelObject}
		 * 
		 * @tests yes
		 */
		function zpzMdCalendarModelObject(dataSetObject, options) {
			console.log('zpzMdCalendarModelObject', options);
			options = options || {};
			this.config = {
				firstDay: (options.firstDay != undefined) ? options.firstDay : 0,
				range: options.range.allowable
			};
			this.current = {
				today: {
					year: new Date().getFullYear(),
					month: new Date().getMonth(),
					date: new Date().getDate(),
				},
				year: options.year || (new Date()).getFullYear(),
				month: (options.month != undefined) ? options.month : (new Date()).getMonth(),
				date: options.date || (new Date()).getDate()
			};
			//console.log(dataSetObject instanceof zpzMdCalendarDataSetObject);
			this.data = dataSetObject;
			this.events = [];
			this.view = null;
			this.selected = {
				year: null,
				month: null,
				date: null
			};
			this.state = {
				initialized: false,
			};
			return this;
		};
		
		/**
		 * Returns true if date is less than 1 or if it is more than the
		 * number of days available for that month and year.
		 * 
		 * @returns {Boolean} 
		 */
		zpzMdCalendarModelObject.prototype.dateIsOutOfBounds = function() {
			var daysInMonth = zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(
				this.current.month, 
				this.current.year
			);
			if(this.current.date > daysInMonth) {
				return true;
			} else if(this.current.date <= 0) {
				return true;
			} else {
				return false;
			}
		};
		
		/**
		 * Returns true if month is less than 0 or more than 11.
		 * 
		 * @returns {Boolean} 
		 */
		zpzMdCalendarModelObject.prototype.monthIsOutOfBounds = function() {
			if(this.current.month >= 12 || this.current.month < 0) {
				return true;
			} else {
				return false;
			}
		};
		
		/**
		 * 
		 */
		zpzMdCalendarModelObject.prototype.init = function() {
			this.view = new zpzMdCalendarViewObject();
			this.state.initialized = true;
			var firstDayOfMonth = 
					zpzMdCalendarUtilitySvc.getFirstDayOfMonth(
						this.current.month,
						this.current.year
					),
				totalDaysOfMonth =
					zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(
						this.current.month,
						this.current.year
					),
				previousMonth = 
					(this.current.month - 1) < 0 ? 
						11 : (this.current.month - 1),
				totalDaysOfPreviousMonth =
					zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(
						previousMonth,
						this.current.year
					),
				nextMonth =
					(this.current.month + 1) > 11 ?
						0 : (this.current.month + 1);
				
			if(this.config.firstDay > 0) {
				if((firstDayOfMonth -= this.config.firstDay) < 0) {
					firstDayOfMonth = 7 + firstDayOfMonth;
				}
			}
			
			var dayCounter = 1;
			
			// fill up previous month cells
			if(firstDayOfMonth != 0) {
				for(var i = 0; i < firstDayOfMonth; ++i) {
					this.view.data[0][i].month = previousMonth; 
					this.view.data[0][i].date = 
						totalDaysOfPreviousMonth - firstDayOfMonth + i + 1;
				}
			}
			// fill up this month cells for first row
			for(var i = firstDayOfMonth; i < 7; ++i) {
				this.view.data[0][i].month = this.current.month;
				this.view.data[0][i].date = dayCounter++;
				///*TODO
				//if(this.current.year < )
				///*TODO
			}
			
			// fill up this/next month cells for other rows
			var nextMonthDayCounter = 1,
				nextMonthReached = false;
			for(var i = 1; i < this.view.data.length; ++i) {
				if(!nextMonthReached) {
					for(var j = 0; j < this.view.data[i].length; ++j) {
						// for this month cells
						if(dayCounter <= totalDaysOfMonth) {
							this.view.data[i][j].month = this.current.month;
							this.view.data[i][j].date = dayCounter++;
						} 
						// for next month cells
						else {
							this.view.data[i][j].month = nextMonth;
							this.view.data[i][j].date = nextMonthDayCounter++;
						}
					}
					if(dayCounter > totalDaysOfMonth) {
						nextMonthReached = true;
					}
				} else {
					for(var j = 0; j < this.view.data[i].length; ++j) {
						this.view.data[i][j].month = null;
						this.view.data[i][j].date = null;
					}
				}
			}
		};
		
		/**
		 * Updates the view
		 */
		zpzMdCalendarModelObject.prototype.updateView = function() {
			switch(this.view.mode.primary) {
				case zpzMdCalendarConst.view.mode.calendar:
					this.events = this.data.getEventsOn(
						new Date(this.getCurrentYear(), 
						this.getCurrentMonth(),
						this.getCurrentDate())
					);
					/// if the current month contains a recursive event in one of
					/// it's days, the month will have been initialized to an
					/// array of size 32, otherwise, no such events exist.
					if(!!this.data.data.every['year'] && 
						!!this.data.data.every['year'][this.getCurrentMonth()]
					) {
						var yearlyEvents = this.data.data.every['year'][this.getCurrentMonth()][this.getCurrentDate()];
						for(var i = 0; i < yearlyEvents.length; ++i) {
							this.events.push(yearlyEvents[i]);
						}
					}
					/// for recurring monthly events
					if(!!this.data.data.every['month'] && 
						!!this.data.data.every['month'][this.getCurrentDate()]
					) {
						var monthlyEvents = this.data.data.every['month'][this.getCurrentDate()];
						for(var i = 0; i < monthlyEvents.length; ++i) {
							this.events.push(monthlyEvents[i]);
						}
					}
					/// for recurring weekly events
					if(!!this.data.data.every['week'] && 
						!!this.data.data.every['week'][this.getCurrentDay()]
					) {
						var weeklyEvents = this.data.data.every['week'][this.getCurrentDay()];
						for(var i = 0; i < weeklyEvents.length; ++i) {
							this.events.push(weeklyEvents[i]);
						}
					}
					break;
				case zpzMdCalendarConst.view.mode.datePicker:
					break;
				case zpzMdCalendarConst.view.mode.timePicker:
					break;
			}
		};
		
		/**
		 * Day navigation
		 * ---------------------------------------------------------------------------
		 */
		
		/**
		 * Advances the internal model to the next day
		 * 
		 * @tests yes
		 */
		zpzMdCalendarModelObject.prototype.nextDay = function() {
			++this.current.date;
			if(this.dateIsOutOfBounds()) {
				this.nextMonth(true);
			}
		};
		
		/**
		 * Decreases the date count by one
		 * 
		 * @tests yes 
		 */
		zpzMdCalendarModelObject.prototype.previousDay = function() {
			--this.current.date;
			if(this.dateIsOutOfBounds()) {
				this.previousMonth();
			}
		};
		
		/**
		 * Month navigation
		 * ---------------------------------------------------------------------------
		 */
		
		/**
		 * Advances the internal model to the next month
		 * 
		 * @tests yes
		 */
		zpzMdCalendarModelObject.prototype.nextMonth = function(cascaded) {
			++this.current.month;
			if(this.monthIsOutOfBounds()) {
				this.nextYear(true);
			}
			if(cascaded) {
				this.current.date = 1;
			} else if(this.dateIsOutOfBounds()) {
				this.current.date = zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(
					this.current.month, this.current.year
				);
			}
			this.init();
		};
		
		/**
		 * Decreases the month count by one 
		 * 
		 * @tests yes
		 */
		zpzMdCalendarModelObject.prototype.previousMonth = function() {
			--this.current.month;
			if(this.monthIsOutOfBounds()) {
				this.previousYear(true);
			}
			if(this.dateIsOutOfBounds()) {
				this.current.date = zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(
					this.current.month, this.current.year
				);
			}
			this.init();
		};
		
		/**
		 * Year navigation
		 * ---------------------------------------------------------------------------
		 */
		
		/**
		 * Advances the internal model to the next year
		 * 
		 * @tests yes
		 */
		zpzMdCalendarModelObject.prototype.nextYear = function(cascaded) {
			++this.current.year;
			if(this.current.month > 11) {
				this.current.month = 0;
			}
			if(!cascaded) {
				if(this.dateIsOutOfBounds()) {
					this.current.date = zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(
						this.current.month, this.current.year
					);
				}
			}
		};
		
		/**
		 * Decreases the year count by one 
		 * 
		 * @tests yes
		 */
		zpzMdCalendarModelObject.prototype.previousYear = function(cascaded) {
			--this.current.year;
			if(this.current.month < 0) {
				this.current.month = 11;
			}
			
			if(!cascaded) {
				if(this.dateIsOutOfBounds()) {
					this.current.date = zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(
						this.current.month, this.current.year
					);
				}
			}
		};
		
		/**
		 * Getters/setters
		 * ---------------------------------------------------------------------------
		 */
		
		/**
		 * Returns selected year
		 * 
		 * @returns {Number} 
		 */
		zpzMdCalendarModelObject.prototype.getSelectedYear = function() {
			return this.selected.year;
		};
		
		/**
		 * Returns current year
		 * 
		 * @returns {Number} 
		 */
		zpzMdCalendarModelObject.prototype.getCurrentYear = function() {
			return this.current.year;
		};
		
		/**
		 * Returns selected month
		 * 
		 * @returns {Number} 
		 */
		zpzMdCalendarModelObject.prototype.getSelectedMonth = function() {
			return this.selected.month;
		};
		
		/**
		 * Returns current month
		 * 
		 * @returns {Number} 
		 */
		zpzMdCalendarModelObject.prototype.getCurrentMonth = function() {
			return this.current.month;
		};
		
		/**
		 * Returns selected date
		 * 
		 * @returns {Number} 
		 */
		zpzMdCalendarModelObject.prototype.getSelectedDate = function() {
			return this.selected.date;
		};
		
		/**
		 * Returns current date
		 * 
		 * @returns {Number} 
		 */
		zpzMdCalendarModelObject.prototype.getCurrentDate = function() {
			return this.current.date;
		};
		
		/**
		 * Returns current day
		 * 
		 * @returns {Number} 
		 */
		zpzMdCalendarModelObject.prototype.getCurrentDay = function() {
			return this.current.day;
		};
		
		/**
		 * Sets the current year
		 * 
		 * @param {Number} year 
		 */
		zpzMdCalendarModelObject.prototype.setCurrentYear = function(year) {
			this.current.year = year;
			if(this.dateIsOutOfBounds) {
				this.current.date = zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(
					this.current.month, this.current.year
				);
			}
		};
		
		/**
		 * Sets the current month
		 * 
		 * @param {Number} month 
		 */
		zpzMdCalendarModelObject.prototype.setCurrentMonth = function(month) {
			if(month > 11) { month = 11; }
			if(month < 0) { month = 0; }
			this.current.month = month;
			if(this.dateIsOutOfBounds) {
				this.current.date = zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(
					this.current.month, this.current.year
				);
			}
		};
		
		/**
		 * Sets the current date
		 * 
		 * @param {Number} date 
		 */
		zpzMdCalendarModelObject.prototype.setCurrentDate = function(date) {
			if(date < 0) { date = 1; }
			else if(this.dateIsOutOfBounds) {
				date = zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(
					this.current.month, this.current.year
				);
			}
			this.current.date = date;
		};
		
		return zpzMdCalendarModelObject;
	}
]);
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
		} else {
			$scope.ngConfig = zpzMdCalendarUtilitySvc.mergeRecursive(
				zpzMdCalendarSvc.constant.config.default,
				$scope.ngConfig
			);
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