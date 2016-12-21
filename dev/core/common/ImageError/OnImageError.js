/**
 * Created by cem on 07-Oct-16.
 */
app.directive('img', function () {
    return {
        restrict: 'E',
        link: function (scope, el, attr) {
            el.on('error', function () {
                el.attr('src', 'assets/img/notfound.png');
            })
        }
    }
});