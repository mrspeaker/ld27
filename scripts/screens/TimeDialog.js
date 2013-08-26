(function (Ω) {

	"use strict";

	var TimeDialog = Ω.Dialog.extend({

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "rgba(0,0,0,0.9)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			c.fillStyle = "#fff";

			c.fillText("Hark! In the depths of the ebbs", gfx.w * 0.35, gfx.h * 0.35);
			c.fillText("and flows of movement you find...", gfx.w * 0.35, gfx.h * 0.4);

			c.fillText("Two seconds! Enough to complete", gfx.w * 0.35, gfx.h * 0.5);
			c.fillText("your journey. Enough to complete.", gfx.w * 0.35, gfx.h * 0.55);

			c.fillText("{escape to continue}", gfx.w * 0.35, gfx.h * 0.65);

		}

	});

	window.TimeDialog = TimeDialog;

}(Ω));
