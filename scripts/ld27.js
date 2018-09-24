(function (Ω) {

	"use strict";

	var LD27 = Ω.Game.extend({

		canvas: "#board",

		fps: false,

		numDeaths: 0,
		seenCarl: false,

		init: function (w, h) {

			this._super(w, h);

			Ω.evt.progress.push(function (remaining, max) {
                // (((max - remaining) / max) * 100 | 0);
            });

            Ω.input.bind([

				["left", "left"],
				["right", "right"],
				["up", "up"],
				["down", "down"],
				["space", "fire"],
				["enter", "escape"]

			]);

        },

		load: function () {

			this.stopPreload();
			this.setScreen(new TitleScreen(), 100);

		},

		stopPreload: function () {

            // Clear the preloader thing
            if (preloo) {
                clearInterval(preloo);
                document.querySelector("#board").style.background = "#000";
            }

        },

		reset: function () {

			this.load();

		}

	});

	window.LD27 = LD27;

}(Ω));
