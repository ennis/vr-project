(function() {
  var monsterGeometry = new THREE.BoxGeometry( 2, 2, 2 );
  var monsterMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var popDistance = 200;
  var monsterSpeed = 10;

  var Monster = function() {
    this.mesh = new THREE.Mesh( monsterGeometry, monsterMaterial );
    var randomAngle = Math.random() * Math.PI * 2;
    var xCoord = Math.cos(randomAngle)*popDistance;
    var zCoord = Math.sin(randomAngle)*popDistance;

    this.mesh.position.set(xCoord, 0, zCoord);

    window.scene.add(this.mesh);
  };

  Monster.prototype.constructor = Monster;
  Monster.prototype.update = function(dt) {
    var playerToMonster = new THREE.Vector3()
      .copy(this.mesh.position)
      .normalize();

    var newMonsterPosition = new THREE.Vector3()
      .copy(this.mesh.position)
      .sub(playerToMonster.multiplyScalar(dt*monsterSpeed));

    console.log(newMonsterPosition);
    this.mesh.position.copy(newMonsterPosition);
  };



  window.Monster = Monster;

}());
