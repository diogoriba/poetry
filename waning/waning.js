var increment = 1/766611.0;
var expiration = 1369931400;

var wane = function () {
	var current = Math.floor((new Date()).getTime() / 1000);
	var opacity = Math.max((expiration - current)*increment, 0);
	
	$('#text').css({ 'opacity': opacity });
}

var waning = setInterval(wane, 1000);
wane();