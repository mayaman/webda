class Placeholder {
  constructor(display, x, y, options) {

    this.type = "place";
    this.display = display;

    this.scale = 0.5;

    // this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    this.geometry = options.geometry;
    this.material = new THREE.MeshBasicMaterial( { color: 0x211654 } );
    this.mesh = new THREE.Mesh( this.geometry, this.material);

    this.mesh.scale.x = 0.25;
    this.mesh.scale.y = 0.25;
    this.mesh.scale.z = 0.25;

    this.mesh.position.x = this.mapXPos(x);
    this.mesh.position.y = this.mapYPos(y);
  }

  mapXPos(pos) {
    return -80 + pos*25;
  }

  mapYPos(pos) {
    return -20 + pos*20;
  }


  addToScene() {
    // this.mesh = new THREE.Mesh( this.geometry, this.material);
    this.display.addForm(this);
  }

  removeFromScene(self) {
    this.display.removeForm(self);
  }


  jiggle(length) {
    var targetIn = new THREE.Vector3(0.5, 0.5, 0.5); // create on init
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
      var targetOut = new THREE.Vector3(0.25, 0.25, 0.25);
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

  getMesh() {
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
