(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		sheet: new Ω.SpriteSheet("res/images/sheet.png", 16, 16),
		sprites: new Ω.SpriteSheet("res/images/sprites.png", 16, 16),

		time: 0,

		sound: new Ω.Sound("res/audio/tunke.wav", 0.8, 1),

		gameIsOver: false,

		state: null,

		init: function () {

			this.state = new Ω.utils.State("BORN");

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
					case "twoseconds":
						ent = new TwoSeconds(e[2] * 16, e[1] * 16, this.player);
						break;
				}

				return ent;

			}, this);

			// Hackit up!
			window.player = this.player;
			window.map = this.map;

			this.lastTime = this.gameTime();

			this.realTime = 0;

			this.sound.play();

		},

		tick: function (delta) {

			this.state.tick();

			switch(this.state.get()) {
				case "BORN":
					this.state.set("INTRO");
					break;
				case "INTRO":
					if (Ω.input.isDown("up") || Ω.input.isDown("down") || Ω.input.isDown("left") || Ω.input.isDown("right")) {
					this.state.set("RUNNING");

					}
					break;
				case "RUNNING":
					this.tickRunning(delta);
					break;
				case "WON":
					if (this.state.count > 100) {
						this.gameIsOver = true;
						game.reset();
					}
					break;
			}

		},

		tickRunning: function (delta) {

			var elapsed = this.gameTime() - this.lastTime;
			this.lastTime = this.gameTime();

			this.player.tick(this.map, elapsed);

			this.neggies = this.neggies.filter(function(n) {
				return n.tick(this.map, elapsed);
			}, this);

			Ω.Physics.checkRadius(this.player, this.neggies);


			if (this.player.atTop) {
				this.realTime += delta;

				if (this.realTime > 10) {
					this.player.die();
					this.realTime = 10;
				} else {
					if (this.player.x > this.map.w - 16 * 10) {
						//this.player.speed *= 0.8;
					}

				}
			}

			if (this.gameIsOver) {
				game.reset();
			}
		},

		win: function () {

			this.state.set("WON");

		},

		gameTime: function () {

			var time = (this.player.x / (this.map.w - 128)) * 10;

			return this.player.atTop ? time : Math.max(0.01, time);

		},

		gameover: function () {

			this.gameIsOver = true;

		},

		render: function (gfx) {

			var c = gfx.ctx;

			this.clear(gfx, "#111");

			if (!this.gameIsOver) {

				this.map.render(gfx, this.neggies);

				//c.fillStyle = "hsl(40, 70%, 70%)";
				//c.fillRect(10, 20, 130, 15);
				//c.fillRect(10, 40, 130, 15);

				//c.fillStyle = "hsl(10, 70%, 70%)";
				//c.fillRect(10, 20, ((10 - this.gameTime()) / 10) * 130, 15);
				//c.fillRect(10, 40, (this.player.happiness / 100) * 130, 15);

				//c.fillStyle = "#000";
				//c.fillText("time: " + (11 - this.gameTime() | 0), 15, 30);
				//c.fillText("happiness", 15, 50);
				//c.fillText(this.player.speed.toFixed(2), 100, 50);

				//c.fillText(this.player.depth.toFixed(2), 80, 30);

				this.renderClock(gfx);

			}

			if (this.player.state.isIn("DYING", "DEAD")) {
				c.fillStyle = this.player.state.is("DEAD") ?
					"rgb(140,0,0)" :
					"rgba(140,0,0," + ((this.player.state.count / 80)) + ")";
				c.fillRect(0, 0, gfx.w, gfx.h);
			}

		},

		renderClock: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = "#000";

			this.sprites.render(gfx, 0, 2, 15, 15, 2, 2, 2);

			var t = (11 - this.realTime | 0),
				mid = 47,
				angle = player.atTop ?
					Ω.utils.deg2rad((11 - this.realTime) / 10 * 360 - 180 - 30) :
					player.rotation;

			c.strokeStyle = "#800";
			c.lineWidth = 3;
			c.translate(mid, mid);
			c.beginPath();
			c.moveTo(0, 0);
			c.lineTo(28 * Math.sin(angle), 28 * Math.cos(angle));
			c.stroke();
			c.translate(-mid, -mid);


			if (t < 10) {
				t = "0" + t;
			}

			c.font = "11pt monospace";
			c.fillText("00:" + t, 25, 50);

		}

	});

	window.MainScreen = MainScreen;

}(Ω));
