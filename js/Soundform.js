class Soundform {
  constructor(display, drumMachine, sound, x, y) {
    this.display = display;
    this.drumMachine = drumMachine;
    this.sound = sound;

    this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.mesh = new THREE.Mesh( this.geometry, this.material);
    this.mesh.position.x = x;
    this.mesh.position.x = y;
    // this.addSound();
  }

  addSound() {
    this.mesh = new THREE.Mesh( this.geometry, this.material);
    this.display.addForm(this.mesh);
  }

  removeSound(self) {
    this.display.removeForm(self.mesh);
  }

  playSound() {
    console.log('playing sound');
    this.addSound();
    this.drumMachine.triggerAttack(this.sound);
    var self = this;
    window.setTimeout(function() {self.removeSound(self)},800)
  }

  preview(length) {

    //animate scale in
    var targetIn = new THREE.Vector3(1, 1, 1); // create on init
    animateVector3(this.mesh.scale, targetIn, {
      duration: length/3,
      easing : TWEEN.Easing.Bounce.In,
          update: function(d) {
              //console.log("Updating Tween: " + d);
          },
          callback : function(){
              console.log("Completed Tween");
              //TODO: WAIT FOR DURATION TO END???
          }
    });

    //destroy
    var self = this;
    window.setTimeout(function() {
      var targetOut = new THREE.Vector3(0, 0, 0);
      animateVector3(self.mesh.scale, targetOut, {
      duration: length/3,
      easing : TWEEN.Easing.Bounce.Out,
          update: function(d) {
              //console.log("Updating Tween: " + d);
          },
          callback : function(){
              console.log("Completed Tween");
              //TODO: WAIT FOR DURATION TO END???
          }
    });

    }, (length/3) * 2);

    window.setTimeout(function() { self.removeSound(self) }, length + 10);
  }

  getForm() {
    return this.form;
  }
}

/* Animates a Vector3 to the target */
function animateVector3(vectorToAnimate, target, options){
    options = options || {};
    // get targets from options or set to defaults
    var to = target || THREE.Vector3(),
        easing = options.easing || TWEEN.Easing.Quadratic.In,
        duration = options.duration || 2000;
    // create the tween
    var tweenVector3 = new TWEEN.Tween(vectorToAnimate)
        .to({ x: to.x, y: to.y, z: to.z, }, duration)
        .easing(easing)
        .onUpdate(function(d) {
            if(options.update){
                options.update(d);
            }
         })
        .onComplete(function(){
          if(options.callback) options.callback();
        });
    // start the tween
    tweenVector3.start();
    // return the tween in case we want to manipulate it later on
    return tweenVector3;
}
