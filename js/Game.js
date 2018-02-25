function Game() {
    this.f = 0;
    //判断小球在键盘按下的时候才出现的信号量
    this.p1Ball = false;
    this.p2Ball = false;
    //判断键盘按键只给ballFlyX赋值一次的信号量
    this.p1BallFlyX = true;
    this.p2BallFlyX = true;
    //判断小球触边界消失的信号量
    this.p1BallM = false;
    this.p2BallM = false;
    //能量条
    this.p1Power = 0;
    this.p2Power = 0;
    //碰撞之后开启爆炸
    this.p1Boom = false;
    this.p2Boom = false;
    //砖块数组
    this.blockArr = [];
    this.init();
    this.bindEvent();
}
//初始化 得到画布
Game.prototype.init = function () {
    this.mycanvas = document.getElementById("mycanvas");
    this.ctx = mycanvas.getContext("2d");
    //创建初始资源文件
    this.res = {
        "1p": "images/1p.png",
        "2p": "images/2p.png",
        "ladder": "images/ladder.png",
        "block": "images/block.png",
        "block_fall": "images/block_fall.png"
        // "b1": "images/b1.png",
        // "b2": "images/b2.png",
        // "b3": "images/b3.png",
        // "b4": "images/b4.png",
        // "b5": "images/b5.png"
    }
    //图片加载时的等候界面
    var self = this;
    var length = Object.keys(this.res).length;
    var count = 0;
    for (var k in this.res) {
        var image = new Image();
        image.src = this.res[k];
        this.res[k] = image;
        //图片加载
        image.onload = function () {
            count++;
            self.clear();

            //用save()和restore()包裹起来免得影响别的元素
            self.ctx.save();
            self.ctx.font = "18px 微软雅黑";
            self.ctx.fillStyle = "#38b774";
            self.ctx.textAlign = "center";
            self.ctx.fillText(`加载中，请稍后：${count} / ${length}`, self.mycanvas.width / 2, 80);
            self.ctx.restore();

            //图片加载完毕之后就可以开始了
            if (count == length) {
                self.clear();
                self.start();
            }
        }
    }
}
//定义清屏函数
Game.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.mycanvas.width, this.mycanvas.height);
}

//绑定事件
Game.prototype.bindEvent = function () {
    var self = this;
    this.mycanvas.addEventListener('keydown', doKeyDown, false);
    this.mycanvas.addEventListener('keyup', doKeyUp, false);
    this.mycanvas.focus();

    this.ballFlyX1 = 0;
    this.ballFlyX2 = 0;
    //键盘按下事件
    function doKeyDown(event) {
        if (event.keyCode == 83 && self.p1BallFlyX) {
            self.p1.dy = 0;
            self.p1Ball = true;

            //获取第一次按键的帧值
            self.ballFlyX1 = self.f;

            //判断一次按键的信号量
            self.p1BallFlyX = false;

            //power增加
            self.p1Power = 0.1256;

            //将触边界的小球的信号量初始化
            self.p1BallM = false;
        }

        if (event.keyCode == 101 && self.p2BallFlyX) {
            self.p2.dy = 0;
            self.p2Ball = true;

            //获取第一次按键的帧值
            self.ballFlyX2 = self.f;

            //判断一次按键的信号量
            self.p2BallFlyX = false;

            //power增加
            self.p2Power = 0.1256;

            //将触边界的小球的信号量初始化
            self.p2BallM = false;
        }
    }
}




//键盘抬起事件
function doKeyUp(event) {
    if (event.keyCode == 83 && self.p1.count % 2 == 0 && !self.p1BallFlyX) {
        //**********返回的时候************//
        self.p1.dy = -3;
        self.p1Ball = false;

        //非常重要的用来计算小球力度和砖块移动距离的值
        self.ballFlyDis1 = self.f - self.ballFlyX1;

        //设置力度改变小球飞行距离
        if (self.ballFlyDis1 > 48) {
            self.ballFlyDis1 = 48;
        }
        self.p1.ball.dx += self.ballFlyDis1;

        //判断一次按键的信号量
        self.p1BallFlyX = true;

        //power归零
        self.p1Power = 0;
        self.p1.power.dRad = 0;

        document.getElementById("p1").play();
    } else if (event.keyCode == 83 && self.p1.count % 2 != 0 && !self.p1BallFlyX) {
        //**********正常的时候************//        
        self.p1.dy = 3;
        self.p1Ball = false;

        //非常重要的用来计算小球力度和砖块移动距离的值
        self.ballFlyDis1 = self.f - self.ballFlyX1;

        //设置力度改变小球飞行距离        
        if (self.ballFlyDis1 > 48) {
            self.ballFlyDis1 = 48;
        }
        self.p1.ball.dx += self.ballFlyDis1;
        // console.log(self.p1.ball.dx);


        //判断一次按键的信号量
        self.p1BallFlyX = true;

        //power归零
        self.p1Power = 0;
        self.p1.power.dRad = 0;

        document.getElementById("p1").play();
    }

    if (event.keyCode == 101 && self.p2.count % 2 == 0 && !self.p2BallFlyX) {
        //**********返回的时候************//        
        self.p2.dy = -3;
        self.p2Ball = false;

        //非常重要的用来计算小球力度和砖块移动距离的值
        self.ballFlyDis2 = self.f - self.ballFlyX2;

        //设置力度改变小球飞行距离       
        if (self.ballFlyDis2 > 48) {
            self.ballFlyDis2 = 48;
        }
        self.p2.ball.dx += self.ballFlyDis2;

        //判断一次按键的信号量
        self.p2BallFlyX = true;

        //power归零
        self.p2Power = 0;
        self.p2.power.dRad = 0;

        document.getElementById("p2").play();        
    } else if (event.keyCode == 101 && self.p2.count % 2 != 0 && !self.p2BallFlyX) {
        //**********正常的时候************//        
        self.p2.dy = 3;
        self.p2Ball = false;

        //非常重要的用来计算小球力度和砖块移动距离的值
        self.ballFlyDis2 = self.f - self.ballFlyX2;

        //设置力度改变小球飞行距离       
        if (self.ballFlyDis2 > 48) {
            self.ballFlyDis2 = 48;
        }
        self.p2.ball.dx += self.ballFlyDis2;

        //判断一次按键的信号量
        self.p2BallFlyX = true;

        //power归零
        self.p2Power = 0;
        self.p2.power.dRad = 0;

        document.getElementById("p2").play();        
    }


}



//开始主函数
Game.prototype.start = function () {
    //肯定有定时器，所以先备份this
    self = this;
    this.ladder = new Ladder();
    this.p1 = new P1();
    this.p2 = new P2();
    // this.boomArr1 = [];
    // this.boomArr2 = [];
    if (this.p1Boom) {
        for (var i = 0; i < 10; i++) {
            (function () {
                self.boom[i] = new Boom(self.p1.ball.x, self.p1.ball.y, self.p1.ball.r, self.p1Boom);
            })()
        }
    }
    if (this.p2Boom) {
        for (var i = 0; i < 10; i++) {
            (function () {
                self.boom[i] = new Boom(self.p2.ball.x, self.p2.ball.y, self.p2.ball.r, self.p2Boom);
            })()
        }
    }

    for (var i = 0; i <= 7; i++) {
        (function () {
            self.blockArr[i] = new Block(i);
        })()
    }
    this.timer = setInterval(function () {
        self.f++;
        if (self.f % 20) {
            self.clear();

            //渲染梯子
            self.ladder.render();

            //渲染升级P1
            self.p1.render();
            self.p1.update();

            //渲染升级P2
            self.p2.render();
            self.p2.update();

            //渲染升级砖块
            for (var i = 0; i <= 7; i++) {
                (function () {
                    self.blockArr[i].render(i);
                })()
            }
            // console.log(self.blockArr[i].boom[i].init(i));


            for (var i = 0; i <= 7; i++) {
                if (self.blockArr[i].boom.length != 0) {
                    for (var j = 0; j < 10; j++) {
                        self.blockArr[i].boom[j].init();
                        self.blockArr[i].boom[j].update();
                    }
                }
            }
        }
    }, 20)

}