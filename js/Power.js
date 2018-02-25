function Power(x , y , r){
    this.x = x;
    this.y = y;
    this.r = r;

    //增加的弧度
    this.dRad = 0;
    this.powerNum = this.dRad;
}

Power.prototype.update = function(rad){
    //改变power的弧度值
    this.dRad += rad;

    game.ctx.save();
    game.ctx.beginPath();
    game.ctx.arc(this.x, this.y, this.r, 0, this.dRad , false);
    // game.ctx.fillStyle = "red";
    // game.ctx.fill();
    game.ctx.strokeStyle = `rgb(${parseInt(Math.random() * 255)} , ${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)})`;
    game.ctx.lineWidth = 13;    
    game.ctx.stroke();
    game.ctx.closePath();
    game.ctx.restore()
}