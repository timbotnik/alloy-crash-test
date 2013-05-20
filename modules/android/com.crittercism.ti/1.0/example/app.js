// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.

Ti.API.info("Ti App: importing Crittercism...");
var crittercism = require('com.crittercism.ti');
Ti.API.info("module is => " + crittercism + "\n");

var didCrash;
if (Titanium.Platform.osname == 'android')
{
	Ti.API.info("Ti App: initializing Crittercism Android...");
	didCrash = crittercism.init("5004e9d1be790e78f2000006");
}
else if (Titanium.Platform.osname == 'iphone')
{
	Ti.API.info("Ti App: initializing Crittercism iOS...");
	crittercism.init("5004e9aa6c36f94dc7000003");
	didCrash = crittercism.didCrashOnLastAppLoad();
}
Ti.API.info("Ti App: Crittercism initialized\n");

Ti.API.info("Ti App: didCrashOnLastLoad: " + didCrash + "\n");

var win = Titanium.UI.createWindow({
	title : 'Crittercism Test',
	backgroundColor : '#fff'
});
crittercism.leaveBreadcrumb("Creating window");

var topLabel = Titanium.UI.createLabel({
	top:10,
	color : '#999',
	text : 'Crittercism Test App!',
	font : {
		fontSize : 16,
		fontFamily : 'Helvetica Neue'
	},
	width : 'auto'
});

win.add(topLabel);

var setMetaData = Titanium.UI.createButton({
	top:35,
	width:301,
	height:30,
	title:'Set Metadata'
});

setMetaData.addEventListener('click', function()
{
	Ti.API.info("setMetaData // Setting Username");
	crittercism.leaveBreadcrumb("setMetaData // Setting Username");
	crittercism.setUsername("TheCritter");
	
	Ti.API.info("setMetaData // Setting Email");
	crittercism.leaveBreadcrumb("setMetaData // Setting Email");
	crittercism.setEmail("support@crittercism.com");
	// try {
	// 	Ti.API.info("setMetaData // Setting Arbitrary Metadata");
	// 	crittercism.leaveBreadcrumb("setMetaData // Setting Arbitrary Metadata");
	// 	// Works for Android
	// 	crittercism.setMetadata({
	// 		"gameLevel": 5,
	// 		"playerID": 9491824
	// 		});
	// } catch (e) {
	// 	Ti.API.error("set Metadata: JSON failed");
	// }
	// Works for Android/iOS
	Ti.API.info("setMetaData // Setting Arbitrary Single Set Metadata");
	crittercism.setMetadata("gameLevel", 6);	// Updates the previously set gameLevel
	crittercism.setMetadata("playerScore", 9491824);
});

win.add(setMetaData);

var crashButton = Titanium.UI.createButton({
	top:70,
	width:301,
	height:30,
	title:'Crash'
});

crashButton.addEventListener('click', function()
{
	crittercism.leaveBreadcrumb("Clicking the crash button");
	doSomething();
});

win.add(crashButton);

var handledButton = Titanium.UI.createButton({
	top:105,
	width:301,
	height:30,
	title:'Send Handled Exception'
});

handledButton.addEventListener('click', function()
{	
	try {
		crittercism.leaveBreadcrumb("Attempting some awesome task...");
		doSomething();
	} catch (err){
		crittercism.leaveBreadcrumb("Oh no, it failed! Log it...");
		crittercism.logHandledException(err);
	}
});

win.add(handledButton);

var doSomething = function doSomething () {
	foo();
}

function foo () {
	bar();
}

function bar () {
	something();
}

var something = function() {
	// throw a custom exception
	var er = new Error("My Awesome Uncaught Error!");
	throw er;

	// create an array with an invalid size
	var a = new Array(0x100000000);

	var array = new Array();

	win.add(array[0]); // this does get caught because the object is undefined and not a proxy
}

var status = false;

var optOutToggle = Titanium.UI.createButton({
	top:140,
	width:301,
	height:30,
	title:'Toggle OptOut Status: No'
});

optOutToggle.addEventListener('click', function()
{
	// Set the status
	crittercism.setOptOutStatus(status = !status);
	
	// change the status in the button title for visibility
	var stringStatus = crittercism.getOptOutStatus() ? "Yes" : "No";
	optOutToggle.title = 'Toggle OptOut Status: ' + stringStatus;
});

win.add(optOutToggle);

win.open();