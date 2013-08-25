(function (Ω) {

	"use strict";

	var GuideDialog = Ω.Dialog.extend({

		carl: new Ω.Image("res/images/carl1.png"),

		init: function (talker) {

			this._super();

			this.talker = talker();

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "rgba(0,0,0,0.9)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			c.fillStyle = "#fff";

			this.carl.render(gfx, 100, 100);

			if (!this.talker(gfx)) {
				this.done();
			}

		}

	});

	window.GuideDialog = GuideDialog;

}(Ω));
