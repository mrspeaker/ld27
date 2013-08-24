(function (Ω) {

	"use strict";

	var NeggyBones = Ω.Entity.extend({

		w: 5,
		h: 5,

		rotation: Ω.utils.deg2rad(0),
		rotSpeed: Ω.utils.deg2rad(3),
		speed: 4,

		init: function (x, y) {

			this.x = x;
			this.y = y;

		},

		tick: function (map) {

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "blue";
			c.fillRect(this.x, this.y, this.w, this.h);

		}

	});

	window.NeggyBones = NeggyBones;

}(Ω));