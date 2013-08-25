(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		w: 14,
		h: 14,

		radius: 10,

		rotation: Ω.utils.deg2rad(0),
		rotSpeed: Ω.utils.deg2rad(3),

		happiness: 50,

		depth: 0,
		speed: 2,

		init: function (x, y) {

			this.x = x;
			this.y = y;

		},

		tick: function (map, elapsed) {

			if (Ω.input.isDown("left")) {
				this.rotation -= this.rotSpeed;
			}

			if (Ω.input.isDown("right")) {
				this.rotation += this.rotSpeed;
			}

			if (this.rotation < 0) {
				this.rotation = (Math.PI * 2) + this.rotation;
			}
			if (this.rotation > Math.PI * 2) {
				this.rotation = this.rotation % (Math.PI * 2);
			}

			if (Ω.input.isDown("up")) {
				this.xo = this.speed * Math.cos(this.rotation);
				this.yo = this.speed * Math.sin(this.rotation);
			}

			if (Ω.input.isDown("down")) {
				this.xo = -this.speed * Math.cos(this.rotation);
				this.yo = -this.speed * Math.sin(this.rotation);
			}

			// Bit sad to move
			if (this.xo !== 0 || this.yo !== 0) {
				this.happiness = Math.max(0, this.happiness - (0.1 * this.speed));
			}

			this.move(this.xo, this.yo, map);

			this.depth = (this.y / map.h);
			this.speed = 2 * Ω.utils.lerpPerc(1, 0.4, this.depth);
			this.rotSpeed = Ω.utils.deg2rad(3 * Ω.utils.lerpPerc(1, 0.5, this.depth));

		},

		hit: function (e) {

			if (e instanceof Moment) {
				this.happiness = Math.min(100, this.happiness + 20);
				e.remove = true;
			}

		}

	});

	window.Player = Player;

}(Ω));