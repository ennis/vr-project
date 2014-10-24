var Projectile = function (speed) {
    this.dir = new THREE.Vector3(0, 0, 0);
    this.pos = new THREE.Vector3(0, 0, 0);
    this.speed = 50;
    this.mesh = typeof speed !== 'undefined' ? speed : 0.1;
}

Projectile.prototype.set = function (pos, dir) {
  this.pos.copy(pos);
  this.dir.copy(dir);

    var geometry = new THREE.SphereGeometry( 1, 8, 8 );
    var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position = pos;
}

Projectile.prototype.remove = function () {
    scene.remove(this.mesh);
}
Projectile.prototype.isTooFar = function () {
  return this.pos.lengthSq() > 50000;
}

Projectile.prototype.update = function (dt) {
    // TODO

    var newPos = this.dir.clone();
    newPos.multiplyScalar(dt * this.speed);
    this.pos.add(newPos);

    this.mesh.position.copy(this.pos);
    if (this.isTooFar()) {
        this.remove();
        return true;
    }
    return false;
}

var projectiles = [];
