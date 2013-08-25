(function (Ω) {

	"use strict";

	var intro,
		Guide;

	Guide = Billboard.extend({

		w: 16 * 1,
		h: 16 * 1,

		radius: 15,

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

			// OPEN SESAME!
			map.cells[16][42] = 3;
			map.cells[16][43] = 0;


		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.sheet.render(gfx, 4, 0, this.px - (10 * this.size), this.py - (30 * this.size) + this.top, 3, 3, this.size);

		}

	});



	intro = function () {
		var tick = 0,
			wasle = true,
			step = 0,
			steps = 2;

		return function (gfx) {

			tick++;
			var c = gfx.ctx;

			var texts = [
				"Hello, I'm Carl Sagan",
				"You may have noticed that"
			]

			// wasDown (and therefore pressed) aint work in dialog
			if (Ω.input.isDown("fire") && !wasle) {
				step++;
				if (step >= steps) {
					return false;
				}
			}

			wasle = Ω.input.isDown("fire");

			switch (step) {
				case 0:
					break;

				case 1:
					break;

			}

			c.fillText(texts[step % texts.length], gfx.w / 2, gfx.h / 2);

			return true;

		}
	}

	window.Guide = Guide;

}(Ω));
