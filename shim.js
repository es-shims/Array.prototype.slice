'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimArrayPrototypeSlice() {
	var polyfill = getPolyfill();

	define(
		Array.prototype,
		{ slice: polyfill },
		{ slice: function () { return Array.prototype.slice !== polyfill; } }
	);

	return polyfill;
};
