myApp.controller('twitterLoginCtrl', function($scope, $auth, $rootScope) {
    $scope.handleBtnClick = function() {
        $auth.authenticate('twitter')
            .then(function(resp) {
            // handle success
        })
            .catch(function(resp) {
            // handle errors
        });
    };

    $scope.$on('auth:oauth-registration', function(ev, user) {
//        alert('Registro Exitoso ' + user.email);
        ons.notification.alert({
            message: 'Bienvenido ' + user.name,
            title: 'Registro Exitoso',
            buttonLabel: 'OK',
            animation: 'default', 
            callback: function() {
                // Alert button is closed!
            }
        });
    });

    $scope.$on('auth:login-success', function(ev, user) {
        //        alert('Bienvenido ' + user.email);
//        var options = {
//            animation: 'slide', 
//            onTransitionEnd: function() {}
//        };
        myNavigator.resetToPage("main.html");
    });
});