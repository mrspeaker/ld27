(function (Ω) {

	"use strict";

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
				fov = 60 * Math.PI / 180,
				viewDistance = (gfx.w / 2) / Math.tan((fov / 2)),
				stripWidth = 3,
				numRays = Math.ceil(this.w / stripWidth),
				p = this.entity;

  			for (var i = 0; i < numRays; i++) {
    			// where on the screen does ray go through?
    			rayPos = (-numRays / 2 + i) * stripWidth;

    			// the distance from the viewer to the point on the screen, simply Pythagoras.
    			var rayDist = Math.sqrt(rayPos * rayPos + viewDistance * viewDistance);

    			// the angle of the ray, relative to the viewing direction.
    			var rayAngle = Math.asin(rayPos / rayDist),
    				hit = Ω.rays.cast(p.rotation + rayAngle, p.x + p.w / 2, p.y + p.h / 2, this);

				if (hit) {
					Ω.rays.draw(gfx, p.x + p.w / 2, p.y + p.h / 2, hit.x, hit.y, this);
				}

  			}

		},

		render: function (gfx, camera) {

			// TODO: raycast texture draw
			//this._super(gfx, camera);

			this.castRays(gfx);

		}

	});

	Ω.RayCastMap = RayCastMap;

}(Ω));
