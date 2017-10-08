// JavaScript Document

//Tone.Master.volume = 0;


var formOpts = {
  'q': { "geometry": new THREE.BoxGeometry( 11, 11, 10 ),
          "material": new THREE.MeshPhongMaterial( { color: 0xB246FF} ),
          "duration": 400,
          "row": 0,
          "noteName": "C3"
        },
  'w': { "geometry": new THREE.OctahedronGeometry( 10, 0),
          "material": new THREE.MeshPhongMaterial( { color: 0x5286FF } ),
          "duration": 400,
          "row": 1,
          "noteName": "C4"
        },
  'e': { "geometry": new THREE.DodecahedronGeometry( 8, 0),
        "material": new THREE.MeshPhongMaterial( { color: 0xEC36FF } ),
          "duration": 400,
          "row": 2,
          "noteName": "C5"
        },
  'r': { "geometry": new THREE.ConeGeometry( 8, 12, 8 ),
        "material": new THREE.MeshPhongMaterial( { color: 0x48FFAA } ),
          "duration": 400,
          "row": 3,
          "noteName": "C6"
        }
}

var currentCol = 0;

var currentBPM = 120;

var pad = new Tone.Synth({
		"oscillator" : {"type" : "sine"},
		"envelope" : {"attack" : "0.8", "decay" : "2.0", "sustain" : "0.0", "release" : "4.0"}
	}).toMaster();
pad.oscillator.detune = 0.8;

//in init
var drumMachine = new Tone.Sampler({
		"C3" : "sound/kick.wav",
		"C4" : "sound/snare.wav",
		"C5" : "sound/HH_Open.wav",
		"C6" : "sound/HH_Closed.wav"
	}, function(){
		drumMachine.triggerAttack("C3");
}).toMaster();

var drumNoteNames = ["C3", "C4", "C5", "C6"];

var recording = false;
var transportTime = 0.0;
var keyDown;


/**********************************/

var display = new Display(8, 4, currentBPM, formOpts);
display.animate();

var forms = {};

var keyMappings = {};

var metro = new Tone.Synth({
		"oscillator" : {"type" : "sine"},
		"envelope" : {"attack" : "0.02", "decay" : "0.02", "sustain" : "0.0", "release" : "1.0"}
	}).toMaster();
metro.volume = -7.0;
//Do this if record is true

var metroEventID;
function checkMetro() {
  if (recording) {
    metroEventID = Tone.Transport.scheduleRepeat(function(time){
    		metro.triggerAttack("C4");
    	}, "4n");
  } else {
    Tone.Transport.clear(metroEventID);
  }
}


// keyMappings['ArrowUp'] = new Soundform(display, drumMachine, "C3", 50, 50);
// keyMappings['ArrowDown'] = new Soundform(display, drumMachine, "C4", 25, 25);


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
      checkMetro();
      display.updateRecordMode();
    } else if (keyName == '=') {
      console.log('up');
      currentBPM+=1;
      display.updateBPM(currentBPM);
      //ramp the bpm to 120 over 10 seconds
      Tone.Transport.bpm.rampTo(currentBPM, 1);
    } else if (keyName == '-') {
      console.log('up');
      currentBPM-=1;
      display.updateBPM(currentBPM);
      Tone.Transport.bpm.rampTo(currentBPM, 1);
    } else {
      var soundform = new Soundform(display, drumMachine, formOpts[keyName], currentCol, 0, recording);
      soundform.playSound();
      console.log('haaiiiiiiii');
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
        console.log('column type: ' + column[i].type);
				if (column[i].type != "place"){
					//slightly randomized velocities
					// var vel = Math.random() * 0.5 + 0.5;
          column[i].playSound();
				}
        column[i].jiggle(400);
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
