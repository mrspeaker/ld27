(function (Ω) {

	"use strict";

	var TitleScreen = Ω.Screen.extend({

		count: 0,

		render: function (gfx) {

			var c = gfx.ctx;

			this.clear(gfx, "#111");

			c.fillStyle = "#fff";
			c.font = "11pt monospace";
			c.fillText("time flies straight.", gfx.w / 2, gfx.h / 2);

			c.fillText("a game by Mr Speaker.", gfx.w / 2, gfx.h * 0.53);
			c.fillText("{move: keys, start: space}", gfx.w / 2, gfx.h * 0.83);

			c.fillStyle = "#777";
			c.fillText("@mrspeaker", gfx.w / 2, gfx.h * 0.57);

		},

		tick: function () {

			this.count++;

			if (this.count > 50 && Ω.input.isDown("fire")) {

				game.setScreen(new MainScreen(), 100);

			}

		}

	});

	window.TitleScreen = TitleScreen;

}(Ω));
