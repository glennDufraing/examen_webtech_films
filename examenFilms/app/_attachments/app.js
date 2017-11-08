'use strict'

angular.module('App', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'assets/views/home.html',
      controller: 'homeCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
})

.config(function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|sms):/);
})

.controller('homeCtrl',function ($scope,movieSrv) {
	
	
	$('#button').on('click',function(){
		var naam = splitTekst();
		var array=[]
		console.log(naam);
		
		console.log(movieSrv.zoekFilm().$$state.status);
		if(movieSrv.zoekFilm().$$state.status===0){
			movieSrv.getMovies(naam).then(function(data){
				console.log(data[0].filmography.actor);
				
				for(var i=0; i< data[0].filmography.actor.length;i++){
					array.push(data[0].filmography.actor[i].title);
				}
				console.log(array);
				$('#info').html(array);
				
			})
				console.log(array);
				putFilm(naam,array);
		}
		
	
	})
})
	
.service('movieSrv',function($http,$q){

	this.zoekFilm=function(naam){
		var q = $q.defer();
		$http.get('../../'+naam)
			.then(function(data, status, headers, config){
				
				q.resolve(data.data);
			}, function error(err) {
				gevonden=1;
				q.reject(err);
			});
		console.log(q.promise);
		return q.promise;
		
	},
	
	this.getMovies = function(naam) {
		var q = $q.defer();
		$http.get('http://www.theimdbapi.org/api/find/person?name='+naam)
			.then(function(data, status, headers, config){
				q.resolve(data.data);
			}, function error(err) {
				
				q.reject(err);
			});
		console.log(q.promise);
		return q.promise;
		
	};
})