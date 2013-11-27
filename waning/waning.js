var makeLinearFunction = function (x1, y1, x2, y2) {
	var deltaY = y2 - y1;
	var deltaX = x2 - x1;
	var slope = deltaY/deltaX;
	var adjustment = y1 - (x1 * slope);
	return function (x) {
		return slope * x + adjustment;
	};
};

var makeLinearFadeFunction = function (start, end) {
	return makeLinearFunction(start, 100, end, 0);
};

var toSeconds = function (milliseconds) {
	return Math.floor(milliseconds / 1000);
};

var start = toSeconds(new Date(2013, 10, 27).getTime()); // why the hell months have 0-based indexes??
var end = toSeconds(new Date(2013, 11, 21).getTime());
var wane = makeLinearFadeFunction(start, end);

var waneDOM = function () {
	var current = toSeconds(new Date().getTime());
	var opacity = wane(current);
	$("#text").css({ "opacity": opacity });
}

var waning = setInterval(waneDOM, 1000);
waneDOM();