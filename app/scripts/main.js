;(function() {


	//creating the morningRoutine module, but then also making the ngRoute available
	angular.module('morningRoutine', ['ngRoute', 'ngCookies'])

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


		.config([ '$routeProvider', function ($routeProvider) {

			$routeProvider

				.when('/', {
					templateUrl: 'scripts/user/user.login.tpl.html',
					controller: 'UserController'
				})

				.when('/register', {
					templateUrl: 'scripts/user/user.register.tpl.html',
					controller: 'UserController'
				})

				.when('/my-list/:id', {
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

		}])

		//Run Block - this runs after everything gets setup...  
	  //in this case - we're checking to see if there is a cookies stored for the current user logged in...
		.run([ '$rootScope', 'UserFactory', 'PARSE',

	    function ($rootScope, UserFactory, PARSE) {

	      $rootScope.$on('$routeChangeStart', function () {
	        
	        // Run my Login Status
	        UserFactory.status();

	      });
	    
		  }

		]);


}());