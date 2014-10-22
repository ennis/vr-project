var Projectile = function (speed) {
    this.dir = new THREE.Vector3(0, 0, 0);
    this.pos = new THREE.Vector3(0, 0, 0);
    this.speed = 1;
    this.mesh = typeof speed !== 'undefined' ? speed : 0.1;
}

Projectile.prototype.set = function (dir, pos) {
    this.dir = dir;
    this.pos = pos;

    var geometry = new THREE.SphereGeometry( 1, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position = pos;
}

Projectile.prototype.remove = function () {
    scene.remove(this.mesh);
}

Projectile.prototype.update = function (dt) {
    // TODO
    var newPos = this.dir;
    // newPos.multiplyScalar(dt);
    // console.log(newPos);
    // this.pos.addVectors(newPos);

    // this.mesh.position = this.pos;
}

var projectiles = [];

