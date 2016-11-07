myApp.controller('facebookLoginCtrl', function($scope, $auth, $rootScope) {
    $scope.handleBtnClick = function() {
        $auth.authenticate('facebook')
            .then(function(resp) {
            // handle success
        })
            .catch(function(resp) {
            // handle errors
        });
    };

    $rootScope.$on('auth:login-success', function(ev, user) {
        alert('Welcome ', user.email);
    });

    $rootScope.$on('auth:oauth-registration', function(ev, user) {
        alert('new user registered through oauth:' + user.email);
    });


});