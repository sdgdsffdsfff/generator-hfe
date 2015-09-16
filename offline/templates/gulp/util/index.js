"use strict";



function getBiggestVersion(A) {
	var a = [];
	var b = [];
	var t = [];
	var r = [];
	if (!A) {
		return [0, 0, 0];
	}
	for (var i = 0; i < A.length; i++) {
		if (A[i].match(/^\d+\.\d+\.\d+$/)) {
			var sp = A[i].split('.');
			a.push([
				Number(sp[0]), Number(sp[1]), Number(sp[2])
			]);
		}
	}

	var r = findMax(findMax(findMax(a, 0), 1), 2);
	return r[0];
}

// a：二维数组，index，比较第几个
// return：返回保留比较后的结果组成的二维数组
function findMax(a, index) {
	var t = [];
	var b = [];
	var r = [];
	for (var i = 0; i < a.length; i++) {
		t.push(Number(a[i][index]));
	}
	var max = Math.max.apply(this, t);
	for (var i = 0; i < a.length; i++) {
		if (a[i][index] === max) {
			b.push(i);
		}
	}
	for (var i = 0; i < b.length; i++) {
		r.push(a[b[i]]);
	}
	return r;
}


module.exports = {
	getBiggestVersion:getBiggestVersion
}