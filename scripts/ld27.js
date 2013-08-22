(function (Ω) {

	"use strict";

	var LD27 = Ω.Game.extend({

		canvas: "#board",

		load: function () {

			this.setScreen(new TitleScreen());

		}

	});

	window.LD27 = LD27;

}(Ω));
