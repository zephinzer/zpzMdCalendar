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