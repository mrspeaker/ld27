(function (Ω) {

	"use strict";

	var Orb = Billboard.extend({

		sheet: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

		got: false,

		init: function (x, y, player) {

			this.rnd = Ω.utils.rand(2000);

			this.x = x;
			this.y = y;

			this.player = player;

		},

		tick: function (map) {

			this._super(map);

			this.top = Math.cos(this.rnd + (Date.now() / 400)) * (180 / this.dist);
			this.left = Math.sin(this.rnd + (Date.now() / 200)) * (200 / this.dist) - (170 / this.dist);

			return !(this.remove);

		},

		hit: function (e) {

			if (!this.got && e instanceof Player) {
				this.got = true;
				game.screen.win();
			}

		},

		render: function (gfx) {

			var c = gfx.ctx;
			this.sheet.render(gfx, 3, 0, this.px + this.left, this.py + this.top, 1, 1, this.size);

		}

	});

	window.Orb = Orb;

}(Ω));
