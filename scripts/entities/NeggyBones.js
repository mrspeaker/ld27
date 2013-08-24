(function (Ω) {

	"use strict";

	var NeggyBones = Ω.Entity.extend({

		sheet: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

		w: 14,
		h: 14,

		visible: false,

		rotation: Ω.utils.deg2rad(0),
		rotSpeed: Ω.utils.deg2rad(3),
		speed: 4,

		init: function (x, y, player) {

			this.rnd = Ω.utils.rand(2000);

			this.x = x;
			this.y = y;


			this.player = player;

		},

		tick: function (map) {

			this.top = Math.sin(this.rnd + (Date.now() / 200)) * 20;

			var dx = (this.x / 16 + 0.0) - this.player.x / 16,
				dy = (this.y / 16 + 0.0) - this.player.y / 16,
				viewDistance = map.viewDistance / (Ω.utils.lerpPerc(1, 8, game.screen.player.depth)),
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
			//c.fillRect(this.px, this.py, this.pw, this.ph);
			//this.sheet.render(gfx, 0, 1, this.px, this.py + 70, 1, 1, this.size);
			this.sheet.render(gfx, 0, 0, this.px, this.py + this.top, 1, 1, this.size);

		}

	});

	window.NeggyBones = NeggyBones;

}(Ω));