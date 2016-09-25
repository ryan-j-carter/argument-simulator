angular.module('Directives', [])
.directive('banner', function() {
    return {
        restrict: 'E',
        scope: {
            title: '=',
            desc: '=',
            signup: '='
        },
        templateUrl: '/app/views/components/banner.tpl.html'
    };
});
