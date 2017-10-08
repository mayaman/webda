class Display {
  constructor(numColumns, maxTracksPerStep, recording) {
    this.numColumns = numColumns;
    this.maxTracksPerStep = maxTracksPerStep;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x563FE8 );
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 100;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColorHex( 0x563FE8, 1 );
    document.body.appendChild( this.renderer.domElement );
    this.animate = this.animate.bind(this);

    this.text = "not recording";
    // this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    // this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // this.mesh = new THREE.Mesh( this.geometry, this.material);
    // this.mesh.position.x = 0;
    // this.mesh.position.y = 0;
    // this.scene.add(this.mesh);
    //
    // this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    // this.material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
    // this.mesh = new THREE.Mesh( this.geometry, this.material);
    // this.mesh.position.x = 100;
    // this.mesh.position.y = 40;
    // this.scene.add(this.mesh);

    // controls
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.9;
    this.controls.zoomSpeed = 0.5;
    this.controls.rotateSpeed = 0.5;

    this.grid = new Array();
    for (var x = 0; x < this.numColumns; x++) {
      this.grid[x] = new Array();
      for (var y = 0; y < this.maxTracksPerStep; y++) {
        this.grid[x][y] = null;
      }
    }
    this.loadFont();
    this.animate();
  }

  getColumn(col) {
    return this.grid[col];
  }

  addForm(aSoundform) {
    console.log('mesh.x: ' + aSoundform);
    this.grid[aSoundform.x][aSoundform.y] = aSoundform;
    this.scene.add(aSoundform.mesh);
  }

  removeForm(aSoundform) {
    this.grid[aSoundform.x][aSoundform.y] = null;
    console.log("remove...");
    this.scene.remove(aSoundform.mesh);
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

  loadFont() {
    var loader = new THREE.FontLoader();
    var self = this;
    var newFont;
  	loader.load( '../fonts/font.json', function ( font ) {
      self.setFont(font);
  		self.drawText( font );
    } );
  }

  setFont(font) {
    this.font = font;
    console.log(this.font);
  }

  drawText(font) {
    var geometry = new THREE.TextGeometry( this.text, {

		  font: this.font,
			size: 10,
			height: 10,
			curveSegments: 2

		});

		geometry.computeBoundingBox();

		var centerOffset = -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

		var materials = [
			new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: 0.5 } ),
			new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } )
		];

		this.words = new THREE.Mesh( geometry, materials );

		this.words.position.x = -80;
		this.words.position.y = -50;
		this.words.position.z = 0;

		// mesh.rotation.x = 0;
		// mesh.rotation.y = Math.PI * 2;

		// var group = new THREE.Group();
		// group.add( mesh );

		this.scene.add( this.words );
  }

  updateRecordMode() {
    if (this.text == "recording") {
      this.text = "not recording";
    } else {
      this.text = "recording";
    }
    this.scene.remove(this.words);
    this.drawText();
  }

}
