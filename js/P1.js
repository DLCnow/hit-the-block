function P1() {
    this.image = game.res["1p"];
    this.x = 54;
    this.y = 0;
    this.dy = 3;
    //用于计数 解决每次按键都停住的问题
    this.count = 1;
    //小球身份标记
    this.dad = 1;

    this.power = new Power(300, 750, 20);

    //能量条数值
    this.powerNum = this.power.dRad;
}

P1.prototype.render = function () {
    //                           切片X 切片Y 切片W 切片H|切片X     切片Y    切片W  切片H 
    game.ctx.drawImage(this.image, 8, 30, 120, 74, this.x, this.y + 100, 120, 74);
    if (game.p1Ball) {
        this.ball = new Ball(200, this.y + 135);
        this.ball.render();
    }

    //渲染能量条边框
    game.ctx.save();
    game.ctx.beginPath();
    game.ctx.arc(300, 750, 30, 0, Math.PI * 2, false);
    game.ctx.stroke();
    game.ctx.closePath();
    game.ctx.font = "25px 微软雅黑"
    game.ctx.fillText("POWER", 160, 760);
    game.ctx.restore();



    //在按键按下的时候改变power
    this.power.update(game.p1Power);
}

P1.prototype.update = function (i) {
    this.y += this.dy;
    if (this.y <= 0 || this.y >= 530) {
        this.dy = -this.dy;
        this.count++;
    }
    if (this.ball) {
        //     switch (this.y) {
        //         case this.y >= 0 && this.y < 30:

        //             break;
        //         case this.y >= 30 && this.y < 101:

        //             break;
        //         case this.y >= 101 && this.y < 172:

        //             break;
        //         case this.y >= 172 && this.y < 243:

        //             break;
        //         case this.y >= 243 && this.y < 314:

        //             break;
        //         case this.y >= 314 && this.y < 385:

        //             break;
        //         case this.y >= 385 && this.y < 456:

        //             break;
        //         case this.y >= 456 && this.y < 530:

        //             break;
        //         default:

        //     }
        this.ball.update(game.p1Ball, game.p1BallM, this.dad);

        var self = this;
        for (var i = 0; i <= 7; i++) {
            (function () {
                game.blockArr[i].update(game.p1Ball, game.p1BallM, self.dad);
            })()
        }
    }
}