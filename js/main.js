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

var formOpts = {
  'cowbell': { "geometry": new THREE.BoxGeometry( 10, 10, 10 ),
          "material": new THREE.MeshBasicMaterial( { color: 0xB246FF } ),
          "duration": 400,
          "sound": "C4"
        },
  'loose': { "geometry": new THREE.ConeGeometry( 10, 20, 32 ),
          "material": new THREE.MeshBasicMaterial( { color: 0x5286FF } ),
          "duration": 400,
          "sound": "C3"
        },
  'bass': { "geometry": new THREE.DodecahedronGeometry( 10, 0),
        "material": new THREE.MeshBasicMaterial( { color: 0x46FFDE } ),
        "duration": 400,
        "sound": "C4"
      }
}

var keyMappings = {};

keyMappings['w'] = formOpts["cowbell"];
keyMappings['ArrowUp'] = formOpts["cowbell"];
keyMappings['e'] = formOpts["loose"];
keyMappings['r'] = formOpts["bass"];

// Handle key presses
document.onkeydown = function(e) {
    e = e || window.event;
    e.preventDefault();

    console.log('key name: ' + e.key);
    var keyName = e.key;

    if (e.keyCode == 32) {
      record = true;
      return;
    } else if (!keyMappings[keyName]) {
      return; //don't cause error if press non-mapped key
    }

    if (!record) {
      x = 0; y = 0;
    } else {
      x = 25; y = 25; //actually set this foreal later
    }
    console.log(x);
    form = new Soundform(display, drumMachine, keyMappings[keyName], x, y);


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
