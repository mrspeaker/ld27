(function (Ω) {

	"use strict";

	var intro,
		Guide;

	Guide = Billboard.extend({

		w: 16 * 1,
		h: 16 * 1,

		sheet: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

		carl: new Ω.Image("res/images/carl1.png"),

		spoken: false,

		says: {

			"intro": intro

		},

		init: function (x, y, player) {

			this.x = x;
			this.y = y;

			this.player = player;

		},

		tick: function (map) {

			this._super(map);

			this.top =  Math.cos((Date.now() / 400)) * (180 / this.dist);

			return !(this.remove);

		},

		hit: function (e) {


			console.log("hit");

			if (!(e instanceof Player)) {
				return;
			}

			if (this.spoken) {
				return;
			}

			this.speak();

		},

		speak: function () {

			game.setDialog(
				new GuideDialog(intro)
			);

			this.spoken = true;

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.sheet.render(gfx, 4, 0, this.px - (10 * this.size), this.py - (30 * this.size) + this.top, 3, 3, this.size);
			//this.sheet.render(gfx, 4, 0, this.px - (30 * this.size), this.py - (60 * this.size) + this.top, 3, 3, 2 * this.size);

		}

	});



	intro = function () {
		var tick = 0;
		return function (gfx) {

			tick++;
			var c = gfx.ctx;

			c.fillText("howdy.", gfx.w / 2, gfx.h / 2);

			return tick < 100;

		}
	}

	window.Guide = Guide;

}(Ω));
