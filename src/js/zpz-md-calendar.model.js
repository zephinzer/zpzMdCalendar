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
			options = options || {};
			this.config = {
				firstDay: (options.firstDay != undefined) ? options.firstDay : 0,
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