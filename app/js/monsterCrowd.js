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

  window.updateMonsterCrowd = updateMonsterCrowd;
}());
