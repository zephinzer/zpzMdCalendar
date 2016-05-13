angular.module('zpzMdCalendarDemo')
.constant('dataSvcConst', [{
		mockData: [
		]
}])
.service('dataSvc', [
	'dataSvcConst',
	'zpzMdCalendarSvc',
	function(
		dataSvcConst,
		zpzMdCalendarSvc
	) {
		var svc = {};
		
		svc.getMockData = function() {
			return [
				zpzMdCalendarSvc.createEvent(
					'Stacy\'s Birthday',
					'A celebration is due.',
					new Date((new Date()).getFullYear(), 3, 22, 0, 0, 0, 0),
					null,
					{
						recurring: {
							enabled: true,
							every: 'year'
						}
					}
				),
				zpzMdCalendarSvc.createEvent(
					'Joseph\'s Birthday',
					'A celebration is due.',
					new Date((new Date()).getFullYear(), 10, 1, 0, 0, 0, 0),
					null,
					{
						recurring: {
							enabled: true,
							every: 'year'
						}
					}
				),
				zpzMdCalendarSvc.createEvent(
					'Mooziq\'s Incorporation',
					'Mooziq is an online social platform for musicians to Connect, Organize, Publicize and Monetize their content.\n\nCheck us out at https://mooziq.sg',
					new Date((new Date()).getFullYear(), 4, 31, 0, 0, 0, 0),
					null,
					{
						recurring: {
							enabled: true,
							every: 'year'
						}
					}
				),
				zpzMdCalendarSvc.createEvent(
					'A new month',
					'A new month begins and a month older we are. Remember to thank your gods for being alive.',
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1, 0, 0, 0, 0),
					null,
					{
						recurring: {
							enabled: true,
							every: 'month'
						}
					}
				),
				zpzMdCalendarSvc.createEvent(
					'Thank God It\'s Friday!',
					'Time to unwind and let loose on some crazy shit.',
					new Date((new Date()).getFullYear(), 4, 13, 17, 0, 0, 0),
					null,
					{
						recurring: {
							enabled: true,
							every: 'week',
						}
					}
				),
				zpzMdCalendarSvc.createEvent(
					'Church Day',
					'Time to repent for sins committed on Friday.',
					new Date((new Date()).getFullYear(), 4, 15, 8, 0, 0, 0),
					null,
					{
						recurring: {
							enabled: true,
							every: 'week',
						}
					}
				),
				zpzMdCalendarSvc.createEvent(
					'Party 31 @ Duxton',
					'Vanity Square is back with their latest, hippest and most fun party on probably Earth if they are to be believed. Be there or be square.',
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 17, 17, 0, 0, 0),
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 17, 23, 0, 0, 0)
				),
				zpzMdCalendarSvc.createEvent(
					'Miss Multiverse Competition ',
					'We have Miss Universe for the most visually pleasing women, now let us take a day off to appreciate the intelligence of women.',
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 14, 20, 30, 0, 0)
				),
				zpzMdCalendarSvc.createEvent(
					'Blue Bulls Meditation Session',
					'Drinking Red Bull gives you wings, but sometimes it\'s good to be grounded as well. Join us to expereince a peaceful sensation experienced no where else.',
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 17, 18, 0, 0, 0)
				),
				zpzMdCalendarSvc.createEvent(
					'Startup@Utopia',
					'The ideal startup event for everyone and anyone. Join the verses of entrepreneurs in degrading the lives of peasants, or, also known as, the working class hero.',
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 3, 8, 0, 0, 0)
				),
				zpzMdCalendarSvc.createEvent(
					'Medieval Times Party',
					'Dress up as Dumbledore and you get free entry',
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 3, 22, 0, 0, 0)
				),
				zpzMdCalendarSvc.createEvent(
					'Life\'s Awesome (not Great)',
					'LG is exuding awesomeness this year and you don\'t want to miss the flexiphone which can be folded like paper',
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 3, 15, 0, 0, 0)
				),
				zpzMdCalendarSvc.createEvent(
					'Car Show ' + (new Date()).getFullYear(),
					'Love cars? Well we don\'t, but this is a calendar that we need to fill here (not unlike your pathetic petrol)',
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 18, 20, 0, 0, 0)
				),
				zpzMdCalendarSvc.createEvent(
					'Marriage Preparation Workshop',
					'Getting married? Well, don\'t miss out on the fun you\'re leaving behind. Five babes for every bachelor and five hunks for every soon-to-be-bride. Get laid like you\'ve never been laid before, before that Special Day.',
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 23, 19, 0, 0, 0)
				),
				zpzMdCalendarSvc.createEvent(
					'Cooking Guru Workshop',
					'Ever wanted to make your pie and have it? Well now you can with the Cooking Guru workshop that has been designed specially for people such as yourself. Chocolate cakes, vanilla cakes, we\'ll give you the kicks you need.',
					new Date((new Date()).getFullYear(), (new Date()).getMonth(), 23, 18, 0, 0, 0)
				)
			];
		}
		
		return svc;
	}
]);