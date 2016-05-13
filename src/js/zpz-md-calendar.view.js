angular.module('zpzMdCalendar')
.factory('zpzMdCalendarViewObject', [
	'zpzMdCalendarConst',
	'zpzMdCalendarUtilitySvc',
	function(
		zpzMdCalendarConst,
		zpzMdCalendarUtilitySvc
	) {
		/**
		 * Constructor
		 * 
		 * Initializes a 7x6 grid (7 days horizontally, 6 weeks vertically)
		 * 
		 * @returns {zpzMdCalendarViewObject}
		 */
		function zpzMdCalendarViewObject(modeInitial) {
			modeInitial = modeInitial || {};
			this.mode = {
				primary: modeInitial.primary || zpzMdCalendarConst.view.mode.calendar,
				secondary: null
			};
			this.data = new Array(6);
			for(var i = 0; i < this.data.length; ++i) {
				this.data[i] = new Array(7);
				for(var j = 0; j < this.data[i].length; ++j) {
					this.data[i][j] = {
						events: []
					};
				}
			}
			return this;
		};
		
		
		
		return zpzMdCalendarViewObject;
	}
]);