describe(
	/** -------------------------------------------------------------------------- **/
	'Factory: zpzMdCalendarModelObject', 
	/** -------------------------------------------------------------------------- **/
	function() {
	it(
		/** ---------------------------------------------------------------------- **/
		'stores dataSetObjects for linking to in the View.', 
		/** ---------------------------------------------------------------------- **/
		function() { }
	);
	beforeEach(module('zpzMdCalendar'));
	describe(
		/** ---------------------------------------------------------------------- **/
		'constructor()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		it(
			/** ------------------------------------------------------------------ **/
			'initializes with current timestamp if :options is not specified', 
			/** ------------------------------------------------------------------ **/
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject();
				model.getCurrentYear().should.equal((new Date()).getFullYear());
				model.getCurrentMonth().should.equal((new Date()).getMonth());
				model.getCurrentDate().should.equal((new Date()).getDate());
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'initializes with specified timestamp if :options is fully specified', 
			/** ------------------------------------------------------------------ **/
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(
					null, 
					{ 
						year: 2012, 
						month: 3, 
						date: 20 
					}
				);
				var expectedDate = 20,
					expectedMonth = 3,
					expectedYear = 2012;
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'initializes with only year set if :options only has year, month and ' +
			'date are current',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 1923 });
				var expectedDate = (new Date()).getDate(),
					expectedMonth = (new Date()).getMonth(),
					expectedYear = 1923;
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'initializes with only month set if :options only has month, year and ' +
			'date are current',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { month: 8 });
				var expectedDate = (new Date()).getDate(),
					expectedMonth = 8,
					expectedYear = (new Date()).getFullYear();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'initializes with only date set if :options only has date, year and ' +
			'month are current',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { date: 28 });
				var expectedDate = 28,
					expectedMonth = (new Date()).getMonth(),
					expectedYear = (new Date()).getFullYear();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
	});
	
	describe(
		/** ---------------------------------------------------------------------- **/
		'previousDay()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		it(
			/** ------------------------------------------------------------------ **/
			'decreases one from the current date', 
			/** ------------------------------------------------------------------ **/
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 1, date: 2 });
				var expectedDate = 1,
					expectedMonth = 1,
					expectedYear = 2016;
				model.previousDay();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'decreases one from the month if it\'s the first',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 1, date: 1 });
				var expectedDate = 31,
					expectedMonth = 0,
					expectedYear = 2016;
				model.previousDay();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'decreases one from the month and the year if it\'s January first',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 0, date: 1 });
				var expectedDate = 31,
					expectedMonth = 11,
					expectedYear = 2015;
				model.previousDay();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
	});
	
	describe(
		/** ---------------------------------------------------------------------- **/
		'nextDay()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		it(
			/** ------------------------------------------------------------------ **/
			'increases one from the current date',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 10, date: 1 });
				var expectedDate = 2,
					expectedMonth = 10,
					expectedYear = 2016;
				model.nextDay();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'increases one from the month if it\'s the last day',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 0, date: 31 });
				var expectedDate = 1,
					expectedMonth = 1,
					expectedYear = 2016;
				model.nextDay();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'increases one from month and year if it\'s December 31st',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 11, date: 31 });
				var expectedDate = 1,
					expectedMonth = 0,
					expectedYear = 2017;
				model.nextDay();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
	});
	
	describe(
		/** ---------------------------------------------------------------------- **/
		'previousMonth()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		it(
			/** ------------------------------------------------------------------ **/
			'decreases one from the current month',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 1, date: 2 });
				var expectedDate = 2,
					expectedMonth = 0,
					expectedYear = 2016;
				model.previousMonth();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'decreases one from the year if it\'s January',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 0, date: 1 });
				var expectedDate = 1,
					expectedMonth = 11,
					expectedYear = 2015;
				model.previousMonth();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'decreases the date to the last possible date of resultant month if current date exceeds that',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 11, date: 31 });
				var expectedDate = 30,
					expectedMonth = 10,
					expectedYear = 2016;
				model.previousMonth();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
	});
	
	describe(
		/** ---------------------------------------------------------------------- **/
		'nextMonth()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		it(
			/** ------------------------------------------------------------------ **/
			'increases one from the current month',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 0, date: 2 });
				var expectedDate = 2,
					expectedMonth = 1,
					expectedYear = 2016;
				model.nextMonth();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'increases the year by one if it\'s December',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 11, date: 1 });
				var expectedDate = 1,
					expectedMonth = 0,
					expectedYear = 2017;
				model.nextMonth();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'decreases the date to the last possible date of resultant month if current date exceeds that',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 4, date: 31 });
				var expectedDate = 30,
					expectedMonth = 5,
					expectedYear = 2016;
				model.nextMonth();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
	});
	
	describe(
		/** ---------------------------------------------------------------------- **/
		'previousYear()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		it(
			/** ------------------------------------------------------------------ **/
			'decreases one from the current year',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 0, date: 29 });
				var expectedDate = 29,
					expectedMonth = 0,
					expectedYear = 2015;
				model.previousYear();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'decreases the date to the last possible date of resultant month if current date exceeds that',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 1, date: 29 });
				var expectedDate = 28,
					expectedMonth = 1,
					expectedYear = 2015;
				model.previousYear();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
	});
	
	describe(
		/** ---------------------------------------------------------------------- **/
		'nextYear()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		it(
			/** ------------------------------------------------------------------ **/
			'increases one from the current year',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 0, date: 29 });
				var expectedDate = 29,
					expectedMonth = 0,
					expectedYear = 2017;
				model.nextYear();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'decreases the date to the last possible date of resultant month if current date exceeds that',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarModelObject) {
				var model = new zpzMdCalendarModelObject(null, { year: 2016, month: 1, date: 29 });
				var expectedDate = 28,
					expectedMonth = 1,
					expectedYear = 2017;
				model.nextYear();
				model.getCurrentYear().should.equal(expectedYear);
				model.getCurrentMonth().should.equal(expectedMonth);
				model.getCurrentDate().should.equal(expectedDate);
			})
		);
	});
});