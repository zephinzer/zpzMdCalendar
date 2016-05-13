describe(
	/** -------------------------------------------------------------------------- **/
	'Factory: zpzMdCalendarDataSetObject', 
	/** -------------------------------------------------------------------------- **/
	function() {
	beforeEach(module('zpzMdCalendar'));
	
	it(
		/** ---------------------------------------------------------------------- **/
		'is used to store dataRowObjects.', 
		/** ---------------------------------------------------------------------- **/
		function() { }
	);
	
	describe(
		/** ---------------------------------------------------------------------- **/
		'constructor()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		it(
			/** ------------------------------------------------------------------ **/
			'initializes with no events if :dataRowObjects are not specified',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarDataSetObject) {
				var dataSet = new zpzMdCalendarDataSetObject();
				dataSet.getEvents().length.should.equal(0);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'initializes with events if :dataRowObjects was specified',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarDataSetObject, zpzMdCalendarDataRowObject) {
				var dataRows = [
					new zpzMdCalendarDataRowObject(
						'et1', 
						'ed1', 
						new Date((new Date()).getTime() - (1000*60*60*26)),
						new Date((new Date()).getTime() - (1000*60*60*23)),
						{ id: 23 }
					),
					new zpzMdCalendarDataRowObject(
						'et2', 
						'ed2', 
						new Date((new Date()).getTime() + (1000*60*60*151)),
						new Date((new Date()).getTime() + (1000*60*60*153)),
						{ id: 76 }
					)
				];
				var dataSet = new zpzMdCalendarDataSetObject(dataRows);
				dataSet.getEvents().length.should.equal(2);
			})
		);
		it(
			/** ------------------------------------------------------------------ **/
			'throws a TypeError if provided dataRows are not instances of ' +
			'zpzMdCalendarDataRowObject',
			/** ------------------------------------------------------------------ **/ 
			inject(function(zpzMdCalendarDataSetObject, zpzMdCalendarDataRowObject) {
				var dataRows = [
					new Date((new Date()).getTime() - (1000*60*60*23))
				];
				(function() {
					var dataSet = new zpzMdCalendarDataSetObject(dataRows);
				}).should.throw(TypeError);
				var dataRows = [
					'event'
				];
				(function() {
					var dataSet = new zpzMdCalendarDataSetObject(dataRows);
				}).should.throw(TypeError);
				var dataRows = [
					{ eventTitle: 'title' }
				];
				(function() {
					var dataSet = new zpzMdCalendarDataSetObject(dataRows);
				}).should.throw(TypeError);
			})
		);
	});
	
	describe(
		/** ---------------------------------------------------------------------- **/
		'findIndexOfRowJustAfter()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		var testSetDates = [
			new Date((new Date()).getTime() - (1000*60*60*139)), //0
			new Date((new Date()).getTime() - (1000*60*60*132)), //1
			new Date((new Date()).getTime() - (1000*60*60*80)),	//2
			new Date((new Date()).getTime() - (1000*60*60*49)),	//3
			new Date((new Date()).getTime() - (1000*60*60*39)),	//4
			new Date((new Date()).getTime() - (1000*60*60*25)),	//5
			new Date((new Date()).getTime() - (1000*60*60*24)),	//6
			new Date((new Date()).getTime() - (1000*60*60*15)),	//7
			new Date((new Date()).getTime() - (1000*60*60*13)),	//8
			new Date((new Date()).getTime() - (1000*60*60*10)),	//9
			new Date((new Date()).getTime() - (1000*60*60*3)),	//10
			new Date((new Date()).getTime() - (1000*60*60*2)),	//11
			new Date((new Date()).getTime() - (1000*60*60*1)),	//12
			new Date((new Date()).getTime() + (1000*60*60*1)),	//13
			new Date((new Date()).getTime() + (1000*60*60*4)),	//14
			new Date((new Date()).getTime() + (1000*60*60*9)),	//15
			new Date((new Date()).getTime() + (1000*60*60*11)),	//16
			new Date((new Date()).getTime() + (1000*60*60*18)),	//17
			new Date((new Date()).getTime() + (1000*60*60*20)),	//18
			new Date((new Date()).getTime() + (1000*60*60*27)),	//19
			new Date((new Date()).getTime() + (1000*60*60*28)),	//20
			new Date((new Date()).getTime() + (1000*60*60*40)),	//21
			new Date((new Date()).getTime() + (1000*60*60*91)),	//22
			new Date((new Date()).getTime() + (1000*60*60*141)),//23
			new Date((new Date()).getTime() + (1000*60*60*143)),//24
		];
		it(
			/** ------------------------------------------------------------------ **/
			'performs a binary search for the date just before provided :date', 
			/** ------------------------------------------------------------------ **/
			function() { }
		);
		it(
			/** ------------------------------------------------------------------ **/
			'returns the index of a date where that date is more than :date',
			/** ------------------------------------------------------------------ **/
			inject(function(zpzMdCalendarDataSetObject, zpzMdCalendarDataRowObject) {
				var dataSet = new zpzMdCalendarDataSetObject();
				for(var i = 0; i < testSetDates.length; ++i) {
					dataSet.data.list.push(
						new zpzMdCalendarDataRowObject('et', 'ed', testSetDates[i])
					);
				}
				
				var testDate = new Date((new Date()).getTime() - (1000*60*60*157));
				dataSet.data.list[dataSet.findIndexOfRowJustAfter(
					testDate
				)].getDateStart().getTime().should.be.above(testDate.getTime());
				
				testDate = new Date((new Date()).getTime() - (1000*60*60*140));
				dataSet.data.list[dataSet.findIndexOfRowJustAfter(
					testDate
				)].getDateStart().getTime().should.be.above(testDate.getTime());
				
				testDate = new Date((new Date()).getTime() - (1000*60*60*10));
				dataSet.data.list[dataSet.findIndexOfRowJustAfter(
					testDate
				)].getDateStart().getTime().should.be.above(testDate.getTime());
			})
		);
		
		it(
			/** ------------------------------------------------------------------ **/
			'returns the index of a date where the previous index is less than :date',
			/** ------------------------------------------------------------------ **/
			inject(function(zpzMdCalendarDataSetObject, zpzMdCalendarDataRowObject) {
				var dataSet = new zpzMdCalendarDataSetObject();
				for(var i = 0; i < testSetDates.length; ++i) {
					dataSet.data.list.push(
						new zpzMdCalendarDataRowObject('et', 'ed', testSetDates[i])
					);
				}
				var testDate = new Date((new Date()).getTime() - (1000*60*60*138));
				dataSet.data.list[dataSet.findIndexOfRowJustAfter(
					testDate
				) - 1].getDateStart().getTime().should.be.below(testDate.getTime());
				
				testDate = new Date((new Date()).getTime() + (1000*60*60*142));
				dataSet.data.list[dataSet.findIndexOfRowJustAfter(
					testDate
				) - 1].getDateStart().getTime().should.be.below(testDate.getTime());
				
				testDate = new Date((new Date()).getTime() + (1000*60*60*190));
				dataSet.data.list[dataSet.findIndexOfRowJustAfter(
					testDate
				) - 1].getDateStart().getTime().should.be.below(testDate.getTime());
			})
		);
	});
	
	describe(
		/** ---------------------------------------------------------------------- **/
		'insertEvent()', 
		/** ---------------------------------------------------------------------- **/
		function() {
		
		/**
		 * @var testDates
		 * 	These represent the initial set of dates present in the data.
		 * @type {Date[]}
		 */
		var testDates = [
				new Date((new Date()).getTime() - (1000*60*60*3)),
				new Date((new Date()).getTime() - (1000*60*60*1)),
				new Date((new Date()).getTime() + (1000*60*60*3)),
				new Date((new Date()).getTime() + (1000*60*60*5)),
			];
		/**
		 * @var testingDates
		 * 	These contain the test dates/expected insert positions relative to
		 * 	:testDates.
		 * @type {Array} => { value : Date, expectedPosition : Number }
		 */
		var testingDates = [{
				value: new Date((new Date()).getTime() - (1000*60*60*4)),
				expectedPosition: 0
			},{
				value: new Date((new Date()).getTime() - (1000*60*60*2)),
				expectedPosition: 1
			},{
				value: new Date((new Date()).getTime() + (1000*60*60)),
				expectedPosition: 2
			},{
				value: new Date((new Date()).getTime() + (1000*60*60*4)),
				expectedPosition: 3
			},{
				value: new Date((new Date()).getTime() + (1000*60*60*8)),
				expectedPosition: 4
			}];
		/**
		 * @var testRowObjects
		 * @type {Array} => zpzMdCalendarDataRowObject[]
		 */
		var testRowObjects = null;
		/**
		 * @var testSetObject
		 * @type {Object} => zpzMdCalendarDataSetObject
		 */
		var testSetObject = null;
			
		/**
		 * Re-initialize the testRowObjects and testSetObject variables so they always
		 * contain the same contents at start of every test case.
		 */
		beforeEach(
			inject(
				function(
					zpzMdCalendarDataSetObject, 
					zpzMdCalendarDataRowObject
				) {
					testRowObjects = [];
					for(var i = 0; i < testDates.length; ++i) {
						testRowObjects.push(
							new zpzMdCalendarDataRowObject(
								'et' + i,
								'ed' + i,
								testDates[i]
							)
						);
					}
					testSetObject = 
						new zpzMdCalendarDataSetObject(
							testRowObjects
						);
				}
			)
		);
		it(
			/** ------------------------------------------------------------------ **/
			'inserts an event into the data list',
			/** ------------------------------------------------------------------ **/
			inject(function(zpzMdCalendarDataSetObject, zpzMdCalendarDataRowObject) {
				var originalLengthOfTestData = testSetObject.getSize();
				testSetObject.insertEvent(
					new zpzMdCalendarDataRowObject(
						'et-expected',
						'ed-expected',
						testingDates[0].value
					)
				);
				testSetObject.getSize().should.equal(
					originalLengthOfTestData + 1
				);
				
				testSetObject.insertEvent(
					new zpzMdCalendarDataRowObject(
						'et-expected',
						'ed-expected',
						testingDates[1].value
					)
				);
				testSetObject.getSize().should.equal(
					originalLengthOfTestData + 2
				);
			})
		);
		
		
		it(
			/** ------------------------------------------------------------------ **/
			'maintains a priority queue of increasing dates internally',
			/** ------------------------------------------------------------------ **/
			inject(function(zpzMdCalendarDataSetObject, zpzMdCalendarDataRowObject) {
				function verifyIncreasingOrder() {
					for(var i = 0; i < testSetObject.getSize() - 1; ++i) {
						/*console.log(
							testSetObject.data.list[i].getDate().getTime(),
							'>',
							testSetObject.data.list[i + 1].getDate().getTime(),
							'==',
							(testSetObject.data.list[i].getDate().getTime() > 
							testSetObject.data.list[i + 1].getDate().getTime())
						);*/
						if(
							testSetObject.data.list[i].getDate().getTime() > 
							testSetObject.data.list[i + 1].getDate().getTime()
						) {
							return false;
						}
					}
					return true;
				};
				for(var i = 0; i < testingDates.length; ++i) {
					testSetObject.insertEvent(
						new zpzMdCalendarDataRowObject(
							'et-expected' + i,
							'ed-expected' + i,
							testingDates[i].value
						)
					);
					verifyIncreasingOrder().should.equal(true);
				}
			})
		);
	});
});