(function (Ω) {

	"use strict";

	var LD27 = Ω.Game.extend({

		canvas: "#board",

		fps: false,

		init: function (w, h) {

			this._super(w, h);

			Ω.evt.progress.push(function (remaining, max) {
                //console.log((((max - remaining) / max) * 100 | 0) + "%");
            });

            Ω.input.bind([

				["left", "left"],
				["right", "right"],
				["up", "up"],
				["down", "down"],
				["space", "fire"],
				["escape", "escape"]

			]);

        },

		load: function () {

			this.setScreen(new TitleScreen(), 100);

		},

		reset: function () {

			map = null;
			player = null;
			this.load();

		}

	});

	window.LD27 = LD27;

}(Ω));
