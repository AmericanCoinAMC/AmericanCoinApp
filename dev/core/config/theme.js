/**
 * Created by Jess on 06-Jun-16.
 */


app.config([
    '$mdThemingProvider',
    function($mdThemingProvider){

        $mdThemingProvider.theme('default')
            .primaryPalette("teal", {
                'default': '500',
                'hue-1': '600',
                'hue-2': '700',
                'hue-3': '800'
            })
            .accentPalette('teal', {
                'default': '400',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            })
            .warnPalette('red', {
                'default': '400',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            });

        $mdThemingProvider.theme('teal')
            .primaryPalette("teal", {
                'default': '500',
                'hue-1': '600',
                'hue-2': '700',
                'hue-3': '800'
            })
            .accentPalette('teal', {
                'default': '400',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            })
            .warnPalette('red', {
                'default': '400',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            });

        $mdThemingProvider.theme('red')
            .primaryPalette("red", {
                'default': '500',
                'hue-1': '600',
                'hue-2': '700',
                'hue-3': '800'
            })
            .accentPalette('red', {
                'default': '400',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            })
            .warnPalette('deep-orange', {
                'default': '400',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            });


        $mdThemingProvider.theme('orange')
            .primaryPalette("orange", {
                'default': '500',
                'hue-1': '600',
                'hue-2': '700',
                'hue-3': '800'
            })
            .accentPalette('orange', {
                'default': '400',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            })
            .warnPalette('red', {
                'default': '400',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            });

        $mdThemingProvider.theme('deep-orange')
            .primaryPalette("deep-orange", {
                'default': '500',
                'hue-1': '600',
                'hue-2': '700',
                'hue-3': '800'
            })
            .accentPalette('deep-orange', {
                'default': '400',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            })
            .warnPalette('red', {
                'default': '400',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '700'
            });
        $mdThemingProvider.alwaysWatchTheme(true);
    }]);