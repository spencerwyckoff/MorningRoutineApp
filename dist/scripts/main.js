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
;(function() {

	angular.module('morningRoutine')

	//Setup Routine Controller
	.controller('RoutineController', ['$scope', 'PARSE', '$http', 'RoutineFactory', '$rootScope',

		function ($scope, PARSE, $http, RoutineFactory, $rootScope) {

			$scope.allRoutines = [];

			RoutineFactory.get().success( function (data) {
					$scope.allRoutines = data.results;
			});


			$scope.addRoutine = function (r) {
				RoutineFactory.add(r);
			};


			$rootScope.$on('routine:added', function () {
				console.log('Routine Added!!');	
			});


			$scope.deleteRoutine = function (r) {
				RoutineFactory.remove(r).success( function() {
					for (var i = 0; i < $scope.allRoutines.length; i++) {
						var obj = $scope.allRoutines[i];
						
						if (obj.objectId === r) {
							$scope.allRoutines.splice(i, 1);
						}
					}					
				});
			};


			$scope.checkStatus = "";			

			$scope.checkRoutine = function (r) {
				for (var i = 0; i < $scope.allRoutines.length; i++) {
						var obj = $scope.allRoutines[i];
						
					if (obj.objectId === r) {
						$scope.checkStatus = "checked";
					}
				}



				if ($scope.checkStatus !== "checked") {
					console.log('checked');
					r.checkStatus = 'checked';
				} else {
					console.log('uncheck');
					$scope.checkStatus = "unchecked";
				}
			};

		}
	
	]);

	

	


}());
(function (){


	angular.module('morningRoutine')

		.factory('RoutineFactory', ['$http', 'PARSE', '$location', '$rootScope', 

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