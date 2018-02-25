function P2() {
    this.image = game.res["2p"];
    this.x = 854;
    this.y = 0;
    this.dy = 3;

    this.count = 1;
    //小球身份标记
    this.dad = 2;

    this.power = new Power(750, 750, 20);
}

P2.prototype.render = function () {
     //                         切片X 切片Y 切片W 切片H|切片X     切片Y    切片W  切片H 
    game.ctx.drawImage(this.image, 3, 29 , 116 , 73 , this.x , this.y + 100 , 116 , 73);
    if (game.p2Ball) {
        this.ball = new Ball(830, this.y + 135);
        this.ball.render();
    }

    //渲染能量条边框
    game.ctx.save();
    game.ctx.beginPath();
    game.ctx.arc(750, 750, 30, 0, Math.PI * 2, false);
    game.ctx.stroke();
    game.ctx.closePath();
    game.ctx.font = "25px 微软雅黑"
    game.ctx.fillText("POWER", 810, 760);
    game.ctx.restore();

    //在按键按下的时候改变power
    this.power.update(game.p2Power);
}

P2.prototype.update = function () {
    this.y += this.dy;
    if (this.y <= 0 || this.y >= 530) {
        this.dy = -this.dy;
        this.count++;
    }
    if (this.ball) {
        this.ball.update(game.p2Ball, game.p2BallM , this.dad);
    }

    var self = this;
    for (var i = 0; i <= 7; i++) {
        (function () {
            game.blockArr[i].update(game.p2Ball, game.p2BallM, self.dad);
        })()
    }
}