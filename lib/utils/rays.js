(function (Ω) {

	"use strict";

	var rays = {

		cast: function (angle, originX, originY, map, entityMap) {

			angle %= Math.PI * 2;
			if (angle < 0) angle += Math.PI * 2;

			entityMap = entityMap || {};

			var twoPi = Math.PI * 2,
				ox = originX / map.sheet.w,
				oy = originY / map.sheet.h,
				right = angle > twoPi * 0.75 || angle < twoPi * 0.25,
				up = angle > Math.PI,
				sin = Math.sin(angle),
				cos = Math.cos(angle),
				dist = null,
				distVertical = 0,
				distX,
				distY,
				xHit = 0,
				yHit = 0,
				cell = 0,
				cell2,
				wallX,
				wallY,
				wallX2,
				wallY2,
				textureX,
				shaded = false,

				slope = sin / cos,
				dx = right ? 1 :  -1,
				dy = dx * slope,

				x = right ? Math.ceil(ox) : Math.floor(ox),
				y = oy + (x - ox) * slope;

			while (x >= 0 && x < map.cellW && y >=0 && y < map.cellH) {

				wallX = Math.floor(x + (right ? 0 : -1));
				wallY = Math.floor(y);

				if (entityMap[wallY] && entityMap[wallY][wallX]) {
					entityMap[wallY][wallX].ent.visible = true;
				}

				cell = map.cells[wallY][wallX];
				if (cell > 0) {
					distX = x - ox;
					distY = y - oy;
					dist = Math.sqrt(distX * distX + distY * distY);

					xHit = x;
					yHit = y;

					textureX = y % 1;	// where exactly are we on the wall? textureX is the x coordinate on the texture that we'll use later when texturing the wall.
					if (!right) textureX = 1 - textureX; // if we're looking to the left side of the map, the texture should be reversed

					shaded = true;
					break;
				}
				x += dx;
				y += dy;
			}

			// Check vertical walls
			slope = cos / sin;
			dy = up ? -1 : 1;
			dx = dy * slope;
			y = up ? Math.floor(oy) : Math.ceil(oy);
			x = ox + (y - oy) * slope;

			while (x >= 0 && x < map.cellW && y >=0 && y < map.cellH) {

				wallY2 = (y + (up ? -1 : 0)) | 0;
				wallX2 = x | 0;

				if (entityMap[wallY] && entityMap[wallY][wallX]) {
					entityMap[wallY][wallX].ent.visible = true;
				}


				cell2 = wallY2 < 0 ? null : map.cells[wallY2][wallX2];
				if (cell2) {
					wallY = wallY2;
					wallX = wallX2;
					distX = x - ox;
					distY = y - oy;

					distVertical = Math.sqrt(distX * distX + distY * distY);
					if (dist === null || distVertical < dist) {
						dist = distVertical;
						cell = cell2;
						shaded = false;
						xHit = x;
						yHit = y;
						textureX = x % 1;
						if (up) textureX = 1 - textureX;
					}
					break;
				}
				x += dx;
				y += dy;
			}

			if (dist) {
				return {
					x: xHit,
					y: yHit,
					cell: cell,
					cellX: wallX,
					cellY: wallY,
					dist: dist,
					angle: angle,
					shaded: shaded,
					textureX: textureX
				}
			} else {
				return null;
			}

		},

		draw: function (gfx, ox, oy, rayX, rayY, map) {

			var c = gfx.ctx;

			c.strokeStyle = "rgba(100,0,0,0.4)";
			c.lineWidth = 0.5;

			c.beginPath();
			c.moveTo(ox, oy);
			c.lineTo(rayX * map.sheet.w, rayY * map.sheet.h);
			c.closePath();
			c.stroke();

		}

	}

	Ω.rays = rays;

}(Ω));
