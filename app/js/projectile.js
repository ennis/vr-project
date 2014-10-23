var Projectile = function (speed) {
    this.dir = new THREE.Vector3(0, 0, 0);
    this.pos = new THREE.Vector3(0, 0, 0);
    this.speed = typeof speed !== 'undefined' ? speed : 50;
    this.mesh = null;
}

Projectile.prototype.set = function (pos, dir) {
  this.pos.copy(pos);
  this.dir.copy(dir);

    var geometry = new THREE.SphereGeometry( 1, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position = pos;
}

Projectile.prototype.remove = function () {
    scene.remove(this.mesh);
}

Projectile.prototype.update = function (dt) {
    var newPos = this.dir.clone();
    newPos.multiplyScalar(dt * this.speed);
    this.pos.add(newPos);

    this.mesh.position.copy(this.pos);
}

var projectiles = [];
