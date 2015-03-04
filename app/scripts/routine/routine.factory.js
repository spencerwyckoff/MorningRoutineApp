(function (){


	angular.module('morningRoutine')

		.factory('RoutineFactory', ['$http', 'PARSE', '$location', '$rootScope', '$route',

			function ($http, PARSE, $location, $rootScope, $route) {

				//Getting a List of Routines
				var getAllRoutines = function () {
					return $http.get(PARSE.URL + 'classes/Routine', PARSE.CONFIG);
				};

				//Adding a Routine
				var addSingleRoutine = function (obj) {
					$http.post(PARSE.URL + 'classes/Routine', obj, PARSE.CONFIG)
						.success( function (data) {							
							$rootScope.$broadcast('routine:added');
							$location.path('/');
						});
				};

				//Deleting a Routine
				var deleteSingleRoutine = function (obj) {
					console.log('delete');
					return $http.delete(PARSE.URL + 'classes/Routine/' + obj, PARSE.CONFIG);
				};

				//Checking Off a Routine
				var checkSingleRoutine = function (obj) {
					console.log('check!');
				};
				
				return {
					get : getAllRoutines,
					add : addSingleRoutine,
					remove: deleteSingleRoutine,
					check: checkSingleRoutine
				};	


			}

		]);


}());