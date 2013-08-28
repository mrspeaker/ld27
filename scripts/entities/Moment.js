(function (Ω) {

	"use strict";

	var Moment = Billboard.extend({

		sheet: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

		sound: new Ω.Sound("res/audio/wizz", 0.7, false),

		init: function (x, y, player) {

			this.rnd = Ω.utils.rand(2000);

			this.x = x;
			this.y = y;

			this.player = player;

		},

		tick: function (map) {

			this._super(map);

			/*
				Intentional bug ahead:
					Instead of "* 20" it should be "* (180 / this.dist)"

				Because we don't scale by distance, the lil' green things
				bob up and down too high in the distance, and show above and
				below the walls. Watching people play the game, I noticed that
				when they see the glitch, they go searching for the green guys.

				I don't want to stop people searching, that's fo' sure.
			*/
			this.top = Math.sin(this.rnd + (Date.now() / 200)) * 20;

			return !(this.remove);

		},

		hit: function () {

			this.sound.play();

		},

		render: function (gfx) {

			var c = gfx.ctx;


			this.sheet.render(gfx, 1, 1, this.px, this.py + this.top, 1, 1, this.size);

		}

	});

	window.Moment = Moment;

}(Ω));
