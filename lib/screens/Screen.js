(function (Ω) {

	"use strict";

	var Screen = Ω.Class.extend({

		loaded: true,

		tick: function () {},

		clear: function (gfx, col) {

			var c = gfx.ctx;

			c.fillStyle = col;
			c.fillRect(0, 0, gfx.w, gfx.h);

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(0, 0%, 0%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

		}

	});

	Ω.Screen = Screen;

}(Ω));
