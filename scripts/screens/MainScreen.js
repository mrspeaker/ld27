(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		sheet: new Ω.SpriteSheet("res/images/sheet.png", 16, 16),
		time: 0,

		sound: new Ω.Sound("res/audio/tunke.wav", 0.8, 1),

		init: function () {

			var Z = "Z";

			this.player = new Player(17, 16 * 3.5);
			this.map = new Ω.RayCastMap(this.sheet, LEVEL.cells, this.player);

			this.neggies = LEVEL.entities.map(function (e) {

				var ent = null;

				switch (e[0]) {
					case "guide":
						ent = new Guide(e[2] * 16, e[1] * 16, this.player);
						break;
					case "neggy":
						ent = new NeggyBones(e[2] * 16, e[1] * 16, this.player);
						break;
					case "moment":
						ent = new Moment(e[2] * 16, e[1] * 16, this.player);
						break;
					case "orb":
						ent = new Orb(e[2] * 16, e[1] * 16, this.player);
						break;
				}

				return ent;

			}, this);

			// this.neggies = [];
			// for (var i = 0; i < 35; i++) {
			// 	var x = Ω.utils.rand(this.map.cellW),
			// 		y = Ω.utils.rand(this.map.cellH);

			// 	if (this.map.cells[y][x]=== 0) {
			// 		this.neggies.push(
			// 			Math.random() < 0.5 ?
			// 				new NeggyBones(x * 16, y * 16, this.player) :
			// 				new Moment(x * 16, y * 16, this.player)
			// 		)
			// 	}
			// }

			this.lastTime = this.gameTime();

			this.sound.play();

		},

		tick: function () {

			var elapsed = this.gameTime() - this.lastTime;
			this.lastTime = this.gameTime();

			this.player.tick(this.map, elapsed);

			this.neggies = this.neggies.filter(function(n) {
				return n.tick(this.map, elapsed);
			}, this);

			Ω.Physics.checkRadius(this.player, this.neggies);

		},

		gameTime: function () {

			return (this.player.x / this.map.w) * 10;

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.clear(gfx, "#111");

			c.fillStyle = "#fff";
			c.fillText("game on.", gfx.w / 2, gfx.h / 2);

			this.map.render(gfx, this.neggies);

			c.fillStyle = "hsl(40, 70%, 70%)";
			c.fillRect(10, 20, 130, 15);
			c.fillRect(10, 40, 130, 15);

			c.fillStyle = "hsl(10, 70%, 70%)";
			c.fillRect(10, 20, ((10 - this.gameTime()) / 10) * 130, 15);
			c.fillRect(10, 40, (this.player.happiness / 100) * 130, 15);

			c.fillStyle = "#000";
			c.fillText("time: " + this.gameTime().toFixed(2), 15, 30);
			c.fillText("happiness", 15, 50);
			c.fillText(this.player.speed.toFixed(2), 100, 50);

			c.fillText(this.player.depth.toFixed(2), 80, 30)

		}

	});

	window.MainScreen = MainScreen;

}(Ω));
