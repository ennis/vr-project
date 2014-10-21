(function() {
  var monsterGeometry = new THREE.BoxGeometry( 2, 2, 2 );
  var monsterMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  var popDistance = 1000;
  var monsterSpeed = 100;

  var Monster = function() {
    this.mesh = new THREE.Mesh( monsterGeometry, monsterMaterial );
    var randomAngle = Math.random() * Math.PI * 2;
    var xCoord = Math.cos(randomAngle)*popDistance;
    var yCoord = Math.sin(randomAngle)*popDistance;

    this.mesh.matrixWorld.setPosition(new THREE.Vector3(xCoord, yCoord, 0));
    console.log("position is reseted to 0 at some points, probably after the render..");
    window.scene.add(this.mesh);
  };

  Monster.prototype.constructor = Monster;
  Monster.prototype.update = function(dt) {
    var playerToMonster = new THREE.Vector3()
      .setFromMatrixPosition(this.mesh.matrixWorld)
      .normalize();

    var newMonsterPosition = new THREE.Vector3()
      .setFromMatrixPosition(this.mesh.matrixWorld)
      .sub(playerToMonster.multiplyScalar(dt*monsterSpeed));

    console.log(newMonsterPosition);
    this.mesh.matrixWorld.setPosition(newMonsterPosition);
  };



  window.Monster = Monster;

}());
