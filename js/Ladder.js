function Ladder(){
    this.image = game.res["ladder"];
}

Ladder.prototype.render = function(){
    for (var i = 0; i < 19; i++) {
        game.ctx.drawImage(this.image, 54, 100 + i * 32);
        game.ctx.drawImage(this.image, 854, 100 + i * 32);
    }
}