var splitUrl = window.location.pathname.toString().split('/');
var gUrl = window.location.origin + '/' + splitUrl[1]
var gClass = splitUrl[2];
var gSubClass = splitUrl[3];
var gApi = window.location.origin + '/api/'