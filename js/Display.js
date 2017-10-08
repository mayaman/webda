class Display {
  constructor(numColumns, maxTracksPerStep) {
    this.numColumns = numColumns;
    this.maxTracksPerStep = maxTracksPerStep;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 100;


    // LIGHTS
    this.hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    this.hemiLight.color.setHSL( 0.6, 1, 0.6 );
    this.hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    this.hemiLight.position.set( 0, 50, 0 );
    this.scene.add( this.hemiLight );
    //hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
    //scene.add( hemiLightHelper );
        
    //
    this.dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    this.dirLight.color.setHSL( 0.1, 1, 0.95 );
    this.dirLight.position.set( -1, 1.75, 1 );
    this.dirLight.position.multiplyScalar( 30 );
    this.scene.add( this.dirLight );

    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.d = 50;
    this.dirLight.shadow.camera.left = -this.d;
    this.dirLight.shadow.camera.right = this.d;
    this.dirLight.shadow.camera.top = this.d;
    this.dirLight.shadow.camera.bottom = -this.d;
    this.dirLight.shadow.camera.far = 3500;
    this.dirLight.shadow.bias = -0.0001;

    //dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 ) 
    //scene.add( dirLightHeper );


    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
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
    this.mainBg = new THREE.Color( 0xB2ACEA )
    this.scene.background = this.mainBg;
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
