(function() {

  if(typeof window.Hanoi === "undefined") {
    window.Hanoi = {};
  }
  var Hanoi = window.Hanoi;

  var View = Hanoi.View = function(game, $el) {
    this.game = game;
    this.$el = $el;
    this.firstClick = null;
    this.setupBoard();
    this.render();
  };

  View.prototype.setupBoard = function () {
    var $tower;
    for (var i = 0; i < 3; i++) {
      $tower = $("<ul></ul>");
      $tower.data("id", i);
      if( i === 0 ) {
        var $li;
        for (var j = 1; j < 4; j++) {
          $li = $("<li></li>");
          $li.addClass("disc" + j);
          $tower.append($li);
        }
      }
      this.$el.append($tower);
    }
  };

  View.prototype.removeOld = function () {
    this.$el.find("ul").off();
    this.$el.empty();
  };

  View.prototype.bindNew = function () {
    this.$el.find("ul").on("click", this.clickTower.bind(this));
  };

  View.prototype.clickTower = function (e) {
    // debugger;
    var $tower = $(e.target);
    if(this.firstClick === null) {
      this.firstClick = $tower.data("id");
    } else {
      this.makeMove($tower);
    }
  };

  View.prototype.makeMove = function (secondTower) {
    this.game.move(this.firstClick, secondTower.data("id"));
    this.firstClick = null;
    console.log(secondTower.data("id"));
    this.render();
    this.checkGameState();
  };

  View.prototype.checkGameState = function () {
    if(this.game.isWon()) {
      alert("Congratulations! You win!");
    }
    // body...
  };

  View.prototype.render = function () {
    var gameStacks = this.game.towers;
    this.removeOld();
    for (var i = 0; i < 3; i++) {
      var $tower = $("<ul></ul>");
      $tower.data("id", i);
      var $li;
      for(var j = gameStacks[i].length -1; j >= 0 ; j--) {
        $li = $("<li></li>");
        $li.addClass("disc" + gameStacks[i][j]);
        $tower.append($li);
      }
      this.$el.append($tower);
    }
    this.bindNew();
  };

})();
