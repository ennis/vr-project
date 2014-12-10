(function(){
  var monsterCrowd = [];
  var monsterSpawnInterval = 5;
  var timeSinceLastMonsterPop = 0;
  var initialTime = new Date();

  var complexityBonus = function(timeElapsed, maxComplexity) {
    var levelLast = 30000;
    var complexityFactor = 0.7; //every level, they pop 0.7 seconds faster
    var currentLevel = Math.floor(timeElapsed / levelLast);
    return Math.min(currentLevel * complexityFactor, maxComplexity);
  };

  var haveToCreateMonster = function(dt) {
    timeSinceLastMonsterPop += dt;
    var timeElapsed = new Date() - initialTime;
    if ((timeSinceLastMonsterPop + complexityBonus(timeElapsed, monsterSpawnInterval - 1)) > monsterSpawnInterval) {
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
    bullet.geometry.computeBoundingSphere();
    var bulletPositionedBoundingSphere = bullet.geometry.boundingSphere.clone();
    bulletPositionedBoundingSphere.center = bullet.position;

    var intersectMonster = false;
    for (var i = monsterCrowd.length - 1; i >= 0; i--) {
      // loop backward for deleting objects on the fly
      var monster = monsterCrowd[i];
      if (monster.intersectsSphere(bulletPositionedBoundingSphere)) {
        monsterCrowd.splice(i, 1);
        monster.remove();
        intersectMonster = true;
        score.update();
      }
    };
    return intersectMonster;
  };

  window.updateMonsterCrowd = updateMonsterCrowd;
  window.bulletInCrowd = bulletInCrowd;
}());
