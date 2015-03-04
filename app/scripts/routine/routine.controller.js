;(function() {

	'use strict';

	angular.module('morningRoutine')

	//Setup Routine Controller
	.controller('RoutineController', ['$scope', 'PARSE', '$http', 'RoutineFactory', '$rootScope',

		function ($scope, PARSE, $http, RoutineFactory, $rootScope) {

			$scope.allRoutines = [];

			RoutineFactory.get().success( function (data) {
					$scope.allRoutines = data.results;
			});


			$scope.addRoutine = function (r) {
				r.isComplete = false;
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

			$scope.completeRoutine = function (r) {
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