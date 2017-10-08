forms = {
    "bass": { geometry = new THREE.BoxGeometry( 10, 10, 10 ),
            material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
          }
}

class Soundform {
  constructor(display, x, y, recordMode, options) {
    recordMode = recordMode || false;
    x = x || 0;
    y = y || 0;

    this.display = display;

    this.mesh = new THREE.Mesh( options.geometry, options.material);
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    this.mesh.scale.x = .01;
    this.mesh.scale.y = .01;
    this.mesh.scale.z = .01;
    this.addSound();

    if (!recordMode) {
      this.preview();
    } else {
      this.place(x,y);
    }
  }

  addSound() {
    this.display.addForm(this.mesh);
  }

  removeSound() {
    this.display.removeForm(this.mesh);
  }

  preview() {

    //animate scale in
    var target = new THREE.Vector3(1, 1, 1); // create on init
    animateVector3(this.mesh.scale, target, {
    duration: 100, 
    easing : TWEEN.Easing.Bounce.InOut,
        update: function(d) {
            //console.log("Updating Tween: " + d);
        },
        callback : function(){
            console.log("Completed Tween");
            //TODO: WAIT FOR DURATION TO END???

        }
    });
    //animate fade in

    //destroy
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
