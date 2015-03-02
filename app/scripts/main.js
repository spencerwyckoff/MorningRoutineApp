;(function() {

	//creating the morningRoutine module, but then also making the ngRoute available
	angular.module('morningRoutine', ['ngRoute'])

		.constant('PARSE', {
			//base url
			URL: 'https://api.parse.com/1/',

			//config is where we put in headers
			CONFIG: {
				
				headers: {
					'X-Parse-Application-Id': 'dNgpvECpDgxTn8VGbh1L18OzTTrckpM1pfrmcqyR',
					'X-Parse-REST-API-Key': 'X0DPI6R31dhgIN1pti5UFYHwqNl7nRAPQP4Le5OU',
					'Content-Type': 'application/json'
				}
			}

		})


		.config( function ($routeProvider) {

			$routeProvider

				.when('/', {
					templateUrl: 'scripts/routine/list.tpl.html',
					controller: 'RoutineController'
				})

				.when('/add', {
					templateUrl: 'scripts/routine/add.tpl.html',
					controller: 'RoutineController'					
				})

				.otherwise( {
					template: "This doesnt exist!"
				});

		});

		



}());