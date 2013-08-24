(function (Ω) {

	"use strict";

		window.lol = 0;
	var RayCastMap = Ω.Map.extend({

		init: function (sheet, data, entity) {

			this.entity = entity;

			this._super(sheet, data);

		},

		castRays: function (gfx) {

			var idx = 0,
				i,
				rayPos,
				rayDist,
				rayAngle,
				fov = Ω.utils.deg2rad(60),
				viewDistance = (Ω.env.w / 2) / Math.tan((fov / 2)),
				stripWidth = 2,
				numRays = Math.ceil(Ω.env.w / stripWidth),
				p = this.entity,
				c = gfx.ctx,
				rays = [],
				shaded = false;

  			for (var i = 0; i < numRays; i++) {
    			// where on the screen does ray go through?
    			rayPos = (-numRays / 2 + i) * stripWidth;

    			// the distance from the viewer to the point on the screen, simply Pythagoras.
    			var rayDist = Math.sqrt(rayPos * rayPos + viewDistance * viewDistance);

    			// the angle of the ray, relative to the viewing direction.
    			var rayAngle = Math.asin(rayPos / rayDist),
    				hit = Ω.rays.cast(p.rotation + rayAngle, p.x + p.w / 2, p.y + p.h / 2, this);

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

					// width is the same, but we have to stretch the texture to a factor of stripWidth to make it fill the strip correctly
					var width = height * stripWidth;

					// top placement is easy since everything is centered on the x-axis, so we simply move
					// it half way down the screen and then half the wall height back up.
					var top = Math.round((Ω.env.h - height) / 2);

					var c = 100 - Math.min(100, (Math.abs(dist) + 1) * 18 | 0),
						hitC = hit.cell || 10;

					if (c > 10) {

						if (!hit.shaded) {
							c = Math.max(0, c * 0.7);
						}

						gfx.ctx.fillStyle = "hsl(" + (hitC * 30) + ", 40%, " + c + "%)";
						gfx.ctx.fillRect(i * stripWidth, top, stripWidth, height);
					}

					rays.push({start: [p.x + p.w / 2, p.y + p.h / 2], end: [hit.x, hit.y]})
				}

  			}

  			//rays.forEach(function (r) {
  			//	Ω.rays.draw(gfx, r.start[0], r.start[1], r.end[0], r.end[1], this);
  			//}, this);

		},

		render: function (gfx, camera) {

			var c = gfx.ctx;

			c.fillStyle = "hsl(200, 60%, 60%)";
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

			this.castRays(gfx);

		}

	});

	Ω.RayCastMap = RayCastMap;

}(Ω));
