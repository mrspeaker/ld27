(function (Ω) {

	"use strict";

	var TwoSeconds = Billboard.extend({

		sheet: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

		init: function (x, y, player) {

			this.rnd = Ω.utils.rand(2000);

			this.x = x;
			this.y = y;

			this.player = player;

		},

		tick: function (map) {

			this._super(map);

			this.top = Math.sin(this.rnd + (Date.now() / 200)) * 20;

			return !(this.remove);

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.sheet.render(gfx, 0, 0, this.px, this.py + this.top, 1, 1, this.size);

		}

	});

	window.TwoSeconds = TwoSeconds;

}(Ω));
