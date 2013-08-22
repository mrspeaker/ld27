(function (Ω) {

	"use strict";

	var TitleScreen = Ω.Screen.extend({

		render: function (gfx) {

			var c = gfx.ctx;

			this.clear(gfx, "#111");

			c.fillStyle = "#fff";
			c.fillText("game on.", gfx.w / 2, gfx.h / 2);

		}

	});

	window.TitleScreen = TitleScreen;

}(Ω));
