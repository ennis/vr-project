var Score = function () {
    this.val = 0;
    this.scoreLeft = null;
    this.scoreRight = null;
}

Score.prototype.makeContainers = function (container) {
    var offsetRight = 20 + container.offsetWidth / 2;

    this.scoreLeft = document.createElement('div');
    this.scoreRight = document.createElement('div');

    this.scoreLeft.style.position = 'absolute';
    this.scoreLeft.style.width = 100;
    this.scoreLeft.style.height = 100;
    this.scoreLeft.style.color = 'white';
    this.scoreLeft.style.backgroundcolor = 'blue';
    this.scoreLeft.innerHTML = "";
    this.scoreLeft.style.top = '20px';
    this.scoreLeft.style.left = '10px';

    this.scoreRight.style.position = 'absolute';
    this.scoreRight.style.width = 100;
    this.scoreRight.style.height = 100;
    this.scoreRight.style.color = 'white';
    this.scoreRight.style.backgroundcolor = 'blue';
    this.scoreRight.innerHTML = "";
    this.scoreRight.style.top = '20px';
    this.scoreRight.style.left = offsetRight + 'px'

    container.appendChild(this.scoreLeft);
    container.appendChild(this.scoreRight);
}

Score.prototype.update = function () {
    this.val += 100;
}

Score.prototype.reset = function () {
    this.val = 0;
}

Score.prototype.render = function () {
    var str = "Score: " + this.val;

    this.scoreLeft.innerHTML = str;
    this.scoreRight.innerHTML = str;
}

var score = new Score();

