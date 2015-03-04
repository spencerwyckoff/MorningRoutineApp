;(function() {

	angular.module('morningRoutine')

		.factory('UserFactory', ['$http', 'PARSE', '$cookieStore', '$location', 

			function ($http, PARSE, $cookieStore, $location) {

				// Get Current User
	      var currentUser = function () {
	        return $cookieStore.get('currentUser');
	      };

	      // Check User Status
	      var checkLoginStatus = function () {
	        var user = currentUser();
	        if (user) {
	          PARSE.CONFIG.headers['X-PARSE-Session-Token'] = user.sessionToken;
	        }
	      };

	      //Login User
				var loginSingleUser = function (userObj) {
					$http({
	          method: 'GET',
	          url: PARSE.URL + 'login',
	          headers: PARSE.CONFIG.headers,
	          params: userObj
	        }).success (function (res) {
	          console.log(res.objectId);
	          // $cookieStore.put('currentUser', res.data);
	          $location.path('/my-list/' + res.objectId);
	        });
				};

				//Register User
				var registerSingleUser = function (userObj) {
					console.log(userObj);
					$http.post(PARSE.URL + 'users', userObj, PARSE.CONFIG)
						.success( function (res) {
							console.log("registration success: " + res);
							$location.path('/my-list/' + res.objectId);
						});
				};



				return {
					login: loginSingleUser,
					register: registerSingleUser,
					status: checkLoginStatus,
					user: currentUser
					// logout: logoutUser
				};

			}

		]);



}());