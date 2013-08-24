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

		init: function () {},

		set: function (x, y, w, h, depth, col) {

			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.dist = depth;
			this.col = col;

		},

		render: function (gfx) {

			var c = gfx.ctx;

			c.fillStyle = this.col;
			c.fillRect(this.x, this.y, this.w, this.h);

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
				this.strips.push(new Strip());
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
				viewDistance = this.viewDistance,
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

					//var strip = screenStrips[stripIdx];
					var dist = Math.sqrt(hit.dist);

					// use perpendicular distance to adjust for fish eye
					// distorted_dist = correct_dist / cos(relative_angle_of_ray)
					dist = dist * Math.cos(rayAngle) ;//p.rotation - hit.angle);

					// now calc the position, height and width of the wall strip
					// "real" wall height in the game world is 1 unit, the distance from the player to the screen is viewDist,
					// thus the height on the screen is equal to wall_height_real * viewDist / dist
					var height = Math.round(viewDistance / dist);
					var width = height * stripWidth;
					var top = Math.round((Ω.env.h - height) / 2);

					var c = 100 - Math.min(100, (Math.abs(dist) + 1) * 13 | 0),
						hitC = hit.cell || 10;

					if (c > 10) {

						if (!hit.shaded) {
							c = Math.max(0, c * 0.7);
						}
						//gfx.ctx.fillStyle = "hsl(" + (hitC * 30) + ", 40%, " + c + "%)";
						//gfx.ctx.fillRect(i * stripWidth, top, stripWidth, height);
						strip.set(i * stripWidth, top, stripWidth, height, hit.dist, "hsl(" + (hitC * 30) + ", 40%, " + c + "%)");
					} else {
						strip.set(i * stripWidth, top, stripWidth, height, hit.dist, "hsl(" + (hitC * 30) + ", 40%, 0%)")
					}


					rays.push({start: [p.x + p.w / 2, p.y + p.h / 2], end: [hit.x, hit.y]})
				}

  			}

  			//rays.forEach(function (r) {
  			//	Ω.rays.draw(gfx, r.start[0], r.start[1], r.end[0], r.end[1], this);
  			//}, this);

		},

		render: function (gfx, entities) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(200, 60%, 10%)";
			c.fillRect(0, 0, gfx.w, gfx.h / 2);

			c.fillStyle = "hsl(120, 40%, 40%)";
			c.fillRect(0, gfx.h / 2, gfx.w, gfx.h / 2);

			var grad = c.createLinearGradient(0, gfx.h * 0.22, 0, gfx.h * 0.22 + gfx.h * 0.55);
			grad.addColorStop(0, "rgba(30, 30, 30, 0)");
			grad.addColorStop(0.2, "rgba(30, 30, 30, 1)");
			grad.addColorStop(0.8, "rgba(30, 30, 30, 1)");
			grad.addColorStop(1, "rgba(30, 30, 0, 0)");

			c.fillStyle = grad;
			c.fillRect(0, gfx.h * 0.22, gfx.w, gfx.h * 0.55);

			this.castRays(gfx, 	entities.reduce(function (acc, n) {
				n.visible = false;
				acc[n.y / 16 | 0] = acc[n.y / 16 | 0] || {};
				acc[n.y / 16 | 0][n.x / 16 | 0] = {
					ent: n
				};
				return acc;
			}, {}));


			this.strips.concat(entities.filter(function(e) {
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
