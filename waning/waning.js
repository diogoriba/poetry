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
	var enforceLimits = function (value, min, max) {
		var atLeastMin = Math.max(value, min);
		var atMostMax = Math.min(atLeastMin, max);
		return atMostMax;
	};
	var current = toSeconds(new Date().getTime());
	var opacity = enforceLimits(wane(current), 0, 100);
	var progress = (100 - opacity).toFixed(5);
	$("#text").css({ "opacity": opacity });
	$("#progress").text(progress + "%");
};

var changeFootnote = (function () {
	var counter = 1;
	var change = function () {
		var text = "";
		switch (counter) {
			case 0:
			    text = "...it takes a while, though";
			    break;
			case 1:
			    text = "...but it will keep going on";
			    break;
			case 2:
			    text = "...even if you close this website";
			    break;
			case 3:
			    text = "...it's bound to keep waning";
			    break;
		}
		$("#footnote p:first-child").text(text);
		counter += 1;
		counter = counter % 4;
	};

	return change;
}());

var waning = setInterval(waneDOM, 1000);
var footnote = setInterval(changeFootnote, 5000);
waneDOM();
