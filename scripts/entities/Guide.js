(function (Ω) {

	"use strict";

	var Guide = Billboard.extend({

		sheet: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

		spoken: false,

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
				new GuideDialog()
			);

			this.spoken = true;

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.sheet.render(gfx, 2, 0, this.px, this.py, 1, 2, this.size);

		}

	});

	window.Guide = Guide;

}(Ω));
