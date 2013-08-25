(function (Ω) {

	"use strict";

	var WinScreen = Ω.Screen.extend({

		count: 0,

		render: function (gfx) {

			var c = gfx.ctx;

			this.clear(gfx, "#fff");

			c.fillStyle = "#440";
			c.font = "11pt monospace";
			c.fillText("Wins the game", gfx.w / 2, gfx.h / 2);
			c.fillText("in good time.", gfx.w / 2, gfx.h * 0.53);

		},

		tick: function () {

			if (this.count++ > 50 && Ω.input.isDown("fire")) {

				game.setScreen(new TitleScreen(), 100);

			}

		}

	});

	window.WinScreen = WinScreen;

}(Ω));
