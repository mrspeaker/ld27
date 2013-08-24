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
				fov = Ω.utils.deg2rad(60),
				viewDistance = (Ω.env.w / 2) / Math.tan((fov / 2)),
				stripWidth = 2,
				numRays = Math.ceil(Ω.env.w / stripWidth),
				p = this.entity,
				rays = [];

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
					dist = dist * Math.cos(rayAngle);

					// now calc the position, height and width of the wall strip

					// "real" wall height in the game world is 1 unit, the distance from the player to the screen is viewDist,
					// thus the height on the screen is equal to wall_height_real * viewDist / dist

					var height = Math.round(viewDistance / dist);

					// width is the same, but we have to stretch the texture to a factor of stripWidth to make it fill the strip correctly
					var width = height * stripWidth;

					// top placement is easy since everything is centered on the x-axis, so we simply move
					// it half way down the screen and then half the wall height back up.
					var top = Math.round((Ω.env.h - height) / 2);

					var c = Math.min(255, Math.abs(dist) * 45 | 0)
					gfx.ctx.fillStyle = "rgb(" + ([c, c, c].join(",")) + ")";
					gfx.ctx.fillRect(i * stripWidth, top, stripWidth, height);

					//var imgTop = 0;

				///	var styleHeight;

					// then adjust the top placement according to which wall texture we need
					//imgTop = (height * (wallType-1))>>0;
					//var styleHeight = (height * numTextures)>>0;

/*
					if (oldStyles.height != styleHeight) {
						style.height = styleHeight + "px";
						oldStyles.height = styleHeight
					}

					var texX = Math.round(textureX*width);
					if (texX > width - stripWidth)
						texX = width - stripWidth;
					texX += (wallIsShaded ? width : 0);

					var styleWidth = (width*2)>>0;
					if (oldStyles.width != styleWidth) {
						style.width = styleWidth +"px";
						oldStyles.width = styleWidth;
					}

					var styleTop = top - imgTop;
					if (oldStyles.top != styleTop) {
						style.top = styleTop + "px";
						oldStyles.top = styleTop;
					}

					var styleLeft = stripIdx*stripWidth - texX;
					if (oldStyles.left != styleLeft) {
						style.left = styleLeft + "px";
						oldStyles.left = styleLeft;
					}

					var styleClip = "rect(" + imgTop + ", " + (texX + stripWidth)  + ", " + (imgTop + height) + ", " + texX + ")";
					if (oldStyles.clip != styleClip) {
						style.clip = styleClip;
						oldStyles.clip = styleClip;
					}

					var dwx = xWallHit - player.x;
					var dwy = yWallHit - player.y;
					var wallDist = dwx*dwx + dwy*dwy;
					var styleZIndex = -(wallDist*1000)>>0;
					if (styleZIndex != oldStyles.zIndex) {
						strip.style.zIndex = styleZIndex;
						oldStyles.zIndex = styleZIndex;
					}
					*/

					//Ω.rays.draw(gfx, p.x + p.w / 2, p.y + p.h / 2, hit.x, hit.y, this);
					rays.push({start: [p.x + p.w / 2, p.y + p.h / 2], end: [hit.x, hit.y]})
				}

  			}

  			rays.forEach(function (r) {
  				Ω.rays.draw(gfx, r.start[0], r.start[1], r.end[0], r.end[1], this);
  			}, this);

		},

		render: function (gfx, camera) {

			// TODO: raycast texture draw
			//this._super(gfx, camera);

			this.castRays(gfx);

		}

	});

	Ω.RayCastMap = RayCastMap;

}(Ω));
