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
				year: 2016,
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