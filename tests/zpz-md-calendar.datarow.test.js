describe(
	/** --------------------------------------------------------------------------- */
	'Factory: zpzMdCalendarDataRowObject',
	/** --------------------------------------------------------------------------- */ 
	function() {	
	beforeEach(module('zpzMdCalendar'));
	it(
		/** ----------------------------------------------------------------------- */
		'is used to store an event.', 
		/** ----------------------------------------------------------------------- */
		function() { }
	);
	describe(
		/** ----------------------------------------------------------------------- */
		'constructor()', 
		/** ----------------------------------------------------------------------- */
		function() {
		it(
			/** ------------------------------------------------------------------ */
			'initializes without any arguments',
			 /** ------------------------------------------------------------------ */
			inject(function(zpzMdCalendarDataRowObject) {
				var dataRow = new zpzMdCalendarDataRowObject();
				dataRow.getTitle()
					.should.equal('Unnamed Event');
				dataRow.getDescription()
					.should.equal('No description provided.');
				((new Date()).getTime() - 
					dataRow.getDateStart().getTime())
					.should.be.lessThan(100);
			})
		);
		
		it(
			/** ------------------------------------------------------------------ */
			'initializes with :title', 
			/** ------------------------------------------------------------------ */
			inject(function(zpzMdCalendarDataRowObject) {
				var dataRow = new zpzMdCalendarDataRowObject(
					'event title'
				);
				dataRow.getDescription()
					.should.equal('No description provided.');
				((new Date()).getTime() - 
					dataRow.getDateStart().getTime())
					.should.be.lessThan(100);
			})
		);
		
		it(
			/** ------------------------------------------------------------------ */
			'initializes with :title, :description',
			/** ------------------------------------------------------------------ */ 
			inject(function(zpzMdCalendarDataRowObject) {
				var dataRow = new zpzMdCalendarDataRowObject(
					'event title',
					'event description'
				);
				((new Date()).getTime() - 
					dataRow.getDateStart().getTime())
					.should.be.lessThan(100);
			})
		);
		
		it(
			/** ------------------------------------------------------------------ */
			'initializes with :title, :description, :dateStart', 
			/** ------------------------------------------------------------------ */
			inject(function(zpzMdCalendarDataRowObject) {
				var dataRow;
				(function() {
					dataRow = new zpzMdCalendarDataRowObject(
						'event title',
						'event description',
						new Date((new Date()).getTime() - (1000*60*60*24))
					);
				}).should.not.throw();
			})
		);
		
		it(
			/** ------------------------------------------------------------------ */
			'initializes with :title, :description, :dateStart, :dateEnd',
			/** ------------------------------------------------------------------ */ 
			inject(function(zpzMdCalendarDataRowObject) {
				(function() {
					var endDate = new Date(
							(new Date()).getTime() + (1000*60*60*24)
						),
						startDate = new Date(
							(new Date()).getTime() - (1000*60*60*24)
						); 
					var dataRow = new zpzMdCalendarDataRowObject(
						'event title',
						'event description',
						startDate,
						endDate
					);
					dataRow.getDateEnd().should.equal(endDate);
					dataRow.getDateStart().should.equal(startDate);
				}).should.not.throw();
			})
		);
		
		it(
			/** ------------------------------------------------------------------ */
			'initializes with :title, :description, :dateStart, :dateEnd, :options',
			/** ------------------------------------------------------------------ */ 
			inject(function(zpzMdCalendarDataRowObject) {
				(function() {
					var endDate = new Date(
							(new Date()).getTime() + (1000*60*60*24)
						),
						startDate = new Date(
							(new Date()).getTime() - (1000*60*60*24)
						),
						options = { a: 1, b: 2 }; 
					var dataRow = new zpzMdCalendarDataRowObject(
						'event title',
						'event description',
						startDate,
						endDate,
						options
					);
					dataRow.getOptions().should.have.property('a');
					dataRow.getOptions().a.should.equal(1);
					dataRow.getOptions().should.have.property('b');
					dataRow.getOptions().b.should.equal(2);
				}).should.not.throw();
			})
		);
		
		it(
			/** ------------------------------------------------------------------ */
			'initializes with :title, :description, :dateStart, :dateEnd, ' +
			':options and :data',
			/** ------------------------------------------------------------------ */ 
			inject(function(zpzMdCalendarDataRowObject) {
				(function() {
					var endDate = new Date(
							(new Date()).getTime() + (1000*60*60*24)
						),
						startDate = new Date(
							(new Date()).getTime() - (1000*60*60*24)
						),
						options = null,
						data = { hello: 'world' }; 
					var dataRow = new zpzMdCalendarDataRowObject(
						'event title',
						'event description',
						startDate,
						endDate,
						options,
						data
					);
					dataRow.getData().should.have.property('hello');
					dataRow.getData().hello.should.equal('world');
				}).should.not.throw();
			})
		);
	});
	
	describe(
		/** ----------------------------------------------------------------------- */
		'getDuration()',
		/** ----------------------------------------------------------------------- */ 
		function() {
		
		it(
			/** ------------------------------------------------------------------ */
			'retrieves the duration between the start and end time',
			/** ------------------------------------------------------------------ */
			inject(function(zpzMdCalendarDataRowObject) {
				var endDate = new Date((new Date()).getTime() + (1000*60*60*24)),
					startDate = new Date((new Date()).getTime() - (1000*60*60*24)),
					data = { hello: 'world' }; 
				var dataRow = new zpzMdCalendarDataRowObject(
					'event title',
					'event description',
					startDate,
					endDate,
					data
				);
				dataRow.getDuration().should.equal(2*1000*60*60*24);
			})
		);
	});
	
	describe(
		/** ----------------------------------------------------------------------- */
		'getDate()',
		/** ----------------------------------------------------------------------- */
		function() {
			
		var endDate,
			startDate,
			data,
			dataRow;
			
		beforeEach(
			inject(function(zpzMdCalendarDataRowObject) {
				endDate = new Date((new Date()).getTime() + (1000*60*60*24));
				startDate = new Date((new Date()).getTime() - (1000*60*60*24));
				data = { hello: 'world' };
				
				dataRow = new zpzMdCalendarDataRowObject(
					'event title',
					'event description',
					startDate,
					endDate,
					data
				);
			})
		);
		it(
			/** ------------------------------------------------------------------ */
			'returns the stored Date Object within this instance',
			/** ------------------------------------------------------------------ */
			inject(function(zpzMdCalendarDataRowObject) {
				(dataRow.getDate() instanceof Date).should.equal(true);
			})
		);
		
		it(
			/** ------------------------------------------------------------------ */
			'returns the ending date if first parameter is `end`',
			/** ------------------------------------------------------------------ */
			inject(function(zpzMdCalendarDataRowObject) {
				(dataRow.getDate('end') instanceof Date).should.equal(true);
				dataRow.getDate('end').should.equal(endDate);
			})
		);
		
		it(
			/** ------------------------------------------------------------------ */
			'returns the starting date otherwise',
			/** ------------------------------------------------------------------ */
			inject(function(zpzMdCalendarDataRowObject) {
				(dataRow.getDate('start') instanceof Date).should.equal(true);
				dataRow.getDate('start').should.equal(startDate);
			})
		);
		
		it(
			/** ------------------------------------------------------------------ */
			'returns an object if second parameter is defined as `true`',
			/** ------------------------------------------------------------------ */
			inject(function(zpzMdCalendarDataRowObject) {
				(dataRow.getDate('start', true) instanceof Date).should.equal(false);
				var breakdown = dataRow.getDate('start', true);
				breakdown.year.should.equal(startDate.getFullYear());
				breakdown.month.should.equal(startDate.getMonth());
				breakdown.date.should.equal(startDate.getDate());
				breakdown.hour.should.equal(startDate.getHours());
				
			})
		);
	});
});