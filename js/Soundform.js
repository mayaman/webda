class Soundform {
  constructor(display, drumMachine, options, x, y, recordMode) {
    this.recording = recordMode;
    this.display = display;
    this.drumMachine = drumMachine;

    this.noteName = options.noteName;
    console.log(options);
    // this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    // this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.color = options.material.color;
    this.mesh = new THREE.Mesh( options.geometry, options.material);
    this.x = x;
    this.y = options.row;
    this.mesh.position.x = this.mapXPos(x);
    this.mesh.position.y = this.mapYPos(this.y);

    console.log('recording: ' + this.recording);
    if (!this.recording) {
      this.mesh.position.x = 0;
      this.mesh.position.y = 0;
      this.mesh.position.z = 30;
      this.mesh.scale.x = .01;
      this.mesh.scale.y = .01;
      this.mesh.scale.z = .01;
      this.dur = options.duration;
      this.preview();
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


  addToScene() {
    // this.mesh = new THREE.Mesh( this.geometry, this.material);
    this.display.addForm(this, this.x, this.y);
  }

  removeFromScene(self) {
    this.display.removeForm(self);
  }

  playSound() {
    console.log('playing sound');
    this.drumMachine.triggerAttack(this.noteName);
    this.addToScene();
  }

  preview() {
    this.display.scene.background = new THREE.Color( 0x563FE8 );
    this.playSound();
    var dur = this.dur;


    var targetIn = new THREE.Vector3(3, 3, 3); // create on init
    animateVector3(this.mesh.scale, targetIn, {
      duration: dur/3,
      easing : TWEEN.Easing.Bounce.In,
          update: function(d) {
              //console.log("Updating Tween: " + d);
          },
          callback : function(){
              console.log("Completed out Tween");
              //TODO: WAIT FOR DURATION TO END???
          }
    });


    //destroy
    var self = this;
    window.setTimeout(function() {
      var targetOut = new THREE.Vector3(1, 1, 1);
      animateVector3(self.mesh.scale, targetOut, {
        duration: dur/3,
        easing : TWEEN.Easing.Bounce.Out,
            update: function(d) {
                //console.log("Updating Tween: " + d);
            },
            callback : function(){
                // console.log("Completed Tween");
                //TODO: WAIT FOR DURATION TO END???
            }
      });
    } , (self.dur/3) * 2);


    window.setTimeout(function() { 
      self.display.scene.background = self.display.mainBg;
      self.removeFromScene(self)
    }, self.dur + 100);
  }

  place( x, y ) {
    //tween to position
    var targetPos = new THREE.Vector3(x, y, -2); // create on init
    animateVector3(this.mesh.position, targetPos, {
      duration: 500, 
      easing : TWEEN.Easing.Elastic.Out,
          update: function(d) {
              console.log("Updating Tween: " + d);
          },
          callback : function(){
              console.log("Completed Tween");
          }
    });

    var targetScale = new THREE.Vector3(2, 2, 2);
    animateVector3(this.mesh.scale, targetScale, {
      duration: 500, 
      easing : TWEEN.Easing.Elastic.Out,
          update: function(d) {
              console.log("Updating Tween: " + d);
          },
          callback : function(){
              console.log("Completed Tween");
          }
    });
  }

  sequenceHit() {
    this.playSound();

    var color = this.color;

    var ogScale = new THREE.Vector3(2,2,2);
    var ogRot = new THREE.Vector3(0,0,0);

    var targetRot = new THREE.Vector3(1, 1, 1);
    var mult = 2.5;
    var targetScale = new THREE.Vector3(ogScale.x * mult, ogScale.y * mult, ogScale.z * mult);

    var dur = this.dur;
    //play animation, rotate + jump?
    animateVector3(this.mesh.rotation, targetRot, {
      duration: dur / 2, 
      easing : TWEEN.Easing.Quartic.In,
          update: function(d) {
              //console.log("Updating Tween: " + d);
          },
          callback : function(){
              console.log("Completed Tween");
          }
    });

    animateVector3(this.mesh.scale, targetScale, {
      duration: dur / 2, 
      easing : TWEEN.Easing.Quartic.In,
          update: function(d) {
              //console.log("Updating Tween: " + d);
          },
          callback : function(){
              console.log("Completed Tween");
          }
    });

    //this.mesh.material.color = new THREE.Color (0xffffff);

    var self = this;
    window.setTimeout(function() {
      animateVector3(self.mesh.scale, ogScale, {
        duration: self.dur/2,
        easing : TWEEN.Easing.Quartic.Out,
            update: function(d) {
                //console.log("Updating Tween: " + d);
            },
            callback : function(){
                console.log("Completed Tween down");
                //TODO: WAIT FOR DURATION TO END???
            }
      });

      animateVector3(self.mesh.rotation, ogRot, {
        duration: self.dur/2,
        easing : TWEEN.Easing.Quartic.Out,
            update: function(d) {
                //console.log("Updating Tween: " + d);
            },
            callback : function(){
                console.log("Completed Tween down");
                //TODO: WAIT FOR DURATION TO END???
            }
      });

      //self.mesh.material.color = color;
    }, (dur/2) );
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
