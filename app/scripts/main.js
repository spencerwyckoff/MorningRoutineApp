;(function() {

	window.app = angular.module('morningRoutine', []);

	//Empty Routine Object
	var addRoutine = {
		name: '',
		time: '',
		description: '',
		canAdd: false
	};

	//Array of Routines
	var myRoutines = [	
	{
		name: 'Use the restroom',
		time: 1,
		description: '',
		canAdd: true,
	},

	{
		name: 'Calm.com meditation',
		time: 10,
		description: 'Immediately upon waking, take 10 minutes to practice mindfullness through a guided meditation.',
		canAdd: true,
	},

	{
		name: 'Lukewarm to cold shower',
		time: 5,
		description: 'Start off with the water being lukewarm, finish with the shower being only cold.  This has many physiological benefits and is better than a cup of coffee.',
		canAdd: true,
	},

	];


	//Add Routine Controller
	app.controller('addRoutine', function() {

		this.addRoutine = addRoutine;

	});	

	//Routine List Controller
	app.controller('showRoutine', function() {

		this.routines = myRoutines;

	});

	


}());