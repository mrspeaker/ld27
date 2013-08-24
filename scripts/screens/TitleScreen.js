(function (Ω) {

	"use strict";

	var TitleScreen = Ω.Screen.extend({

		render: function (gfx) {

			var c = gfx.ctx;

			this.clear(gfx, "#111");

			c.fillStyle = "#fff";
			c.fillText("time flies straight.", gfx.w / 2, gfx.h / 2);
			c.fillText("a game by Mr Speaker.", gfx.w / 2, gfx.h * 0.53);

		},

		tick: function () {

			if (Ω.input.isDown("fire")) {

				game.setScreen(new MainScreen(), 100);

			}

		}

	});

	window.TitleScreen = TitleScreen;

}(Ω));
