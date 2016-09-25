angular.module('UserCtrl', [])
.controller('UserController', ['User', '$location', function(User, $location) {
    var self = this;

    this.username = '';
    this.loggedIn = false;
    this.invalidUser = false;
    this.invalidPass = false;

    this.signup = function() {
        if (self.form.$valid) {
            var promise = User.create(self.form.username.$viewValue, self.form.password.$viewValue);

            promise.then(function(user) {
                if (!user.data) {
                    self.invalidUser = true;
                }
                else {
                    self.username = user.data;
                    self.loggedIn = true;
                }
            });
        }
        else {
            self.form.username.$setTouched();
            self.form.username.$setTouched();
        }
    }

    this.login = function() {
        if (self.form.$valid) {
            var promise = User.login(self.form.username.$viewValue, self.form.password.$viewValue);

            promise.then(function(user) {
                //Username not found
                if (!user.data) {
                    self.invalidUser = true;
                }
                //Invalid password
                else if (user.data == "pass") {
                    self.invalidPass = true;
                }
                //Valid login
                else {
                    self.username = user.data;
                    self.loggedIn = true;
                    $location.path("/polls/all");
                }
            });
        }
        else {
            self.form.username.$setTouched();
            self.form.username.$setTouched();
        }
    };
}]);
