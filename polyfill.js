'use strict';

var implementation = require('./implementation');

var callBind = require('call-bind');
var callBound = require('call-bind/callBound');

var isString = require('is-string');

var strSplit = callBound('String.prototype.split');

// Check failure of by-index access of string characters (IE < 9)
// and failure of `0 in boxedString` (Rhino)
var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

module.exports = function getPolyfill() {
	if (!Array.prototype.slice) {
		return implementation;
	}

	/* global document */
	if (typeof document !== 'undefined') {
		try {
			Array.prototype.slice.call(document.getElementsByTagName('body'));
		} catch (e) {
			// IE 6-8
			return implementation;
		}
	}

	if (splitString) {
		var arraySlice = callBind(Array.prototype.slice);

		/* eslint no-invalid-this: 1 */
		return function slice(start, end) {
			var arr = isString(this) ? strSplit(this, '') : this;
			return arraySlice(arr, start, end);
		};
	}

	return Array.prototype.slice;
};
