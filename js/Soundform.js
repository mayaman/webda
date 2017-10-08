class Soundform {
  constructor(display, x, y) {
    this.display = display;

    this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.form = new THREE.Mesh( this.geometry, this.material);
    this.form.position.x = x;
    this.form.position.x = y;
    this.addSound();
  }

  addSound() {
    this.display.addForm(this.form);
  }

  removeSound() {
    this.display.removeForm(this.form);
  }

  playSound() {

  }

  getForm() {
    return this.form;
  }
}
