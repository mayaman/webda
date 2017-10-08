var display = new Display(16, 4);
var form = new Soundform();
display.animate();

// Handle key presses
document.onkeydown = function(e) {
    e = e || window.event;
    e.preventDefault();

    if (e.keyCode == '38') {
      console.log('up');
      display.addForm(form.getForm());
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
