(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		sheet: new Ω.SpriteSheet("res/images/sheet.png", 32, 32),

		init: function () {

			this.player = new Player(32 * 4, 32 * 3);
			this.map = new Ω.RayCastMap(this.sheet, [
				[1,2,1,1,1,1,1,1,1,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,1,1,0,0,0,0,0,0,0,0,1],
				[1,0,1,1,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,1,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,0,0,0,0,0,0,0,0,0,0,0,1],
				[1,2,1,1,1,1,1,1,1,1,1,1,1]
			], this.player);

		},

		tick: function () {

			this.player.tick(this.map);

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.clear(gfx, "#111");

			c.fillStyle = "#fff";
			c.fillText("game on.", gfx.w / 2, gfx.h / 2);

			this.map.render(gfx);
			//this.player.render(gfx);

		}

	});

	window.MainScreen = MainScreen;

}(Ω));
