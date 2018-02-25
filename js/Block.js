function Block(idx) {
    this.idx = idx;
    // this.image1 = game.res["b1"];
    // this.image2 = game.res["b2"];
    // this.image3 = game.res["b3"];
    // this.image4 = game.res["b4"];
    // this.image5 = game.res["b5"];
    this.image_fall = game.res["block_fall"];
    this.image_block = game.res["block"];

    // game.blockArr.push(this.image1, this.image2, this.image3, this.image4, this.image5);
    // game.blockArr.push(this.image1, this.image2, this.image3, this.image4);
    this.randomPicNum = _.random(1);

    this.x = 200;
    this.y = 80;

    this.dx = 0;
    // this.p2dx = 0;

    this.boom = [];
}


Block.prototype.render = function (idx) {
    var self = this;
    var i = idx;
    var randomPicNum = this.randomPicNum;
    this.y1 = self.y * i + 80;
    this.y2 = self.y * i + 160;
    if (randomPicNum == 0) {
        game.ctx.drawImage(self.image_block, self.x + 215, this.y1, 200, 80);
    } else if (randomPicNum == 1) {
        game.ctx.drawImage(self.image_fall, self.x + 215, this.y1, 200, 80);
    }
    // for (var i = 0; i < game.blockArr.length; i++) {
    //     (function(){
    //         game.ctx.drawImage(self.image_block, self.x + 215, self.y * (2 * i) + 80, self.x , 80);
    //         game.ctx.drawImage(self.image_fall , self.x + 215 , self.y * (2*i +1) + 80 , self.x , 80);
    //         //将每一次赋值的y值都放进数组，然后通过遍历数组拿到每个块的y值，下标奇数的为能打的，偶数是不能打的
    //         // self.yArr.push(self.y * (2 * i) + 80 , self.y * (2 * i + 1) + 80);              
    //     })()
    // }
}

Block.prototype.update = function (boolean1, boolean2, dad, i) {
    var self = this;

    this.x1 = parseInt(this.x + 200);
    this.x2 = parseInt(this.x + 400 + 15);
    // this.y1 = parseInt(game.blockArr[this.idx].y);
    // this.y2 = parseInt(this.pipeDownHeight + this.kongge);

    //碰撞事件在此
    if (!boolean1 && !boolean2) {
        if (dad == 1) {
            if (game.p1.ball) {
                if (game.p1.ball.x >= this.x1 && game.p1.ball.y >= this.y1 && game.p1.ball.y <= this.y2) {
                    game.p1.ball.dx = 0;
                    game.p1.ball.dy = -0.88;
                    game.p1BallM = !game.p1BallM;
                    if (this.randomPicNum == 1) {
                        this.dx = 1;
                        this.x += 1;
                    }
                    //渲染爆炸效果
                    for (var i = 0; i < 10; i++) {
                        (function(){
                            self.boom[i] = new Boom(game.p1.ball.x, game.p1.ball.y, game.p1.ball.r);
                        })();
                    }
                    document.getElementById("boom").play();
                }
            }
        }
        if (dad == 2) {
            if (game.p2.ball) {
                if (game.p2.ball.x <= this.x2 && game.p2.ball.y >= this.y1 && game.p2.ball.y <= this.y2) {
                    game.p2.ball.dx = 0;
                    game.p2.ball.dy = -0.88;
                    game.p2BallM = !game.p2BallM;
                    game.p2Boom = !game.p2Boom;                    
                    if (this.randomPicNum == 1) {                       
                        this.dx = -1;
                        this.x -= 1;                        
                    }
                    //渲染爆炸效果
                    for (var i = 0; i < 10; i++) {
                        (function () {
                            self.boom[i] = new Boom(game.p2.ball.x, game.p2.ball.y, game.p2.ball.r);
                        })();
                    }
                    document.getElementById("boom").play();                    
                }
            }
        }

    }

    this.x += this.dx;
    // console.log(this.p1dx);
    // console.log(this.p2dx);
   
    //移动距离判定
    if (this.x1 == 466 || this.x1 == 334 || this.x1 == 532 || this.x1 == 267 || this.x1 == 401) {
        this.dx = 0;
        
    }
    if (this.x1 > 600){      
        clearInterval(game.timer);
        alert("按S的赢了！\nPlayer Press S Win!");
        
    }
    if (this.x1 < 200){
        clearInterval(game.timer);
        alert("按5的赢了！\nPlayer Press 5 Win!");
    }
    // if (this.x1 == 532 || this.x == 267) {
    //     this.dx = 0;

    // }
    // if (this.x1 == 600 || this.x == 200) {
    //     this.dx = 0;

    // }
    // if (this.x2 == 440 && game.ballFlyDis2) {
    //     this.p2dx = 0;
    // }

    // if (this.x2 == 520 && game.ballFlyDis2) {
    //     this.p2dx = 0;

    // }
    // if (this.x2 == 600 && game.ballFlyDis2) {
    //     this.p2dx = 0;

    // }
}