'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:PledgeCtrl
 * @description
 * # PledgeCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('PledgeCtrl', function($scope, $routeParams, Restangular, $http, $window) {
		$scope.predefinedAmounts = [1, 2, 5, 10, 20];
		$scope.customAmount = 50;

		Restangular.one('projects', $routeParams.id).get().then(function(project) {
			$scope.project = project;
		});

		$scope.pledge = function(amount) {
			var request = {
				amount: amount
			};
			Restangular.one('projects', $routeParams.id).post('pledges', request).then(function(success){
				$window.location.href = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=' + success;
			});
		};
	});