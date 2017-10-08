class Display {
  constructor(numColumns, maxTracksPerStep) {
    this.numColumns = numColumns;
    this.maxTracksPerStep = maxTracksPerStep;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x563FE8 );
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColorHex( 0x563FE8, 1 );
    document.body.appendChild( this.renderer.domElement );
    this.animate = this.animate.bind(this);

    this.grid = new Array();
    for (var x = 0; x < this.numColumns; x++) {
      this.grid[x] = new Array();
      for (var y = 0; y < this.maxTracksPerStep; y++) {
        this.grid[x][y] = {};
      }
    }

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
    requestAnimationFrame(this.animate);
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;


    for (var i  = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        // update visuals?
      }
    }

    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
  };

}
