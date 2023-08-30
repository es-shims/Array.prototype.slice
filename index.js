'use strict';

var define = require('define-properties');
var RequireObjectCoercible = require('es-abstract/2023/RequireObjectCoercible');
var callBind = require('call-bind');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var polyfill = callBind(getPolyfill());

var bound = function slice(array, start, end) {
	RequireObjectCoercible(array);
	return polyfill(array, start, end);
};
define(bound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = bound;
