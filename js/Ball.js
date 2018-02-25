function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.r = 15;

    //移动的增量
    this.dx = 2;
    //下降的增量
    this.dy = 0.2;
}

Ball.prototype.render = function () {
    game.ctx.save();
    game.ctx.beginPath();
    game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    game.ctx.stroke();
    game.ctx.closePath();
    game.ctx.restore();
}

Ball.prototype.update = function (boolean1 , boolean2 , dad) {
    if (!boolean1 && !boolean2) {
        if (dad == 1) {
            //***********************************************************************此处改为砖块移动的变量           
            // if (this.x >= 300 - this.r) {
            //     this.dx = 0;
            //     this.dy = -0.88;
            //     game.p1BallM = !game.p1BallM;
            // }
            this.x += this.dx;
        }
        if (dad == 2) {
            //***********************************************************************此处改为砖块移动的变量
            // if (this.x <= game.blockArr[i].x2 + this.r * 2) {
            //     this.dx = 0;
            //     this.dy = -0.88;                
            //     game.p2BallM = !game.p2BallM;
            // }
            this.x -= this.dx;
        }
        this.dy += 0.88;
        this.y += this.dy;

        
        //渲染移动的小球
        game.ctx.save();
        game.ctx.beginPath();
        game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        game.ctx.stroke();
        game.ctx.closePath();
        game.ctx.restore();
    }
}