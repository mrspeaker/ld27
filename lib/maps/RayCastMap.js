(function (Ω) {

	"use strict";

		window.lol = 0;

	var Strip = Ω.Class.extend({

		depth: 0,

		x: 0,
		y: 0,
		h: 0,
		w: 0,

		col: null,

		init: function (map) {

			this.map = map;

		},

		set: function (x, y, w, h, depth, col, texX, texY) {

			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.dist = depth;
			this.col = col;

			this.texX = texX;
			this.texY = texY;

		},

		render: function (gfx) {

			var c = gfx.ctx;

			if (this.texX === null) {

				c.fillStyle = this.col;
				c.fillRect(this.x, this.y, this.w, this.h);
				return;

			}

			var scale = 1;
			gfx.ctx.drawImage(
				this.map.sheet,
				this.texX,
				this.texY,
				1,
				32,
				this.x,
				this.y,
				this.w,
				this.h);

		}
	});

	var RayCastMap = Ω.Map.extend({

		strips: null,

		init: function (sheet, data, entity) {

			this._super(sheet, data);
			this.entity = entity;

			this.fov = Ω.utils.deg2rad(60);
			this.viewDistance = (Ω.env.w / 2) / Math.tan((this.fov / 2));
			this.stripWidth = 2;
			this.numRays = Math.ceil(Ω.env.w / this.stripWidth);

			this.strips = [];
			for (var i = 0; i < this.numRays; i++) {
				this.strips.push(new Strip(sheet));
			}

		},

		tick: function () {

		},

		castRays: function (gfx, entities) {

			var idx = 0,
				i,
				strip,
				rayPos,
				rayDist,
				rayAngle,
				fov = this.fov,
				viewDistance = this.viewDistance / (Ω.utils.lerpPerc(1, 8, player.depth)),
				stripWidth = this.stripWidth,
				numRays = this.numRays,
				p = this.entity,
				c = gfx.ctx,
				rays = [],
				shaded = false;

  			for (var i = 0; i < numRays; i++) {

  				strip = this.strips[i];
  				strip.depth = 100;

    			// where on the screen does ray go through?
    			rayPos = (-numRays / 2 + i) * stripWidth;

    			// the distance from the viewer to the point on the screen, simply Pythagoras.
    			var rayDist = Math.sqrt(rayPos * rayPos + viewDistance * viewDistance);

    			// the angle of the ray, relative to the viewing direction.
    			var rayAngle = Math.asin(rayPos / rayDist),
    				hit = Ω.rays.cast(p.rotation + rayAngle, p.x + p.w / 2, p.y + p.h / 2, this, entities);

				if (hit) {

					var dist = Math.sqrt(hit.dist);

					// distorted_dist = correct_dist / cos(relative_angle_of_ray)
					dist = dist * Math.cos(rayAngle) / Math.max(1, player.depth * 1);//p.rotation - hit.angle);

					var height = viewDistance / dist | 0;
					var width = (viewDistance / dist | 0) * stripWidth;
					var top = (Ω.env.h - height) / 2;

					var c = 100 - Math.min(100, (Math.abs(dist) + 1) * 13 | 0),
						hitC = hit.cell || 10,
						sat = Ω.utils.lerpPerc(40, 0, player.depth)

					if (c > 1) {
						if (!hit.shaded) {
							c = Math.max(0, c * 0.7);
						}

						var texX,
							texY;

						texX = ((hit.cell - 1) * 16) +  Math.floor(hit.textureX * 16);
						texY = hit.shaded ? 32 : 0;

						if (hitC > 30) {
							texX = null;
							texY = null;
							hitC -= 30;
						}


						strip.set(i * stripWidth, top, stripWidth, height, hit.dist, "hsl(" + (hitC * 30) + ", " + sat + "%, " + c + "%)", texX, texY);
					} else {
						strip.set(i * stripWidth, top, stripWidth, height, hit.dist, "hsl(" + (hitC * 30) + ", " + sat + "%, 0%)", null, null)
					}

					rays.push({start: [p.x + p.w / 2, p.y + p.h / 2], end: [hit.x, hit.y]})
				}

  			}

  			//rays.forEach(function (r) {
  			//	Ω.rays.draw(gfx, r.start[0], r.start[1], r.end[0], r.end[1], this);
  			//}, this);

		},

		render: function (gfx, entities) {

			var c = gfx.ctx,
				sat,
				bright;

			// Sky
			sat = player.atTop ?
				Ω.utils.lerpPerc(80, 0, player.bredth):
				Ω.utils.lerpPerc(60, 0, player.depth);

			bright = player.atTop ?
				Ω.utils.lerpPerc(80, 0, player.bredth):
				Ω.utils.lerpPerc(10, 100, player.depth);

			c.fillStyle = "hsl(200, " + sat + "%, " + bright + "%)";
			c.fillRect(0, 0, gfx.w, gfx.h / 2);


			// Ground
			sat = Ω.utils.lerpPerc(40, 10, player.depth);
			bright = player.atTop ?
				Ω.utils.lerpPerc(40, 0, player.bredth):
				Ω.utils.lerpPerc(10, 90, player.depth);

			c.fillStyle = "hsl(" + Ω.utils.lerpPerc(120, 360, player.depth) + ", " + sat + "%, " + bright +  "%)";
			c.fillRect(0, gfx.h / 2, gfx.w, gfx.h / 2);


			// Mid
			var top = Ω.utils.lerpPerc(0.22, 0.5, player.depth),
				bot = Ω.utils.lerpPerc(0.55, 0.05, player.depth),
				g = 50;

			var grad = c.createLinearGradient(0, gfx.h * top, 0, gfx.h * top + gfx.h * bot);
			grad.addColorStop(0, "hsla(180, 40%, 40%, 0)");
			grad.addColorStop(0.5, "hsla(130, 40%, 10%, 1)");
			grad.addColorStop(0.7, "hsla(90, 40%, 10%, 1)");
			grad.addColorStop(1, "hsla(70, 40%, 40%, 0)");

			c.fillStyle = grad;
			c.fillRect(0, gfx.h * top, gfx.w, gfx.h * bot);

			this.castRays(gfx, 	entities.reduce(function (acc, n) {
				n.visible = false;
				acc[n.y / 16 | 0] = acc[n.y / 16 | 0] || {};
				acc[n.y / 16 | 0][n.x / 16 | 0] = {
					ent: n
				};
				return acc;
			}, {}));


			this.strips.concat(entities.filter(function(e) {
				// Filter out not-close baddies
				if (e.radius && e.dist > 30) {
					e.visible = false;
				}
				return e.visible;
			})).sort(function (a, b) {
				return a.dist > b.dist ? -1 : 1;
			}).forEach(function (g) {
				g.render(gfx);
			});

		}

	});

	Ω.RayCastMap = RayCastMap;

}(Ω));
