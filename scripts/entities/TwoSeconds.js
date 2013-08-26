(function (Ω) {

	"use strict";

	var TwoSeconds = Billboard.extend({

		sheet: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

		sound: new Ω.Sound("res/audio/twosecs.wav", 0.7, false),

		init: function (x, y, player) {

			this.rnd = Ω.utils.rand(2000);

			this.x = x;
			this.y = y;

			this.player = player;

		},

		tick: function (map) {

			this._super(map);

			this.top = Math.sin(this.rnd + (Date.now() / 200)) / this.size;

			return !(this.remove);

		},

		hit: function (e) {

			if (e instanceof Player) {
				game.screen.realTime -= 2;
				game.screen.realTime = 0; // Just reset for now, make sure enough time to win ;)
				this.remove = true;

				player.hasTime = true;

				this.sound.play();

				game.setDialog(new TimeDialog());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.sheet.render(gfx, 2, 2, this.px, this.py + this.top, 2, 2, this.size);

		}

	});

	window.TwoSeconds = TwoSeconds;

}(Ω));
