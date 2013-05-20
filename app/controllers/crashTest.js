var ctd = require('ti.crashtestdummy');
var crittercism = require("com.crittercism.ti");

crittercism.init(Alloy.CFG.crittercism.APP_ID);

var colors = ['#e73933', '#fdd800', '#f57450'];
var btnColorIdx = 0;

function leaveBreadcrumb(title) {
	crittercism.leaveBreadcrumb(title);
}

function makeButton(name, onClick) {
	var button = Ti.UI.createButton({
		top: 10, 
		width:Ti.UI.FILL,
		height:50,
		title:name,
		color: 'black',
		backgroundColor: colors[btnColorIdx % 3],
		backgroundImage: 'none'
	});
	$.crashView.add(button);
	button.addEventListener('click', onClick);
	btnColorIdx++;
}

makeButton('JS-triggered native exception', function(e) {
	leaveBreadcrumb(e.source.title);
	ctd.throwException();
	});
	
makeButton('JS-triggered native exception (main)', function(e) {
	leaveBreadcrumb(e.source.title);
	ctd.fireInMainThreadUsingTitanium('throwException');
	});
	
makeButton('Uncaught native exception', function(e) {
	leaveBreadcrumb(e.source.title);
	ctd.fireInMainThreadUsingNative('throwException');
	});
	
makeButton('Hard crash', function(e) {
	leaveBreadcrumb(e.source.title);
	ctd.overReleaseMemory();
	});
	
makeButton('OS-triggered kill in foreground', function(e) {
	leaveBreadcrumb(e.source.title);
	ctd.fireInMainThreadUsingNative('deadlock');
	});
	
makeButton('OS-triggered kill entering background', function(e) {
	leaveBreadcrumb(e.source.title);
	ctd.fireInBackgroundThreadUsingNative('deadlock');
	});
	
$.crashWindow.open();