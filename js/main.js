// JavaScript Document

//Tone.Master.volume = 0;

//in init
var drumMachine = new Tone.Sampler({
		"C3" : "sound/Rsn_404_loose.wav",
		"C4" : "sound/808_Cowbell.wav"
	}, function(){
		drumMachine.triggerAttack("C3");
}).toMaster();

var record = false;
var transportTime = 0.0;
var keyDown;


//key fired, record event...
//time++ in animate();
//now when key pressed...
// Tone.Transport.schedule(function(time){
// 	//callback
// }, transportTime /*currentTime*/);
//
//
// function keyDown( keyCode ){
// 	if(record){
// 		Tone.Transport.schedule(function(time){
// 			//callback
// 		}, transportTime);
// 	}
// 	playSound( keyCode );

// }

// function playSound( keyCode ){
// 	if(keyCode == '38'){
// 		drumMachine.triggerAttack("C3");
// 		console.log('playSound');
// 	} else if(keyCode == '70'){
// 		drumMachine.triggerAttack("E3");
// 	} else if(keyCode == '68'){
// 		drumMachine.triggerAttack("G2");
// 	} else if(keyCode == '65'){
// 		drumMachine.triggerAttack("C4");
// 	}
// }



/**********************************/

var display = new Display(16, 4);
display.animate();

var forms = {};

var keyMappings = {};

keyMappings['ArrowUp'] = new Soundform(display, drumMachine, "C3", 50, 50);
keyMappings['ArrowDown'] = new Soundform(display, drumMachine, "C4", 25, 25);

// Handle key presses
document.onkeydown = function(e) {
    e = e || window.event;
    e.preventDefault();
    console.log('key name: ' + e.key);
    console.log('are u working');
    var keyName = e.key;
    // keyMappings[keyName].playSound();
    keyMappings[keyName].preview(800);
};

// Handle key presses
document.onkeyup = function(e) {
    e = e || window.event;
    e.preventDefault();
    var keyName = e.key;

};


function onWindowResize( event ) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};
