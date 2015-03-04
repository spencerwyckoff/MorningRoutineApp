;(function() {

	'use strict';

	angular.module('morningRoutine')

		.controller('UserController', ['$scope', 'UserFactory', '$http', 

			function ($scope, UserFactory, $http) {

				$scope.loginUser = function (userObj) {
					UserFactory.login(userObj);
				};

				$scope.registerUser = function (userObj) {
					UserFactory.register(userObj);

				};


			}

		]);



}());