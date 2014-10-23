(function() {
  var monsterGeometry = new THREE.BoxGeometry( 6, 6, 6 );
  var popDistance = 200;
  var monsterSpeed = 10;

  var Monster = function() {
    var monsterMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

    this.mesh = new THREE.Mesh( monsterGeometry, monsterMaterial );
    var randomAngle = Math.random() * Math.PI * 2;
    var xCoord = Math.cos(randomAngle)*popDistance;
    var zCoord = Math.sin(randomAngle)*popDistance;

    this.mesh.position.set(xCoord, 0, zCoord);

    window.scene.add(this.mesh);
  };
  Monster.prototype.isTouchingPlayer = function() {
    var epsilon = 0.1;
    return (this.mesh.position.lengthSq() < epsilon);
  };
  Monster.prototype.remove = function() {
    window.scene.remove(this.mesh);
  };

  Monster.prototype.intersectsSphere = function(sphere) {
    this.mesh.geometry.computeBoundingSphere();
    var monsterBoundingSphere = this.mesh.geometry.boundingSphere;
    var positionedBoundingSphere = monsterBoundingSphere.clone();
    positionedBoundingSphere.center = this.mesh.position;

    return positionedBoundingSphere.intersectsSphere(sphere);
  };
  Monster.prototype.constructor = Monster;
  Monster.prototype.changeColor = function() {
    this.mesh.material.color = new THREE.Color(0xff0000);
  };
  Monster.prototype.update = function(dt) {
    if (this.isTouchingPlayer()) {
      return true;
    }

    var playerToMonster = new THREE.Vector3()
      .copy(this.mesh.position)
      .normalize();

    var newMonsterPosition = new THREE.Vector3()
      .copy(this.mesh.position)
      .sub(playerToMonster.multiplyScalar(dt*monsterSpeed));

    this.mesh.position.copy(newMonsterPosition);

    return this.isTouchingPlayer();
  };



  window.Monster = Monster;

}());
