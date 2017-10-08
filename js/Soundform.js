class Soundform {
  constructor() {
    this.geometry = new THREE.BoxGeometry( 10, 10, 10 );
    this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    this.form = new THREE.Mesh( this.geometry, this.material);
    this.form.position.x = 50;
  }

  addSound() {

  }

  removeSound() {

  }

  playSound() {

  }

  getForm() {
    return this.form;
  }
}
