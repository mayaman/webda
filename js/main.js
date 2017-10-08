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


/**********************************/

var display = new Display(16, 4);
display.animate();

var forms = {};

var keyMappings = {};

// keyMappings['ArrowUp'] = new Soundform(display, drumMachine, "C3", 50, 50);
// keyMappings['ArrowDown'] = new Soundform(display, drumMachine, "C4", 25, 25);


var formOpts = {
  'ArrowUp': { "geometry": new THREE.BoxGeometry( 10, 10, 10 ),
          "material": new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
          "duration": 400
        }
}

// Handle key presses
document.onkeydown = function(e) {
    e = e || window.event;
    e.preventDefault();

    console.log('key name: ' + e.key);
    console.log('are u working');
    var keyName = e.key;
    // keyMappings[keyName].playSound();
    // keyMappings[keyName].preview(800);
    var form = new Soundform(display, drumMachine, "C4", formOpts[keyName], 25, 25);

    // if (e.keyCode == '72') {
    //   cube = new Soundform(display, 50, 50, false, formOpts["bass"]);
    // }

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
