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