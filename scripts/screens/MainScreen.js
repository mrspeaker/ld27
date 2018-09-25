(function(Ω) {
  "use strict";

  var MainScreen = Ω.Screen.extend({
    sheet: new Ω.SpriteSheet("res/images/sheet.png", 16, 16),
    sprites: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

    time: 0,

    sounds: {
      theme: new Ω.Sound("res/audio/tunke", 0.8, true),
      tock: new Ω.Sound("res/audio/tock", 0.8, false),
      warning: new Ω.Sound("res/audio/warning", 0.4, true),
      ooh: new Ω.Sound("res/audio/hark", 0.5, false)
    },

    gameIsOver: false,

    musicStarted: false,
    musicEverStarted: false,
    tockSoundedAt: -1,
    isWarning: false,

    state: null,

    init: function() {
      this.state = new Ω.utils.State("BORN");

      this.player = new Player(17, 16 * 3.5, this);
      this.map = new Ω.RayCastMap(this.sheet, LEVEL.cells, 2, 60);

      this.neggies = LEVEL.entities
        .map(function(e) {
          var ent = null;

          switch (e[0]) {
            case "guide":
              ent = new Guide(e[2] * 16, e[1] * 16, this);
              break;
            case "neggy":
              ent = new NeggyBones(e[2] * 16, e[1] * 16, this.player);
              break;
            case "moment":
              ent = new Moment(e[2] * 16, e[1] * 16, this.player);
              break;
            case "orb":
              ent = new Orb(e[2] * 16, e[1] * 16, this.player);
              break;
            case "twoseconds":
              ent = new TwoSeconds(e[2] * 16, e[1] * 16, this);
              break;
            case "compass":
              ent = new Compass(e[2] * 16, e[1] * 16, this.player);
              break;
            case "player":
              this.player.x = e[2] * 16;
              this.player.y = e[1] * 16;
              break;
          }

          return ent;
        }, this)
        .filter(function(e) {
          return e !== null;
        });

      this.lastTime = this.gameTime();

      this.realTime = 0;
    },

    tick: function(delta) {
      this.state.tick();

      switch (this.state.get()) {
        case "BORN":
          this.state.set("INTRO");
          break;
        case "INTRO":
          if (
            Ω.input.isDown("up") ||
            Ω.input.isDown("down") ||
            Ω.input.isDown("left") ||
            Ω.input.isDown("right")
          ) {
            this.state.set("RUNNING");
          }
          break;
        case "RUNNING":
          this.tickRunning(delta);
          break;
        case "WON":
          if (this.state.count > 100) {
            this.gameover();
            game.setScreen(new WinScreen());
          }
          break;
      }

      this.map.tick(this.neggies, this.player);
    },

    tickRunning: function(delta) {
      var elapsed = this.gameTime() - this.lastTime;
      this.lastTime = this.gameTime();

      this.player.tick(this.map, elapsed);

      this.neggies = this.neggies.filter(function(n) {
        return n.tick(this.map, elapsed);
      }, this);

      Ω.Physics.checkRadius(this.player, this.neggies);

      if (this.player.atTop) {
        this.realTime += delta;

        if (this.musicStarted) {
          this.sounds.theme.stop();
          this.musicStarted = false;
        }

        if (this.tockSoundedAt !== ((11 - this.realTime) | 0)) {
          this.tockSoundedAt = (11 - this.realTime) | 0;
          this.sounds.tock.play();
          if (this.tockSoundedAt < 4 && !this.isWarning) {
            this.sounds.warning.play();
            this.isWarning = true;
          }
        }

        if (this.realTime > 10) {
          this.player.die();
          this.realTime = 10;
        } else {
          if (this.player.x > this.map.w - 16 * 10) {
          }
        }
      } else {
        if (this.musicEverStarted) {
          this.playTheme();
        }
        this.sounds.warning.stop();
      }

      // Play the spooky sound when you get down in the wobbly zone for the first time
      if (this.player.depth > 0.8 && !this.player.seenTheLight) {
        this.player.seenTheLight = true;
        this.sounds.ooh.play();
      }

      if (this.gameIsOver) {
        game.setScreen(new DeadScreen());
      }
    },

    playTheme: function() {
      if (!this.musicStarted) {
        this.sounds.theme.play();
        this.musicStarted = true;
        this.musicEverStarted = true;
      }
    },

    win: function() {
      this.sounds.theme.stop();
      this.state.set("WON");
    },

    openCarlDoor: function() {
      this.map.cells[16][42] = 3;
      this.map.cells[16][43] = 0;
    },

    foundTime: function() {
      this.realTime -= 2;
      this.realTime = 0; // Just reset for now, make sure enough time to win ;)
      this.player.hasTime = true;
      game.setDialog(new TimeDialog());
    },

    gameTime: function() {
      var time = (this.player.x / (this.map.w - 128)) * 10;

      return this.player.atTop ? time : Math.max(0.01, time);
    },

    gameover: function() {
      this.gameIsOver = true;
      this.sounds.warning.stop();
      this.sounds.theme.stop();
      this.sounds.tock.stop();
    },

    render: function(gfx) {
      var c = gfx.ctx;

      this.clear(gfx, "#111");

      if (!this.gameIsOver) {
        this.renderBackground(gfx);
        this.map.render(gfx, this.neggies, this.player);
        this.renderStats(gfx);
        this.renderClock(gfx);
      }

      if (this.player.state.isIn("DYING", "DEAD")) {
        c.fillStyle = this.player.state.is("DEAD")
          ? "rgb(140,0,0)"
          : "rgba(140,0,0," + this.player.state.count / 80 + ")";
        c.fillRect(0, 0, gfx.w, gfx.h);
      }
    },

    renderStats: function(gfx) {
      var c = gfx.ctx;

      c.fillStyle = "hsl(40, 50%, 70%)";
      c.fillRect(90, 15, 100, 15);
      c.fillRect(90, 35, 100, 15);
      c.fillRect(90, 55, 100, 15);

      c.fillStyle = "hsl(0, 50%, 50%)";
      c.fillRect(90, 15, (this.player.wellbeing / 100) * 100, 15);
      c.fillRect(90, 35, (this.player.happiness / 100) * 100, 15);
      c.fillRect(90, 55, this.player.depth * 100, 15);

      c.fillStyle = "#000";
      c.font = "8pt monospace";
      c.fillText("wellbeing", 95, 25);
      c.fillText("happiness", 95, 45);
      c.fillText("saturation", 95, 65);
    },

    renderBackground: function(gfx) {
      var c = gfx.ctx,
        player = this.player,
        sat,
        bright;

      // Sky
      sat = player.atTop
        ? Ω.utils.lerpPerc(80, 0, player.bredth)
        : Ω.utils.lerpPerc(60, 0, player.depth);

      bright = player.atTop
        ? Ω.utils.lerpPerc(80, 0, player.bredth)
        : Ω.utils.lerpPerc(10, 100, player.depth);

      c.fillStyle = "hsl(200, " + sat + "%, " + bright + "%)";
      c.fillRect(0, 0, gfx.w, gfx.h / 2);

      // Ground
      sat = Ω.utils.lerpPerc(40, 10, player.depth);
      bright = player.atTop
        ? Ω.utils.lerpPerc(40, 0, player.bredth)
        : Ω.utils.lerpPerc(10, 90, player.depth);

      c.fillStyle =
        "hsl(" +
        Ω.utils.lerpPerc(120, 360, player.depth) +
        ", " +
        sat +
        "%, " +
        bright +
        "%)";
      c.fillRect(0, gfx.h / 2, gfx.w, gfx.h / 2);

      // Mid
      var top = Ω.utils.lerpPerc(0.22, 0.5, player.depth),
        bot = Ω.utils.lerpPerc(0.55, 0.05, player.depth),
        g = 50;

      var grad = c.createLinearGradient(
        0,
        gfx.h * top,
        0,
        gfx.h * top + gfx.h * bot
      );
      grad.addColorStop(0, "hsla(180, 40%, 40%, 0)");
      grad.addColorStop(0.5, "hsla(130, 40%, 10%, 1)");
      grad.addColorStop(0.7, "hsla(90, 40%, 10%, 1)");
      grad.addColorStop(1, "hsla(70, 40%, 40%, 0)");

      c.fillStyle = grad;
      c.fillRect(0, gfx.h * top, gfx.w, gfx.h * bot);
    },

    renderClock: function(gfx) {
      var c = gfx.ctx;

      c.fillStyle = "#000";

      this.sprites.render(gfx, 0, 2, 15, 15, 2, 2, 2);

      if (this.state.isNot("RUNNING")) {
        return;
      }

      var t = (11 - this.realTime) | 0,
        mid = 47,
        angle = this.player.atTop
          ? Ω.utils.deg2rad(((11 - this.realTime) / 10) * 360 - 180 - 30)
          : this.player.hasCompass
            ? Math.PI / 2 - this.player.rotation
            : Math.PI - ((Date.now() / 200) % Math.PI) * 2;

      c.strokeStyle = "#800";
      c.lineWidth = 3;
      c.translate(mid, mid);
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(28 * Math.sin(angle), 28 * Math.cos(angle));
      c.stroke();
      c.translate(-mid, -mid);

      if (t < 10) {
        t = "0" + t;
      }

      c.font = "11pt monospace";
      c.fillText("00:" + t, 25, 50);
    }
  });

  window.MainScreen = MainScreen;
})(Ω);
