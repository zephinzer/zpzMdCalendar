angular.module('zpzMdCalendarDemo')
.config([
	'zpzMdCalendarSvcProvider',
	function(
		zpzMdCalendarSvcProvider
	) {
		/**
		 * We use a URL query parameter to prevent caching of HTML
		 * ---------------------------------------------------------------------------
		 */
		var nonce = (new Date()).getTime();
		/**
		 * Code that replaces the HTML stored in $templateCache
		 * ---------------------------------------------------------------------------
		 */
		zpzMdCalendarSvcProvider
			.template('button', 'options', 
				'../../src/html/zpz-md-calendar-button-options.html?' + nonce)
			.template('element', 'main', 
				'../../src/html/zpz-md-calendar.html?' + nonce)
			.template('element', 'date', 
				'../../src/html/zpz-md-calendar-element-date.html?' + nonce)
			.template('element', 'events',
				'../../src/html/zpz-md-calendar-element-events.html?' + nonce)
			.template('toolbar', 'controller', 
				'../../src/html/zpz-md-calendar-toolbar-controller.html?' + nonce)
			.template('toolbar', 'days', 
				'../../src/html/zpz-md-calendar-toolbar-days.html?d=' + nonce);
	}
]);