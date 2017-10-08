// AUDIO
var listener, sound, audioLoader;
//Create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
var sound = new THREE.Audio( listener );
var audioLoader = new THREE.AudioLoader();

//Load a sound and set it as the Audio object's buffer
audioLoader.load( 'sound/dreamer.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop(true);
	sound.setVolume(0.5);
	// sound.play();
});

//Create an AudioAnalyser, passing in the sound and desired fftSize
var bufferLength = 512;
var analyser = new THREE.AudioAnalyser( sound, bufferLength );
var audioArray = new Uint8Array(bufferLength);

init();

class AudioHandler {
  constructor() {
    this.player;
  }

  loadSound(url) {
    this.player = new Tone.Player(url).toMaster();
    this.player.buffer.onload = this.audioLoaded;
  }

  audioLoaded() {
    this.player.start(0);
  }

  playSound() {
    this.source.start(0);
  }
}
