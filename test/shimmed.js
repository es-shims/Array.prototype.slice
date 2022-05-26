'use strict';

var orig = Array.prototype.slice;

require('../auto');

var test = require('tape');
var defineProperties = require('define-properties');
var callBind = require('call-bind');
var hasStrictMode = require('has-strict-mode')();

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');

test('shimmed', function (t) {
	t.comment('shimmed: ' + (Array.prototype.slice === orig ? 'no ' : 'yes'));

	t.equal(Array.prototype.slice.length, 2, 'Array#slice has a length of 2');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Array.prototype.slice.name, 'slice', 'Array#slice has name "slice"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Array.prototype, 'slice'), 'Array#slice is not enumerable');
		et.end();
	});

	t.test('bad array/this value', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Array.prototype.slice.call(undefined, 'a'); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Array.prototype.slice.call(null, 'a'); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Array.prototype.slice), t);

	t.end();
});
