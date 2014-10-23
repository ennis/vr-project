(function(){
  var monsterCrowd = [];
  var monsterSpawnInterval = 5;
  var timeSinceLastMonsterPop = 0;

  var haveToCreateMonster = function(dt) {
    timeSinceLastMonsterPop += dt;
    if (timeSinceLastMonsterPop > monsterSpawnInterval) {
      timeSinceLastMonsterPop = 0;
      return true;
    }
    return false;
  };

  var addMonsterToCrowd = function() {
    var newMonster = new Monster();
    monsterCrowd.push(newMonster);

  };


  var timeSinceLastMonsterPop = 0;

  var updateMonsterCrowd = function (dt) {
    var hasReachedPlayer;
    monsterCrowd.forEach(function (monster) {
      hasReachedPlayer = monster.update(dt);
      if (hasReachedPlayer) {
        monster.changeColor();
      }
    });

    if (haveToCreateMonster(dt)) {
      addMonsterToCrowd();
    };
  };

  var bulletInCrowd = function (bullet) {
    bullet.geometry.computeBoundingBox();

    bullet.geometry.computeBoundingSphere();
    var intersectMonster = false;
    for (var i = monsterCrowd.length - 1; i >= 0; i--) {
      // loop backward for deleting objects on the fly
      var monster = monsterCrowd[i];
      if (monster.intersectsBullet(bullet)) {
        monsterCrowd.splice(i, 1);
        monster.remove();
        intersectMonster = true;
      }
    };
    return intersectMonster;
  };

  window.updateMonsterCrowd = updateMonsterCrowd;
  window.bulletInCrowd = bulletInCrowd;
}());
