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