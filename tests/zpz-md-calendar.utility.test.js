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
				zpzMdCalendarUtilitySvc
					.getNumberOfDaysInMonth(1, 2015)
					.should.equal(28);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'accounts for leap years properly',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarUtilitySvc) {
				zpzMdCalendarUtilitySvc
					.getNumberOfDaysInMonth(1, 2016)
					.should.equal(29);
				zpzMdCalendarUtilitySvc
					.getNumberOfDaysInMonth(1, 2017)
					.should.equal(28);
				zpzMdCalendarUtilitySvc
					.getNumberOfDaysInMonth(1, 2018)
					.should.equal(28);
				zpzMdCalendarUtilitySvc
					.getNumberOfDaysInMonth(1, 2019)
					.should.equal(28);
				zpzMdCalendarUtilitySvc
					.getNumberOfDaysInMonth(1, 2020)
					.should.equal(29);
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
				zpzMdCalendarUtilitySvc
					.getFirstDayOfMonth(4, 2016)
					.should.equal(may2016);
				zpzMdCalendarUtilitySvc
					.getFirstDayOfMonth(5, 1983)
					.should.equal(jun1983);
			})
		);
	});
	describe(
		/** ----------------------------------------------------------------------- */
		'mergeRecursive()',
		/** ----------------------------------------------------------------------- */
		function() {
			/**
			 * @var NUMBER : Test Number-typed rvalue : 1
			 */
			var NUMBER = 1;
			/**
			 * @var STRING : Test String-typed rvalue
			 */
			var STRING = 'a';
			/**
			 * @var dst : Test Object-typed lvalue
			 */
			var dst;
			/**
			 * Renew `dst` at every test case
			 */
			beforeEach(function() {
				dst = {
					a1: {
						a2: {
							a3: {
								a4: NUMBER
							},
							b3: NUMBER,
							c3: STRING
						},
						b2: NUMBER,
						c2: STRING
					},
					b1: {
						a2: NUMBER,
						b2: STRING,
						c2: {
							a3: NUMBER,
							b3: STRING,
							c3: {
								a4: NUMBER
							}
						}
					},
					c1: {
						a2: STRING,
						b2: {
							a3: STRING,
							b3: {
								a4: NUMBER
							},
							c3: NUMBER
						},
						c2: NUMBER
					},
					d1: NUMBER,
					e1: STRING
				};
			});
			
			it(
				/** -------------------------------------------------------------- **/
				'Source value replaces destination object at level 1',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { a1: 5 },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.should.equal(5);
				})
			);
			it(
				/** -------------------------------------------------------------- **/
				'Source value replaces destination value at level 1 (homotyped)',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { d1: 5 },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.d1.should.equal(5);
					
					src = { e1: 'b' };
					out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.e1.should.equal('b');
				})
			);
			it(
				/** -------------------------------------------------------------- **/
				'Source value replaces destination value at level 1 (heterotyped)',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { d1: 'b' },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.d1.should.equal('b');
					
					src = { e1: 5 };
					out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.e1.should.equal(5);
				})
			);
			it(
				/** -------------------------------------------------------------- **/
				'Source value replaces destination object at level 2',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { a1: { a2: 5} },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.a2.should.equal(5);
				})
			);
			it(
				/** -------------------------------------------------------------- **/
				'Source value replaces destination value at level 2 (homotyped)',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { a1: { b2: 5 } },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.b2.should.equal(5);
					
					src = { a1: { c2: 'b' } };
					out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.c2.should.equal('b');
				})
			);
			it(
				/** -------------------------------------------------------------- **/
				'Source value replaces destination value at level 2 (heterotyped)',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { a1: { b2: 'b' } },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.b2.should.equal('b');
					
					src = { a1: { c2: 5 } };
					out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.c2.should.equal(5);
				})
			);
			it(
				/** -------------------------------------------------------------- **/
				'Source value replaces destination object at level 3',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { a1: { a2: { a3: 5 } } },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.a2.a3.should.equal(5);
					
				})
			);
			it(
				/** -------------------------------------------------------------- **/
				'Source value replaces destination value at level 3 (homotyped)',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { a1: { a2: { b3: 5 } } },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.a2.b3.should.equal(5);
					
					src = { a1: { a2: { c3: 'b' } } };
					out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.a2.c3.should.equal('b');
				})
			);
			it(
				/** -------------------------------------------------------------- **/
				'Source value replaces destination value at level 3 (heterotyped)',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { a1: { a2: { b3: 'b' } } },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.a2.b3.should.equal('b');
					
					src = { a1: { a2: { c3: 5 } } };
					out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.a2.c3.should.equal(5);
				})
			);
			it(
				/** -------------------------------------------------------------- **/
				'Works with more than one source value to replace',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { a1: { a2: { b3: 'b', c3: 2 } } },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.a2.b3.should.equal('b');
					out.a1.a2.c3.should.equal(2);
					
					src = { a1: { b2: 'b', c2: 2 } };
					out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.a1.b2.should.equal('b');
					out.a1.c2.should.equal(2);
				})
			);
			it(
				/** -------------------------------------------------------------- **/
				'Works with more than one source object to replace',
				/** -------------------------------------------------------------- **/
				inject(function(zpzMdCalendarUtilitySvc) {
					var src = { e1: { a1: 5 } },
						out = zpzMdCalendarUtilitySvc.mergeRecursive(dst, src);
					out.e1.a1.should.equal(5);
				})
			);
		}
	)
});