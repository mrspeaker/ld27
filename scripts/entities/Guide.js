(function (Ω) {

	"use strict";

	var intro,
		Guide;

	Guide = Billboard.extend({

		sheet: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

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

			return !(this.remove);

		},

		hit: function (e) {

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

			this.sheet.render(gfx, 2, 0, this.px, this.py - 10, 1, 2, this.size);

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
