class Soundform {
  constructor(display, drumMachine, sound, options, x, y, recordMode) {
    this.recording = recordMode;
    this.display = display;
    this.drumMachine = drumMachine;
    this.noteName = options.noteName;
    console.log(options);
    // this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    // this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.mesh = new THREE.Mesh( options.geometry, options.material);
    this.x = x;
    this.y = options.row;
    this.mesh.position.x = this.mapXPos(x);
    this.mesh.position.y = this.mapYPos(this.y);
    // this.addSound();
    // this.preview(options.duration);
    console.log('recording: ' + this.recording);
    if (!this.recording) {
      this.mesh.scale.x = .01;
      this.mesh.scale.y = .01;
      this.mesh.scale.z = .01;
      this.preview(options.duration);
    } else {
      console.log('place');
      this.addSound();
      // this.place(x,y);
    }
  }

  mapXPos(pos) {
    return -80 + pos*25;
  }

  mapYPos(pos) {
    return pos*20;
  }

  addSound() {
    // this.mesh = new THREE.Mesh( this.geometry, this.material);
    this.display.addForm(this, this.x, this.y);
  }

  removeSound(self) {
    this.display.removeForm(self);
  }

  playSound() {
    console.log('playing sound');
    this.addSound();
    this.drumMachine.triggerAttack(this.noteName);
    var self = this;
    if (!this.recording) {
      window.setTimeout(function() {self.removeSound(self)},800);
    }
  }

  preview(length) {
    this.playSound();
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

  place(step) {
    //tween to position
    console.log('placing object');
    var target = new THREE.Vector3(100, -20, 20); // create on init
    animateVector3(this.mesh.position, target, {
    duration: 5000,
    easing : TWEEN.Easing.Quadratic.InOut,
        update: function(d) {
            console.log("Updating Tween: " + d);
        },
        callback : function(){
            console.log("Completed Tween");
        }
    });
  }

  jiggle(length) {
    var targetIn = new THREE.Vector3(2, 2, 2); // create on init
    animateVector3(this.mesh.scale, targetIn, {
      duration: length/3,
      easing : TWEEN.Easing.Bounce.In,
          update: function(d) {
              //console.log("Updating Tween: " + d);
          },
          callback : function(){
              // console.log("Completed Tween");
              //TODO: WAIT FOR DURATION TO END???
          }
    });

    //destroy
    var self = this;
    window.setTimeout(function() {
      var targetOut = new THREE.Vector3(1, 1, 1);
      animateVector3(self.mesh.scale, targetOut, {
      duration: length/3,
      easing : TWEEN.Easing.Bounce.Out,
          update: function(d) {
              //console.log("Updating Tween: " + d);
          },
          callback : function(){
              // console.log("Completed Tween");
              //TODO: WAIT FOR DURATION TO END???
          }
    });

    }, (length/3) * 2);
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
