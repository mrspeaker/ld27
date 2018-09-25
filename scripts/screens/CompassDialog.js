(function(Ω) {
  "use strict";

  var CompassDialog = Ω.Dialog.extend({
    render: function(gfx) {
      var c = gfx.ctx;

      c.fillStyle = "rgba(0,0,0,0.9)";
      c.fillRect(0, 0, gfx.w, gfx.h);

      c.fillStyle = "#fff";

      c.fillText(
        "The fractal compass points north",
        gfx.w * 0.35,
        gfx.h * 0.35
      );
      c.fillText(
        "towards the time line of reality,",
        gfx.w * 0.35,
        gfx.h * 0.4
      );
      c.fillText("and south to the pits of rubber", gfx.w * 0.35, gfx.h * 0.45);
      c.fillText("where time is so thick,", gfx.w * 0.35, gfx.h * 0.5);
      c.fillText("you can put it in your pocket.", gfx.w * 0.35, gfx.h * 0.55);

      c.fillText("{enter to continue}", gfx.w * 0.35, gfx.h * 0.65);
    }
  });

  window.CompassDialog = CompassDialog;
})(Ω);
