class Display {
  constructor(numColumns, maxTracksPerStep) {
    this.numColumns = numColumns;
    this.maxTracksPerStep = maxTracksPerStep;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    this.animate = this.animate.bind(this);
    this.animate();
  }

  addForm(mesh) {
    this.scene.add(mesh);
  }

  removeForm(mesh) {
    console.log("remove...");
    this.scene.remove(mesh);
  }

  animate() {
    requestAnimationFrame( this.animate );
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;

    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
  };

}
