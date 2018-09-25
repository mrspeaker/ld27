(function(Ω) {
  "use strict";

  var DeadScreen = Ω.Screen.extend({
    count: 0,

    init: function() {
      game.numDeaths++;
    },

    tick: function() {
      if (this.count++ > 50 && Ω.input.isDown("fire")) {
        game.setScreen(new TitleScreen(), 100);
      }
    },

    render: function(gfx) {
      var c = gfx.ctx;

      this.clear(gfx, "#200");

      c.fillStyle = "#eee";
      c.font = "11pt monospace";

      var things = [
          "see the aurora borealis",
          "run a marathon",
          "visit Peru",
          "learn basic Karate",
          "write a book",
          "do a world trip",
          "go scuba diving",
          "eat spiders",
          "act in a movie",
          "make a crappy game",
          "read more",
          "go kayaking",
          "ride across Australia"
        ],
        off = 0.25;

      if (game.numDeaths === 1) {
        c.fillText(
          "You have died of old age.",
          gfx.w * 0.4,
          gfx.h * (0.4 + off)
        );
        c.fillText(
          "You had a good run. Pretty good health.",
          gfx.w * 0.4,
          gfx.h * (0.44 + off)
        );
        c.fillText(
          "At least you had your health.",
          gfx.w * 0.4,
          gfx.h * (0.51 + off)
        );
        c.fillText(
          "You didn't get to touch a glowy orb thing.",
          gfx.w * 0.4,
          gfx.h * (0.58 + off)
        );
        //c.fillText("Or " + things[Ω.utils.rand(things.length)] + ".", gfx.w * 0.4, gfx.h * (0.62 + off));

        c.fillText("Maybe next time.", gfx.w * 0.4, gfx.h * (0.67 + off));

        return;
      }

      if (!game.seenCarl && game.numDeaths > 2) {
        c.fillText(
          "There is more to this, you know.",
          gfx.w * 0.4,
          gfx.h * (0.4 + off)
        );
        c.fillText(
          "If you move fast, and stay right.",
          gfx.w * 0.4,
          gfx.h * (0.44 + off)
        );
        c.fillText(
          "You can visit Carl Sagan.",
          gfx.w * 0.4,
          gfx.h * (0.51 + off)
        );
        c.fillText(
          "He'll tell you what to do.",
          gfx.w * 0.4,
          gfx.h * (0.58 + off)
        );
        return;
      }

      c.fillText(
        "You have died of old age. Again.",
        gfx.w * 0.4,
        gfx.h * (0.4 + off)
      );
    }
  });

  window.DeadScreen = DeadScreen;
})(Ω);
