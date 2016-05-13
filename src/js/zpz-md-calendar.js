angular.module('zpzMdCalendar', [
	'ngMaterial',
	'ngMessages',
	'zpzMdCalendarTemplates',
])
.provider('zpzMdCalendarSvc', [
	function() {
		var pvd = {};
		
		pvd.templateFile = {
			button: {
				options: null
			},
			toolbar: {
				controller: null,
				days: null,
			},
			element: {
				form: null,
				main: null
			}
		};
		
		pvd.template = function(
			componentType,
			componentName,
			componentUrl
		) {
			this.templateFile[componentType][componentName] = componentUrl;
			return pvd;
		};
		
		pvd.$get = [
			'zpzMdCalendarConst',
			'zpzMdCalendarDataRowObject',
			function(
				zpzMdCalendarConst,
				zpzMdCalendarDataRowObject
			) {
				var svc = {};
				
				/// initialize constants
				zpzMdCalendarConst.templateFile = pvd.templateFile;
				svc.constant = zpzMdCalendarConst;
				
				svc.createEvent = function(
					title,
					description,
					dateStart,
					dateEnd,
					options,
					data
				) {
					return new zpzMdCalendarDataRowObject(
						title,
						description,
						dateStart,
						dateEnd,
						options,
						data
					);
				};
				
				return svc;
			}
		];
		
		return pvd;
	}
]);