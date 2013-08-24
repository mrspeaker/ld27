(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		sheet: new Ω.SpriteSheet("res/images/sheet.png", 64, 64),

		init: function () {

			this.player = new Player(64 * 4, 64 * 3);
			this.map = new Ω.RayCastMap(this.sheet, [
				[1,2,1,1,1,1,1],
				[1,2,0,0,0,0,1],
				[1,2,0,0,0,0,1],
				[1,2,0,0,0,0,1],
				[1,2,3,4,5,0,1],
				[1,2,0,0,0,0,1],
				[1,2,1,1,1,1,1]
			], this.player);

		},

		tick: function () {

			this.player.tick();

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.clear(gfx, "#111");

			c.fillStyle = "#fff";
			c.fillText("game on.", gfx.w / 2, gfx.h / 2);

			this.map.render(gfx);
			this.player.render(gfx);

		}

	});

	window.MainScreen = MainScreen;

}(Ω));
