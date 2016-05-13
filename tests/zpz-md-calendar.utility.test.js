describe(
	/** -------------------------------------------------------------------------- **/
	'Service: zpzMdCalendarUtilitySvc', 
	/** -------------------------------------------------------------------------- **/
	function() {
	beforeEach(module('zpzMdCalendar'));
	describe(
		/** ---------------------------------------------------------------------- **/
		'isLeapYear()', 
		/** ---------------------------------------------------------------------- **/
		function() {	
		it(
			/** ------------------------------------------------------------------ **/
			'returns true for years evenly divisible by 4', 
			/** ------------------------------------------------------------------ **/
			inject(function(zpzMdCalendarUtilitySvc) {
				zpzMdCalendarUtilitySvc.isLeapYear(2012).should.equal(true);
				zpzMdCalendarUtilitySvc.isLeapYear(2016).should.equal(true);
				zpzMdCalendarUtilitySvc.isLeapYear(2020).should.equal(true);
				zpzMdCalendarUtilitySvc.isLeapYear(2024).should.equal(true);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'except if it\'s also evenly divisible by 100',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarUtilitySvc) {
				zpzMdCalendarUtilitySvc.isLeapYear(2100).should.equal(false);
				zpzMdCalendarUtilitySvc.isLeapYear(2200).should.equal(false);
				zpzMdCalendarUtilitySvc.isLeapYear(2300).should.equal(false);
				zpzMdCalendarUtilitySvc.isLeapYear(2500).should.equal(false);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'unless it\'s also evenly divisible by 400',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarUtilitySvc) {
				zpzMdCalendarUtilitySvc.isLeapYear(2000).should.equal(true);
				zpzMdCalendarUtilitySvc.isLeapYear(2400).should.equal(true);
				zpzMdCalendarUtilitySvc.isLeapYear(2800).should.equal(true);
				zpzMdCalendarUtilitySvc.isLeapYear(3200).should.equal(true);
			})
		);
	});
	describe(
		/** ---------------------------------------------------------------------- **/
		'getNumberOfDaysInMonth()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		it(
			/** ------------------------------------------------------------------ **/
			'returns number of days in the month',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarUtilitySvc) {
				zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(1, 2015).should.equal(28);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'accounts for leap years properly',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarUtilitySvc) {
				zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(1, 2016).should.equal(29);
				zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(1, 2017).should.equal(28);
				zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(1, 2018).should.equal(28);
				zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(1, 2019).should.equal(28);
				zpzMdCalendarUtilitySvc.getNumberOfDaysInMonth(1, 2020).should.equal(29);
			})
		);
	});
	describe(
		/** ---------------------------------------------------------------------- **/
		'getFirstDayOfMonth()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		it(
			/** ------------------------------------------------------------------ **/
			'returns the 0-based index of day in week of the first date given a ' +
			'month and year.',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarUtilitySvc) {
				var may2016 = 0,
					jun1983 = 3;
				zpzMdCalendarUtilitySvc.getFirstDayOfMonth(4, 2016).should.equal(may2016);
				zpzMdCalendarUtilitySvc.getFirstDayOfMonth(5, 1983).should.equal(jun1983);
			})
		);
	});
});