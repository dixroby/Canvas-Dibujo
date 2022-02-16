function locateAR(cx, cy, angle, rx, ry) {
  let absangl = Math.abs(angle);
  let s = Math.sin(absangl * (Math.PI / 180));
  let c = Math.cos(absangl * (Math.PI / 180));

  // translate point back to Origin:
  rx -= cx;
  ry -= cy;

  // rotate point
  let xnew;
  let ynew;

  if (angle > 0) {
    xnew = rx * c - ry * s;
    ynew = rx * s + ry * c;
  } else {
    xnew = rx * c + ry * s;
    ynew = -rx * s + ry * c;
  }
  // translate point back:
  rx = xnew + cx;
  ry = ynew + cy;
  return { rx, ry };
}
//------------------------------------------------
function moveArrow({
  ptI,
  cx,
  cy,
  offsetX,
  offsetY,
  rotatedValue,
  arrowType,
  pFx,
  pFy,
  halfWidth,
  halfHeight
}) {
  const r = rotatedValue * -1;
  //return Value
  let px, py, ptIn;
  //function executed according to the case
  switch (arrowType) {
    case "leftUp":
      if (rotatedValue !== 0) {
        let { rx, ry } = locateAR(cx, cy, r, offsetX, offsetY);
        if (ry > pFy) {
          ry = pFy;
        }
        if (rx > pFx) {
          rx = pFx;
        }
        px = pFx;
        py = pFy;
        ptIn = [{ offsetX: rx, offsetY: ry }];
      } else {
        if (offsetY > pFy) {
          offsetY = pFy;
        }
        if (offsetX > pFx) {
          offsetX = pFx;
        }
        px = pFx;
        py = pFy;
        ptIn = [{ offsetX: offsetX, offsetY: offsetY }];
      }
      break;
    case "up":
      if (rotatedValue !== 0) {
        let { ry } = locateAR(cx, cy, r, offsetX, offsetY);
        if (ry > pFy) {
          ry = pFy;
        }
        px = pFx;
        py = pFy;
        ptIn = [{ offsetX: ptI[0].offsetX, offsetY: ry }];
      } else {
        if (offsetY > pFy) {
          offsetY = pFy;
        }
        px = pFx;
        py = pFy;
        ptIn = [{ offsetX: ptI[0].offsetX, offsetY: offsetY }];
      }
      break;
    case "rightUp":
      if (rotatedValue !== 0) {
        let { rx, ry } = locateAR(cx, cy, r, offsetX, offsetY);
        if (ry > pFy) {
          ry = pFy;
        }
        if (rx < ptI[0].offsetX) {
          rx = ptI[0].offsetX;
        }
        px = rx;
        py = pFy;
        ptIn = [{ offsetX: ptI[0].offsetX, offsetY: ry }];
      } else {
        if (offsetY > pFy) {
          offsetY = pFy;
        }
        if (offsetX < ptI[0].offsetX) {
          offsetX = ptI[0].offsetX;
        }
        px = offsetX;
        py = pFy;
        ptIn = [{ offsetX: ptI[0].offsetX, offsetY: offsetY }];
      }
      break;
    case "right":
      if (rotatedValue !== 0) {
        let { rx } = locateAR(cx, cy, r, offsetX, offsetY);
        if (rx < ptI[0].offsetX) {
          rx = ptI[0].offsetX;
        }
        px = rx;
        py = pFy;
        ptIn = ptI;
      } else {
        if (offsetX < ptI[0].offsetX) {
          offsetX = ptI[0].offsetX;
        }
        px = offsetX;
        py = pFy;
        ptIn = ptI;
      }
      break;
    case "rightDown":
      if (rotatedValue !== 0) {
        let { rx, ry } = locateAR(cx, cy, r, offsetX, offsetY);
        if (rx < ptI[0].offsetX) {
          rx = ptI[0].offsetX;
        }
        if (ry < ptI[0].offsetY) {
          ry = ptI[0].offsetY;
        }
        px = rx;
        py = ry;
        ptIn = ptI;
      } else {
        if (offsetX < ptI[0].offsetX) {
          offsetX = ptI[0].offsetX;
        }
        if (offsetY < ptI[0].offsetY) {
          offsetY = ptI[0].offsetY;
        }
        px = offsetX;
        py = offsetY;
        ptIn = ptI;
      }
      break;
    case "down":
      if (rotatedValue !== 0) {
        let { ry } = locateAR(cx, cy, r, offsetX, offsetY);
        if (ry < ptI[0].offsetY) {
          ry = ptI[0].offsetY;
        }
        px = pFx;
        py = ry;
        ptIn = ptI;
      } else {
        if (offsetY < ptI[0].offsetY) {
          offsetY = ptI[0].offsetY;
        }
        px = pFx;
        py = offsetY;
        ptIn = ptI;
      }
      break;
    case "leftDown":
      if (rotatedValue !== 0) {
        let { rx, ry } = locateAR(cx, cy, r, offsetX, offsetY);

        if (rx > pFx) {
          rx = pFx;
        }
        if (ry < ptI[0].offsetY) {
          ry = ptI[0].offsetY;
        }
        px = pFx;
        py = ry;
        ptIn = [{ offsetX: rx, offsetY: ptI[0].offsetY }];
      } else {
        if (offsetX > pFx) {
          offsetX = pFx;
        }
        if (offsetY < ptI[0].offsetY) {
          offsetY = ptI[0].offsetY;
        }
        px = pFx;
        py = offsetY;
        ptIn = [{ offsetX: offsetX, offsetY: ptI[0].offsetY }];
      }
      break;
    case "left":
      if (rotatedValue !== 0) {
        let { rx } = locateAR(cx, cy, r, offsetX, offsetY);
        if (rx > pFx) {
          rx = pFx;
        }
        px = pFx;
        py = pFy;
        ptIn = [{ offsetX: rx, offsetY: ptI[0].offsetY }];
      } else {
        if (offsetY > pFy) {
          offsetY = pFy;
        }
        if (offsetX > pFx) {
          offsetX = pFx;
        }
        px = pFx;
        py = pFy;
        ptIn = [{ offsetX: offsetX, offsetY: ptI[0].offsetY }];
      }
      break;
    case "center":
      if (rotatedValue !== 0) {
        const { rx, ry } = locateAR(cx, cy, r, offsetX, offsetY);
        px = rx + halfWidth;
        py = ry + halfHeight;
        ptIn = [{ offsetX: rx - halfWidth, offsetY: ry - halfHeight }];
      } else {
        px = offsetX + halfWidth;
        py = offsetY + halfHeight;
        ptIn = [
          { offsetX: offsetX - halfWidth, offsetY: offsetY - halfHeight }
        ];
      }
      break;
    case "centerC":
      px = offsetX + halfWidth * 2;
      py = offsetY + halfHeight * 2;
      ptIn = [{ offsetX: offsetX, offsetY: offsetY }];
      break;
    case "rightC":
      if (offsetX < ptI[0].offsetX) {
        offsetX = ptI[0].offsetX;
      }
      if (offsetY < ptI[0].offsetY) {
        offsetY = ptI[0].offsetY;
      }
      px = offsetX;
      py = ptI[0].offsetY;
      ptIn = ptI;
      break;
    case "centerL":
      px = pFx + (offsetX - cx);
      py = pFy + (offsetY - cy);
      ptIn = [
        {
          offsetX: ptI[0].offsetX + (offsetX - cx),
          offsetY: ptI[0].offsetY + (offsetY - cy)
        }
      ];
      break;
    case "inicio":
      px = pFx;
      py = pFy;
      ptIn = [{ offsetX: offsetX, offsetY: offsetY }];
      break;
    case "final":
      px = offsetX;
      py = offsetY;
      ptIn = [{ offsetX: ptI[0].offsetX, offsetY: ptI[0].offsetY }];
      break;
    default:
      px = pFx;
      py = pFy;
      ptIn = ptI;
  }

  return { px, py, ptIn };
}

export { locateAR, moveArrow };
