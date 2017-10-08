class Soundform {
  constructor(display, x, y, recordMode, options) {
    recordMode = recordMode || false;
    x = x || 0;
    y = y || 0;

    this.display = display;
    this.name = "cube";
    this.mesh = new THREE.Mesh( options.geometry, options.material);
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    this.mesh.scale.x = .01;
    this.mesh.scale.y = .01;
    this.mesh.scale.z = .01;
    this.addSound();

    if (!recordMode) {
      this.preview(options.duration);
    } else {
      this.place(x,y);
    }
  }

  addSound() {
    //this.display.addForm(this.mesh);
    this.display.scene.add(this.mesh);
  }

  removeSound(self) {
    console.log("hi");
    this.display.removeForm(self.mesh);
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

  place(step) {
    //tween to position
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

  playback() {
    //playback anim
  }

  getForm() {
    return this.mesh;
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
