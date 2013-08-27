(function (Ω) {

	"use strict";

	var intro,
		Guide;

	Guide = Billboard.extend({

		w: 16 * 1,
		h: 16 * 1,

		radius: 15,

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

			e.happiness += 30;

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
				["Hello, I'm Carl Sagan.",
				"",
				"You've just stepped out of time.",
				"I hang out here nonetimes.",
				"",
				"",
				"{space for more, enter to exit}"
				],

				["It can be a bit odd here as",
				"time is not linear, you see,",
				"but follows the function of a fractal."
				],

				["As you've come here looking for help",
				"reaching the Orb-y Thingy...",
				"Then I will help you."
				],

				["The Orb-y Thingy can not be reached",
				"in your lifetime."],

				["Your lifetime - in fractal time - is",
				"almost over. But it has also just begun.",
				"",
				"Within fractal time lies all time.",
				"You can pick some up and bring it back,",
				"if you like"],

				["But wandering in time can be...",
				"challenging. I suggest you search in the",
				"shallow time grounds for a compass to",
				"help navigate the wobbly zones"
				],

				["Return here with your precious seconds.",
				"",
				"You may again run the gauntlet of time."]

			]

			// wasDown (and therefore pressed) aint work in dialog
			if (Ω.input.isDown("fire") && !wasle) {
				step++;
				if (step >= texts.length) {
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

			texts[step % texts.length].forEach(function (t, i) {
				c.fillText(t, gfx.w * 0.35, gfx.h * (0.35 + i * 0.05));
			});


			return true;

		}
	}

	window.Guide = Guide;

}(Ω));
