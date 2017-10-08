// JavaScript Document

//Tone.Master.volume = 0;

var currentCol = 0;

var currentBPM = 120;

//in init
var drumMachine = new Tone.Sampler({
		"C3" : "sound/Rsn_404_loose.wav",
		"C4" : "sound/808_Cowbell.wav"
	}, function(){
		drumMachine.triggerAttack("C3");
}).toMaster();

var drumNoteNames = ["C3", "C4", "C3", "C4"];

var recording = false;
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
  'q': { "geometry": new THREE.BoxGeometry( 10, 10, 10 ),
          "material": new THREE.MeshBasicMaterial( { color: 0xB246FF} ),
          "duration": 400,
          "row": 0,
          "noteName": "C3"
        },
  'w': { "geometry": new THREE.ConeGeometry( 10, 20, 32 ),
          "material": new THREE.MeshBasicMaterial( { color: 0x5286FF } ),
          "duration": 400,
          "row": 1,
          "noteName": "C4"
        },
  'e': { "geometry": new THREE.DodecahedronGeometry( 10, 0),
        "material": new THREE.MeshBasicMaterial( { color: 0x46FFDE } ),
          "duration": 400,
          "row": 2,
          "noteName": "C4"
        }
}

// Handle key presses
document.onkeydown = function(e) {
    e = e || window.event;
    e.preventDefault();
    //
    console.log('key name: ' + e.key);
    var keyName = e.key;

    // keyMappings[keyName].playSound();
    // keyMappings[keyName].preview(800);
    if (e.keyCode == '32') {
      recording = !recording;
      display.updateRecordMode();
    } else if (keyName == '=') {
      console.log('up');
      currentBPM+=10;
      //ramp the bpm to 120 over 10 seconds
      Tone.Transport.bpm.rampTo(currentBPM, 1);
    } else if (keyName == '-') {
      console.log('up');
      currentBPM-=10;
      Tone.Transport.bpm.rampTo(currentBPM, 1);
    } else {
      var form = new Soundform(display, drumMachine, formOpts[keyName], currentCol, 0, recording);
    }

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

var loop = new Tone.Sequence(function(time, col){
      // console.log('col: ' + col);
      currentCol = col;
      var column = display.getColumn(col);
			for (var i = 0; i < 4; i++){
        // console.log('column[i]: ' + column[i]);
				if (column[i] != null){
					//slightly randomized velocities
					// var vel = Math.random() * 0.5 + 0.5;
          column[i].playSound();
          column[i].jiggle(400);
				}
			}
		}, [0, 1, 2, 3, 4, 5, 6, 7], "8n");

Tone.Transport.start();

Tone.Transport.bpm.value = currentBPM;

loop.start();


var lastScrollTop = 0;
window.scroll(0, 10);
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
window.addEventListener("scroll", function(){ // or window.addEventListener("scroll"....
    console.log('scrolllllllin');
  lastScrollTop = 0;
   var st = window.pageYOffset; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
       // downscroll code
      console.log('down');
      window.scroll(0, -5);
   } else if (st == lastScrollTop) {
      console.log('up?');
   } else {
     // upscroll code
     console.log('up');
     window.scroll(0, 5);
    }
  lastScrollTop = st;
}, false);



function onWindowResize( event ) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};
