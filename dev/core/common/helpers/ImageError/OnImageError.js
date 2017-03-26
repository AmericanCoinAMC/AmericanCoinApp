/**
 * Created by cem on 07-Oct-16.
 */
app.directive('img', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attr) {
            element.on('error', function () {
                element.css("display", "none");
            })
        }
    }
});