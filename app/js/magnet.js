var Magnet = function () {
    this.accelX = 0,
    this.accelY = 0,
    this.accelZ = 0,
    this.jerkX = 0,
    this.jerkY = 0,
    this.jerkZ = 0,
    this.jerkBigX = 0,
    this.jerkBigY = 0,
    this.jerkBigZ = 0;
}

Magnet.prototype.update = function (newAccelX, newAccelY, newAccelZ) {
    this.jerkX = newAccelX?(newAccelX - this.accelX).toFixed(4):0;
    this.jerkBigX = Math.abs(this.jerkX);
    this.jerkY = newAccelY?(newAccelY - this.accelY).toFixed(4):0;
    this.jerkBigY = Math.abs(this.jerkY);
    this.jerkZ = newAccelZ?(newAccelZ - this.accelZ).toFixed(4):0;
    this.jerkBigZ = Math.abs(this.jerkZ);

    this.accelX = newAccelX?newAccelX.toFixed(4):0;
    this.accelY = newAccelY?newAccelY.toFixed(4):0;
    this.accelZ = newAccelZ?newAccelZ.toFixed(4):0;
}

Magnet.prototype.hasChanged = function () {
    function f (val, max) {
        if (max < 1) {
            return false;
        }

        if (max > val) {
            return true;
        } else {
            return false;
        }
    }

    return (f(this.jerkX, this.jerkBigX) || f(this.jerkY, this.jerkBigY) || f(this.jerkZ, this.jerkBigZ));
}

var magnet = new Magnet();

window.addEventListener('devicemotion', function (e) {
    magnet.update(e.acceleration.x, e.acceleration.y, e.acceleration.z);

    // We can now use magnet.hasChanged() to know
    // if the phone moves a little
});

