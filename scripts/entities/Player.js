(function(Ω) {
  "use strict";

  var Player = Ω.Entity.extend({
    w: 14,
    h: 14,

    radius: 10,

    rotation: Ω.utils.deg2rad(0),
    rotSpeed: Ω.utils.deg2rad(3),

    happiness: 10,
    wellbeing: 50,

    depth: 0,
    bredth: 0,
    speed: 0,

    atTop: true,
    bluePilled: false,

    hasCompass: false,
    hasTime: false,
    seenTheLight: false,

    state: null,

    init: function(x, y, screen) {
      this.x = x;
      this.y = y;
      this.screen = screen;

      this.state = new Ω.utils.State("BORN");
    },

    tick: function(map, elapsed) {
      this.state.tick();

      switch (this.state.get()) {
        case "BORN":
          this.state.set("ALIVE");
          break;
        case "ALIVE":
          this.tickAlive();
          break;
        case "DYING":
          if (this.state.count > 80) {
            this.state.set("DEAD");
          }
          break;
        case "DEAD":
          this.screen.gameover();
          break;
      }

      this.move(this.xo, this.yo, map);

      this.depth = this.y / map.h;
      this.bredth = this.x / map.w;
      this.atTop = this.y < 16 * 7;

      if (!this.atTop) {
        this.bluePilled = true;
        game.seenCarl = true;
      }
    },

    tickAlive: function() {
      if (Ω.input.isDown("left")) {
        this.rotation -= this.rotSpeed;
      }

      if (Ω.input.isDown("right")) {
        this.rotation += this.rotSpeed;
      }

      if (this.rotation < 0) {
        this.rotation = Math.PI * 2 + this.rotation;
      }
      if (this.rotation > Math.PI * 2) {
        this.rotation = this.rotation % (Math.PI * 2);
      }

      if (Ω.input.isDown("up")) {
        this.xo = this.speed * Math.cos(this.rotation);
        this.yo = this.speed * Math.sin(this.rotation);
      }

      if (Ω.input.isDown("down")) {
        this.xo = -this.speed * Math.cos(this.rotation);
        this.yo = -this.speed * Math.sin(this.rotation);
      }

      // Bit sad to move
      if (this.atTop && (this.xo !== 0 || this.yo !== 0)) {
        this.happiness = Math.max(0, this.happiness - 0.05 * this.speed);
      }
      this.speed = this.atTop ? 1.28 : 2 * Ω.utils.lerpPerc(1, 0.4, this.depth);
      this.rotSpeed = Ω.utils.deg2rad(3 * Ω.utils.lerpPerc(1, 0.5, this.depth));
    },

    hit: function(e) {
      if (e instanceof Moment) {
        this.happiness = Math.min(100, this.happiness + 10);
        e.remove = true;
      }
    },

    win: function() {
      this.screen.win();
    },

    die: function() {
      if (this.state.is("ALIVE")) {
        this.state.set("DYING");
      }
    }
  });

  window.Player = Player;
})(Ω);
