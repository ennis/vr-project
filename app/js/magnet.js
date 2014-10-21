var Magnet = function (threshold) {
    this.alpha = 0;
    this.beta = 0;
    this.gamma = 0;
    this.abs = 0;
    this.threshold = typeof threshold !== 'undefined' ? threshold : 1;

    this.previousN = 0;
    this.n = this.norm(this.alpha, this.beta, this.gamma);
}

Magnet.prototype.hasChanged = function () {
    return (abs(this.previousN - this.n) >= this.threshold);
}

Magnet.prototype.norm = function () {
    var squaredNorm = this.alpha * this.alpha + this.beta * this.beta + this.gamma * this.gamma;

    return (Math.sqrt(squaredNorm));
}

Magnet.prototype.compute = function () {
    this.previousN = this.n;
    this.n = this.norm(this.alpha, this.beta, this.gamma);
}

var magnet = new Magnet();

window.addEventListener('deviceorientation', function(evt){
    magnet.alpha = evt.alpha;
    magnet.beta = evt.beta;
    magnet.gamma = evt.gamma;

    magnet.abs = evt.absolute;

    console.log(magnet.n.toString());
    magnet.compute();
    if (magnet.hasChanged()) {
        console.log("changed");
        cube.material.color.setHex(0x0000ff);
    }
}, true);

