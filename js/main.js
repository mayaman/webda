var display = new Display(16, 4);
display.animate();

var forms = {};


var formOpts = {
  "bass": { "geometry": new THREE.BoxGeometry( 10, 10, 10 ),
          "material": new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
          "duration": 400 
        }
}

// Handle key presses
document.onkeydown = function(e) {
    e = e || window.event;
    e.preventDefault();

    if (e.keyCode == '72') {
      cube = new Soundform(display, 50, 50, false, formOpts["bass"]);
    }

    if (e.keyCode == '38') {
      forms['38'] = (new Soundform(display, 50, 50));
    }
    else if (e.keyCode == '40') {
    }
    else if (e.keyCode == '37') {
    }
    else if (e.keyCode == '39') {

    } else if (e.keyCode == '32') {
    }
};

// Handle key presses
document.onkeyup = function(e) {
    e = e || window.event;
    e.preventDefault();

    if (e.keyCode == '38') {
      // console.log('up');
      // display.removeForm(form.getForm());
    }
    else if (e.keyCode == '40') {
    }
    else if (e.keyCode == '37') {
    }
    else if (e.keyCode == '39') {

    } else if (e.keyCode == '32') {
    }
};


function onWindowResize( event ) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};
