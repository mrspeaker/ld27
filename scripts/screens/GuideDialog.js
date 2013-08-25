(function (Ω) {

	"use strict";

	var GuideDialog = Ω.Dialog.extend({

		init: function (talker) {

			this._super();

			this.talker = talker();

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "rgba(0,0,0,0.9)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			c.fillStyle = "#fff";
			//c.fillText("Welcome, traveller.", gfx.w * 0.45, gfx.h * 0.5);

			if (!this.talker(gfx)) {
				this.done();
			}

		}

	});

	window.GuideDialog = GuideDialog;

}(Ω));
