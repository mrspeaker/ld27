(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		init: function () {

			this.player = new Ω.Entity(0, 0, );
			this.map = new Ω.RayCastMap

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.clear(gfx, "#111");

			c.fillStyle = "#fff";
			c.fillText("game on.", gfx.w / 2, gfx.h / 2);

		}

	});

	window.MainScreen = MainScreen;

}(Ω));
