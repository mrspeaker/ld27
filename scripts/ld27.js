(function (Ω) {

	"use strict";

	var LD27 = Ω.Game.extend({

		canvas: "#board",

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

		}

	});

	window.LD27 = LD27;

}(Ω));
