'use strict';

// var has = require('has');

// var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false.
// eslint-disable-next-line no-sparse-arrays, array-bracket-spacing
// var holesExist = !(0 in [, ]); // FF 3 fails this check

module.exports = function (slice, t) {
	t.test('works on arrays', function (st) {
		var arr = [1, 2, 3, 4];
		var result = slice(arr, 1, 3);
		st.deepEqual(result, [2, 3]);

		st.end();
	});

	t.test('is generic', function (st) {
		var obj = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 };
		var result = slice(obj, 1, 3);
		st.deepEqual(result, [2, 3]);

		st.end();
	});

	t.test('works with `arguments`', function (st) {
		var obj = (function () { return arguments; }(1, 2, 3, 4));
		var result = Array.prototype.slice.call(obj, 1, 3);
		st.deepEqual(result, [2, 3]);

		st.end();
	});

	t.test('boxed string access', function (st) {
		var obj = '1234';
		var result = slice(obj, 1, 3);
		st.deepEqual(result, ['2', '3']);

		st.end();
	});

	/* global document */
	t.test('is able to slice a NodeList', { skip: typeof document === 'undefined' }, function (st) {
		var nodes = document.getElementsByTagName('body');
		st.deepEqual(slice(nodes, 0, 1), [nodes[0]]);

		st.end();
	});
};
