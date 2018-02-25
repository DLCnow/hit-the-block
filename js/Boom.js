function Boom(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    do {
        this.dx = parseInt(Math.random() * 8 - 4)
        this.dy = parseInt(Math.random() * 8 - 4)
    } while (this.dx == 0 && this.dy == 0);
    this.init();
}
Boom.prototype.init = function () {      
        game.ctx.save();
        game.ctx.beginPath();
        game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        game.ctx.fillStyle = `rgb(${parseInt(Math.random() * 255)} , ${parseInt(Math.random() * 255) },${parseInt(Math.random() * 255)})`;
        game.ctx.fill();
        game.ctx.stroke();
        game.ctx.closePath();
        game.ctx.restore();
};

Boom.prototype.update = function () {
    var self = this;
    this.x += this.dx;
    this.y += this.dy;
    this.r--;
    if (this.r < 0) {
        this.r = 0;
    }
}