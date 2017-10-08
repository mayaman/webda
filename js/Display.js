class Display {
  constructor(numColumns, maxTracksPerStep, currentBPM, formOpts) {

    this.numColumns = numColumns;
    this.maxTracksPerStep = maxTracksPerStep;
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color( 0x000000 );
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.camera.position.z = 100;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.hemiLight = new THREE.HemisphereLight( 0x7DE6FE, 0x3646D4, 1 );

    this.hemiLight.position.set( 0, 10, 0 );
    this.scene.add( this.hemiLight );

    this.dirLight = new THREE.DirectionalLight( 0xffffff, .7 );
    this.dirLight.color.setHSL( 0.1, 1, 0.95 );
    this.dirLight.position.set( 5, 10, 7.50 );
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

    this.renderer = new THREE.WebGLRenderer({ antialias: true });    this.renderer.setSize( window.innerWidth, window.innerHeight );
    // this.renderer.setClearColorHex( 0x563FE8, 1 );
    document.body.appendChild( this.renderer.domElement );
    this.animate = this.animate.bind(this);

    this.text = "not recording";
    this.recording = false;
    this.currentBPM = currentBPM;

    // this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    // this.material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    // this.mesh = new THREE.Mesh( this.geometry, this.material);
    // this.mesh.position.x = 0;
    // this.mesh.position.y = 0;
    // this.scene.add(this.mesh);

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
    var keyLetters = ['q', 'w', 'e', 'r'];
    this.grid = new Array();
    for (var x = 0; x < this.numColumns; x++) {
      this.grid[x] = new Array();
      console.log('max: ' + this.maxTracksPerStep);
      for (var y = 0; y < 4; y++) {
        console.log('key: ' + keyLetters[x]);
        console.log('val: ' + x);
        this.grid[x][y] = new Placeholder(this, x, y, formOpts[keyLetters[y]]);
        this.scene.add(this.grid[x][y].getMesh());
      }
    }
    this.loadFont();
    this.animate();
    this.mainBg = new THREE.Color( 0xB2ACEA )
    this.scene.background = this.mainBg;

    var recordGeometry = new THREE.SphereGeometry( 5, 32, 32 );
    var recordMaterial = new THREE.MeshBasicMaterial( {color: 0xFF3863} );
    this.recordSphere = new THREE.Mesh( recordGeometry, recordMaterial );
    this.recordSphere.position.x = -98;
    this.recordSphere.position.y = -48;
    this.recordSphere.position.z = 0;
    this.recordSphere.material.transparent = true;
    this.recordSphere.material.opacity = 0;
    this.scene.add( this.recordSphere );
  }

  getColumn(col) {
    return this.grid[col];
  }

  addForm(aSoundform) {
    console.log('adding form');
    if (this.recording) {
      this.grid[aSoundform.x][aSoundform.y] = aSoundform;
    }
    this.scene.add(aSoundform.mesh);
  }

  removeForm(aSoundform) {
    console.log('remove');
    if (this.recording) {
      this.grid[aSoundform.x][aSoundform.y] = new Placeholder(this, aSoundform.x, aSoundform.y);
      console.log("remove...");
      this.scene.remove(aSoundform.mesh);
    } else {
      console.log("remove...");
      this.scene.remove(aSoundform.mesh);
    }
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

    if (recording) {
      this.recordSphere.material.opacity = 1 + Math.sin(new Date().getTime() * .006);
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
  		self.drawRecordModeText();
      self.drawBPMText();
    } );
  }

  setFont(font) {
    this.font = font;
    console.log(this.font);
  }

  drawRecordModeText() {
    var geometry = new THREE.TextGeometry( this.text, {

		  font: this.font,
			size: 10,
			height: 10,
			curveSegments: 2

		});

		geometry.computeBoundingBox();

		var centerOffset = -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    var randomNum = Math.random();

    var textColor = (recording) ? 0xFF3863 : 0xBAFFEC;
		var materials = [
			new THREE.MeshBasicMaterial( { color: textColor, overdraw: 0.5 } ),
			new THREE.MeshBasicMaterial( { color: 0x211654, overdraw: 0.5 } )
		];

		this.recordModeText = new THREE.Mesh( geometry, materials );
		this.recordModeText.position.x = -80;
		this.recordModeText.position.y = -50;
		this.recordModeText.position.z = 0;
		this.scene.add( this.recordModeText );
  }

  drawBPMText() {
    var bpmGeometry = new THREE.TextGeometry( "bpm: " + this.currentBPM, {

		  font: this.font,
			size: 10,
			height: 10,
			curveSegments: 2

		});

		bpmGeometry.computeBoundingBox();

		var centerOffset = -0.5 * ( bpmGeometry.boundingBox.max.x - bpmGeometry.boundingBox.min.x );
    var randomNum = Math.random();
		var materials = [
			new THREE.MeshBasicMaterial( { color: 0xBAFFEC, overdraw: 0.5 } ),
			new THREE.MeshBasicMaterial( { color: 0x211654, overdraw: 0.5 } )
		];

		this.bpmText = new THREE.Mesh( bpmGeometry, materials );
		this.bpmText.position.x = 20;
		this.bpmText.position.y = -50;
		this.bpmText.position.z = 0;
		this.scene.add( this.bpmText );
  }

  updateRecordMode() {
    if (this.text == "recording") {
      this.text = "not recording";
      this.recordSphere.material.opacity = 0;
    } else {
      this.text = "recording";
    }
    this.recording = !this.recording;
    this.scene.remove(this.recordModeText);
    this.drawRecordModeText();
  }

  updateBPM(newBPM) {
    this.currentBPM = newBPM;
    this.scene.remove(this.bpmText);
    this.drawBPMText();
  }

}
