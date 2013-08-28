(function (Ω) {

	"use strict";

	var TwoSeconds = Billboard.extend({

		sheet: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

		sound: new Ω.Sound("res/audio/twosecs", 0.7, false),

		init: function (x, y, screen) {

			this._super(x, y, screen.player);

			this.screen = screen;

			this.rnd = Ω.utils.rand(2000);

		},

		tick: function (map) {

			this._super(map);

			this.top = Math.sin(this.rnd + (Date.now() / 200)) / this.size;

			return !(this.remove);

		},

		hit: function (e) {

			if (e instanceof Player) {

				this.remove = true;
				this.sound.play();
				this.screen.foundTime();

			}

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.sheet.render(gfx, 2, 2, this.px, this.py + this.top, 2, 2, this.size);

		}

	});

	window.TwoSeconds = TwoSeconds;

}(Ω));
