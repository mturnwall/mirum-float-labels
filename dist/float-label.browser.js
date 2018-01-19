(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.floatLabel = factory());
}(this, (function () { 'use strict';

function floatLabel () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.float-label' : _ref$selector,
        _ref$focusClass = _ref.focusClass,
        focusClass = _ref$focusClass === undefined ? 'float-label--has-focus' : _ref$focusClass,
        _ref$valueClass = _ref.valueClass,
        valueClass = _ref$valueClass === undefined ? 'float-label--has-value' : _ref$valueClass;

    var els = document.querySelectorAll(selector);

    var getFocus = function getFocus(index) {
        els[index].classList.add(focusClass);
    };

    var loseFocus = function loseFocus(index) {
        /*
        * Check inputs and textareas for values
        */
        var input = els[index].querySelector('input, textarea');
        els[index].classList.remove(focusClass);
        if (input) {
            if (input.value === '') {
                els[index].classList.remove(valueClass);
            } else {
                els[index].classList.add(valueClass);
            }
            return true;
        }
        /*
        * Check select controls to see if an option is selected
        */
        var select = els[index].querySelector('select');
        if (select) {
            if (select.selectedIndex.value) {
                els[index].classList.remove(valueClass);
            } else {
                els[index].classList.add(valueClass);
            }
            return true;
        }
        return false;
    };

    Object.keys(els).forEach(function (key) {
        els[key].addEventListener('focusin', function () {
            getFocus(key);
        });
        els[key].addEventListener('focusout', function () {
            loseFocus(key);
        });
    });
}

return floatLabel;

})));
