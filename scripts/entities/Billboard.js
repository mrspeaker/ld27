(function (Ω) {

	"use strict";

	var Billboard = Ω.Entity.extend({

		visible: false,

		init: function (x, y, player) {

			this.x = x;
			this.y = y;

			this.player = player;

		},

		tick: function (map) {

			var dx = (this.x / 16 + 0.0) - this.player.x / 16,
				dy = (this.y / 16 + 0.0) - this.player.y / 16,
				viewDistance = map.viewDistance,
				dist = Math.sqrt(dx * dx + dy * dy),
				angle = Math.atan2(dy, dx) - this.player.rotation,
				size = viewDistance / (Math.cos(angle) * dist) * 0.08,
				x = Math.tan(angle) * viewDistance;

			this.dist = dist;
			this.px = (Ω.env.w / 2 + x - size / 2);
			this.py = ((Ω.env.h - size) / 2);
			this.pw = size * this.w;
			this.ph = size * this.h;
			this.size = size;

			return !(this.remove);

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(220, 30%, 40%)";
			c.fillRect(this.px, this.py, this.pw * this.size, this.ph * this.size);

		}

	});

	window.Billboard = Billboard;

}(Ω));