(function(Ω) {
  "use strict";

  var WinScreen = Ω.Screen.extend({
    count: 0,

    sound: new Ω.Sound("res/audio/ending", 0.8, true),

    init: function() {
      this.sound.play();
    },

    render: function(gfx) {
      var c = gfx.ctx;

      this.clear(gfx, "#fff");

      c.fillStyle =
        "hsla(" +
        ((this.count / 2) % 360) +
        ", 50%, 40%, " +
        (Math.sin(this.count / 100) + 1) / 2 +
        ")";
      c.fillRect(0, 0, gfx.w, gfx.h);

      c.fillStyle = "#440";
      c.font = "11pt monospace";

      if (this.count < 400) {
        c.fillText("You have! It's not often", gfx.w / 2, gfx.h / 2);
        c.fillText("that any do.", gfx.w / 2, gfx.h * 0.53);
      } else if (this.count < 800) {
        c.fillText("Carl Sagan does not endorse", gfx.w / 2, gfx.h / 2);
        c.fillText("this game.", gfx.w / 2, gfx.h * 0.53);
      } else if (this.count < 1200) {
        c.fillText("A game made in 48 linear hours", gfx.w / 2, gfx.h / 2);
        c.fillText("by Mr Speaker.", gfx.w / 2, gfx.h * 0.53);
      }
    },

    tick: function() {
      if (
        (this.count++ > 50 && Ω.input.isDown("escape")) ||
        this.count > 2000
      ) {
        game.setScreen(new TitleScreen(), 100);
        this.sound.stop();
      }
    }
  });

  window.WinScreen = WinScreen;
})(Ω);
