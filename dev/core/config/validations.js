app
    .directive('equalTo', [function () {
    return {
        require: "ngModel",
        restrict: 'A',
        scope: {
            otherValue: "=equalTo"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$parsers.push(function(modelValue) {
                if(!modelValue || modelValue.length == 0) return;
                ngModel.$setValidity('passwordConfirmed', modelValue == scope.otherValue);
                return modelValue;
            })
        }
    }
}])
    .directive('passwordStrength', [function () {
        return {
            require: "ngModel",
            restrict: 'A',
            scope: {

            },
            link: function(scope, element, attributes, ngModel) {
                ngModel.$parsers.push(function(modelValue) {
                    if(!modelValue || modelValue.length == 0) return;
                    var requirements = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                    ngModel.$setValidity('validPassword', requirements.test(modelValue));
                    return modelValue;
                })
            }
        }
    }])

    .directive('userBirthday', [function () {
        return {
            require: "ngModel",
            restrict: 'A',
            scope: {

            },
            link: function(scope, element, attributes, ngModel) {
                ngModel.$parsers.push(function(modelValue) {
                    if(!modelValue || modelValue.length == 0) return;
                    var requirements = /(((0[1-9]|[12][0-9]|3[01])([-./])(0[13578]|10|12)([-./])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-./])(0[469]|11)([-./])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-./])(02)([-./])(\d{4}))|((29)(\.|-|\/)(02)([-./])([02468][048]00))|((29)([-./])(02)([-./])([13579][26]00))|((29)([-./])(02)([-./])([0-9][0-9][0][48]))|((29)([-./])(02)([-./])([0-9][0-9][2468][048]))|((29)([-./])(02)([-./])([0-9][0-9][13579][26])))/;
                    ngModel.$setValidity('validBirthday', requirements.test(modelValue));
                    return modelValue;
                })
            }
        }
    }]);
