(function (Ω) {

	"use strict";

	var Player = Ω.Entity.extend({

		w: 14,
		h: 14,

		rotation: Ω.utils.deg2rad(0),
		rotSpeed: Ω.utils.deg2rad(3),
		speed: 2,

		happiness: 50,

		depth: 0,

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
				this.happiness = Math.max(0, this.happiness - 0.1);
			}

			this.move(this.xo, this.yo, map);

			//console.log(this.y, map.w, map.sheet.w)
			this.depth = (this.y / map.h);// * 100;


		},

		hit: function (e) {

			e.remove = true;

		}

	});

	window.Player = Player;

}(Ω));