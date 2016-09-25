angular.module('Routes', ['ui.router'])
.config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: '/app/views/home.html'
    })
    .state('signup', {
        url: '/signup',
        templateUrl: '/app/views/signup.html'
    })
    .state('login', {
        url: '/login',
        templateUrl: '/app/views/login.html'
    })
    .state('logout', {
        url: '/logout',
        templateUrl: '/app/views/home.html'
    })
    .state('newpoll', {
        url: '/newpoll',
        templateUrl: '/app/views/newpoll.html',
        controller: 'NewPollController',
        controllerAs: 'newPoll'
    })
    .state('polls', {
        url: '/polls/{name}',
        templateUrl: '/app/views/polls.html',
        controller: 'PollController',
        controllerAs: 'polls'
    })
    .state('poll', {
        url: '/polls/{name}/{_id}',
        templateUrl: '/app/views/poll.html',
        controller: 'ViewPollController',
        controllerAs: 'poll'
    });
    $locationProvider.html5Mode(true);
}]);
