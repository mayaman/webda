class Soundform {
  constructor(display, drumMachine, options, x, y) {
    x = x || 0;
    y = y || 0;

    this.display = display;
    this.drumMachine = drumMachine;
    this.sound = options.sound;
    // this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    // this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.mesh = new THREE.Mesh( options.geometry, options.material);
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.scale.x = .01;
    this.mesh.scale.y = .01;
    this.mesh.scale.z = .01;
    this.addToScene();

    if (x != 0 && y != 0) {
      this.preview(options.duration);
    } else {
      this.place(x,y)
    }

  }

  addToScene() {
    this.display.addForm(this.mesh);
  }

  removeFromScene(self) {
    //this.display.removeForm(self.mesh);
  }

  playSound() {
    this.drumMachine.triggerAttack(this.sound);
  }

  preview(length) {
    this.playSound();
    //animate scale in
    var targetIn = new THREE.Vector3(5, 5, 5); // create on init
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
      var targetOut = new THREE.Vector3(.1, .1, .1);
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

    window.setTimeout(function() { self.removeFromScene(self) }, length + 10);
  }

  place( x, y ) {
    //tween to position
    var targetPos = new THREE.Vector3(x, y, 0); // create on init
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

  sequenceHit( ) {
    this.playSound();

    //play animation, rotate + jump?
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
