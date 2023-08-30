'use strict';

var GetIntrinsic = require('get-intrinsic');

var ArraySpeciesCreate = require('es-abstract/2023/ArraySpeciesCreate');
var CreateDataPropertyOrThrow = require('es-abstract/2023/CreateDataPropertyOrThrow');
var Get = require('es-abstract/2023/Get');
var HasProperty = require('es-abstract/2023/HasProperty');
var LengthOfArrayLike = require('es-abstract/2023/LengthOfArrayLike');
var Set = require('es-abstract/2023/Set');
var ToIntegerOrInfinity = require('es-abstract/2023/ToIntegerOrInfinity');
var ToObject = require('es-abstract/2023/ToObject');
var ToString = require('es-abstract/2023/ToString');

var callBound = require('call-bind/callBound');

var isString = require('is-string');

var $max = GetIntrinsic('%Math.max%');
var $min = GetIntrinsic('%Math.min%');

// Check failure of by-index access of string characters (IE < 9) and failure of `0 in boxedString` (Rhino)
var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var strSplit = callBound('String.prototype.split');

module.exports = function slice(start, end) {
	var self = ToObject(this); // step 1
	var O = splitString && isString(self) ? strSplit(self, '') : self;

	var len = LengthOfArrayLike(O); // step 2

	var relativeStart = ToIntegerOrInfinity(start); // step 3

	var k;
	if (relativeStart === -Infinity) {
		k = 0; // step 4
	} else if (relativeStart < 0) {
		k = $max(len + relativeStart, 0); // step 5
	} else {
		k = $min(relativeStart, len); // step 6
	}

	var relativeEnd = typeof end === 'undefined' ? len : ToIntegerOrInfinity(end); // step 7

	var final;
	if (relativeEnd === -Infinity) {
		final = 0; // step 8
	} else if (relativeEnd < 0) {
		final = $max(len + relativeEnd, 0); // step 9
	} else {
		final = $min(relativeEnd, len); // step 10
	}

	var count = $max(final - k, 0); // step 11

	var A = ArraySpeciesCreate(O, count); // step 12

	var n = 0; // step 13

	while (k < final) { // step 14
		var Pk = ToString(k); // step 14.a
		var kPresent = HasProperty(O, Pk); // step 14.b
		if (kPresent) {
			var kValue = Get(O, Pk); // step 14.c.a
			CreateDataPropertyOrThrow(A, ToString(n), kValue); // step 14.c.b
		}
		k += 1; // step 14.d
		n += 1; // step 14.e
	}

	Set(A, 'length', n, true); // step 15

	return A; // step 16
};

module.exports.prototype = undefined;
