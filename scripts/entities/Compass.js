(function (Ω) {

	"use strict";

	var Compass = Billboard.extend({

		sheet: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

		init: function (x, y, player) {

			this.rnd = Ω.utils.rand(2000);

			this.x = x;
			this.y = y;

			this.player = player;

		},

		tick: function (map) {

			this._super(map);

			this.top = Math.cos(this.rnd + (Date.now() / 400)) * (180 / this.dist);

			return !(this.remove);

		},

		hit: function (e) {

			if (e instanceof Player) {
				this.remove = true;
				e.hasCompass = true;
				game.setDialog(new CompassDialog());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(220, 30%, 40%)";
			this.sheet.render(gfx, 1, 0, this.px, this.py + this.top, 1, 1, this.size);

		}

	});

	window.Compass = Compass;

}(Ω));
