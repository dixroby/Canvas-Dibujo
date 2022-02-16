import { useRef } from "react";
import { Container } from "./ElementsDrawing";
import {
  cursorCanvas,
  circle,
  ellipse,
  square,
  straightLine,
  normal,
  location,
  isSameColor,
  cursorFill,
  getDropperColor
} from "./DrawingFunctions";
import CanvasElemt from "./CanvasElemt";
import ComponenteInputRange from "./ImputRangeLinea";
import ButtomTools from "./ButtomTools";
import FloodFill from "q-floodfill";
import { locateAR, moveArrow } from "./ArrowFunction";

//---------------------------------------------
const CanvasComponent = () => {
  //----------Ref Variables-------------------------------
  const containerRef = useRef(null);
  //----------------------------------------
  let drawings = [];
  let ppts = [];
  let ptI = [];
  let finalPointX,
    finalPointY,
    pFx,
    pFy,
    rotation,
    cx,
    cy,
    halfWidth,
    halfHeight;
  let width, height, line, color, fillColor, dropperColor, cursorWidth;
  //------------Element Variables-------------------------------
  let canvas1, canvas2, ctx1, ctx2, rotatorElmt, arrowsElemt, arrowBox;
  //------------State Variables-----------------------------------------
  let erased = false;
  let isDrawing = false;
  let isClik = false;
  let editable = false;
  let control = false;
  let finish = true;
  let type = "normal";
  let dPosition = 0;
  let rotatedValue = 0;
  let droppe = false;
  let typeC, elmtC;
  let move = false;
  let arrow = false;
  let arrowType = "up";
  let isMoveColor = false;
  //--------Document and window Events---------------------------------------------
  function entrarContenedor() {
    document.addEventListener("keydown", controlZ);
    document.addEventListener("keyup", controlzUp);
  }
  function salirContenedor() {
    document.removeEventListener("keydown", controlZ);
    document.removeEventListener("keyup", controlzUp);
  }
  window.addEventListener("resize", function () {
    const zoom = Math.round(window.devicePixelRatio * 100 - 100);
    const cursorZoom = parseFloat(line) + (line * zoom) / 100;
    cursorWidth = cursorZoom > 128 ? 128 : cursorZoom;
    if (droppe === false) {
      if (type !== "filled") {
        lineWidth();
      }
    }
  });
  document.addEventListener("mouseup", function () {
    isClik = false;
    if (arrow) {
      finishDrawing();
    }
  });
  document.addEventListener("mousedown", function () {
    isClik = true;
  });
  //--------set width and height values---------------------------------------------
  function setSizes({ w, h }) {
    width = w;
    height = h;
    if (color && line) {
      ctx2.lineWidth = line;

      if (type === "eraser") {
        ctx2.strokeStyle = "white";
        ctx1.globalCompositeOperation = "destination-out";
        cursorCanvas(canvas2, "white", cursorWidth);
      } else {
        ctx2.strokeStyle = color;
      }
    }
    if (drawings.length > 0) {
      ctx1.putImageData(drawings[drawings.length - dPosition - 1], 0, 0);
    }
  }
  //---------set Elements values-----------------------------------
  function setElements({ c1, c2, cotx1, cotx2, rotatorRef, arrowsRef }) {
    canvas1 = c1;
    canvas2 = c2;
    ctx1 = cotx1;
    ctx2 = cotx2;
    rotatorElmt = rotatorRef;
    arrowsElemt = arrowsRef;
  }
  //---------set line value-----------------------------------
  function lineWidth(linea) {
    if (linea) {
      line = linea;
      ctx2.lineWidth = line;
      const zoom = Math.round(window.devicePixelRatio * 100 - 100);
      const cursorZoom = parseFloat(line) + (line * zoom) / 100;
      cursorWidth = cursorZoom > 128 ? 128 : cursorZoom;
    }
    if (line) {
      if (type === "eraser") {
        cursorCanvas(canvas2, "white", cursorWidth);
      } else {
        cursorCanvas(canvas2, color, cursorWidth);
      }
    }
  }
  //---------set color value -----------------------------------
  function lineColor({ Ccolor }) {
    color = Ccolor;
    ctx2.strokeStyle = color;
    cursorCanvas(canvas2, color, cursorWidth);
  }
  //----------get fillColor value----------------------------------
  function getFillColor({ Ccolor }) {
    fillColor = Ccolor;
    cursorFill(canvas2, fillColor);
  }
  //------function that is activated when clicking on the canvas2---------------
  function startDrawing(evt) {
    if (arrow) {
      return;
    }
    if (droppe === true) {
      dropperColor = getDropperColor({ evt, drawings, canvas2 });
      return;
    }
    if (evt.targetTouches) {
      finish = false;
    }
    if (editable === true) {
      addDrawing();
      editable = false;
      rotatorElmt.children[2].children[0].value = 0;
    }
    const { offsetX, offsetY } = location(evt, canvas2);
    if (type === "filled") {
      const imgData = ctx1.getImageData(0, 0, width, height);
      if (isSameColor(imgData, offsetX, offsetY, fillColor)) {
        finish = false;
      } else {
        const floodFill = new FloodFill(imgData);
        floodFill.fill(fillColor, offsetX, offsetY, 0);
        ctx1.putImageData(floodFill.imageData, 0, 0);
        finish = true;
      }
    } else {
      if (type === "normal" || type === "eraser") {
        ppts.push({ offsetX, offsetY });
        ctx2.beginPath();
        ctx2.moveTo(offsetX, offsetY);
        ctx2.lineTo(offsetX, offsetY);
        ctx2.stroke();
      }
      isDrawing = true;
    }
    move = false;
  }
  //------function that is activated when up click on the canvas2-----------------------------------------
  function finishDrawing() {
    if (arrow) {
      arrowBox.style.opacity = "1";
      arrowBox.style.zIndex = "20";
      arrow = false;
      //---set new values ​​if the stroke is rotated---
      if (rotatedValue !== 0) {
        transRotate(cx, cy, -rotation);
        const { rx, ry } = locateAR(
          cx,
          cy,
          rotatedValue,
          ptI[0].offsetX,
          ptI[0].offsetY
        );
        const p = locateAR(cx, cy, rotatedValue, pFx, pFy);

        cx = (rx + p.rx) / 2;
        cy = (ry + p.ry) / 2;

        const r = rotatedValue * -1;
        const pIn = locateAR(cx, cy, r, rx, ry);
        const pFn = locateAR(cx, cy, r, p.rx, p.ry);

        ptI = [{ offsetX: pIn.rx, offsetY: pIn.ry }];
        pFx = pFn.rx;
        pFy = pFn.ry;
      } else {
        cx = (ptI[0].offsetX + pFx) / 2;
        cy = (ptI[0].offsetY + pFy) / 2;
      }
      locateArrows();
      return;
    }
    if (droppe === true) {
      elmtC.parentNode.children[0].style.color = `${dropperColor}`;
      if (typeC === "pencil") {
        lineColor({ Ccolor: dropperColor });
        elmtC.parentNode.parentNode.style.borderColor = `${dropperColor}`;
      } else {
        //---set fillColor---
        getFillColor({ Ccolor: dropperColor });
      }
      droppe = false;
      return;
    }
    if (finish === true) {
      if (
        type === "straightLine" ||
        type === "circle" ||
        type === "square" ||
        type === "ellipse"
      ) {
        if (move === true) {
          setPointsValue();
          editable = true;
          rotatorElmt.children[0].style.display = "flex";
        }
      } else {
        addDrawing();
      }
    } else {
      finish = true;
    }
    isDrawing = false;
  }
  //-------function that is activated when moving the mouse--------------------------
  function draw(evt) {
    move = true;
    if (arrow) {
      const { offsetX, offsetY } = location(evt, canvas2);
      //---draw with edited values----
      const { px, py, ptIn } = moveArrow({
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
      });
      ptI = ptIn;
      pFx = px;
      pFy = py;
      drawCanvas2(ptI, pFx, pFy);
      if (type === "straightLine") {
        cx = ptI[0].offsetX + (pFx - ptI[0].offsetX) / 2;
        cy = ptI[0].offsetY + (pFy - ptI[0].offsetY) / 2;
      }
      return;
    }
    if (droppe === true) {
      //---get the selected color----
      dropperColor = getDropperColor({ evt, drawings, canvas2 });
    } else {
      finish = true;
      if (isDrawing === false) {
        return;
      }
      const { offsetX, offsetY } = location(evt, canvas2);
      drawCanvas2(ppts, offsetX, offsetY);
      finalPointX = offsetX;
      finalPointY = offsetY;
    }
  }
  //-------function that draws on canvas2------------------------------------------
  function drawCanvas2(pts, offsetX, offsetY) {
    const values = {
      x: offsetX,
      y: offsetY,
      pI: pts,
      ctx2: ctx2,
      width: width,
      height: height
    };
    const DrawnsType = {
      normal: () => normal(values),
      straightLine: () => straightLine(values),
      circle: () => circle(values),
      square: () => square(values),
      ellipse: () => ellipse(values),
      eraser: () => normal(values)
    };
    const DefaultType = normal(values);
    const drawn = DrawnsType[type] ? DrawnsType[type]() : DefaultType;
  }
  //---------function that draws on canvas 1 and adds drawings to variable drawings---------
  function addDrawing() {
    ctx2.closePath();
    if (type !== "normal") {
      rotatorElmt.children[0].style.display = "none";
      rotatorElmt.children[2].style.display = "none";
      arrowsElemt.style.display = "none";
      arrowsElemt.nextSibling.style.display = "none";
    }
    if (erased === true) {
      drawings = [];
      erased = false;
    } else {
      if (dPosition > 0) {
        drawings = drawings.slice(0, drawings.length - dPosition);
      }
    }
    ctx1.drawImage(canvas2, 0, 0, width, height);
    drawings.push(ctx1.getImageData(0, 0, width, height));
    ctx2.clearRect(0, 0, width, height);
    //------restore initial values--------------------
    dPosition = 0;
    ppts = [];
    isDrawing = false;
    editable = false;
    rotatedValue = 0;
  }
  //-----------------------------------------------------------------------------------
  function clickArrow(e) {
    halfWidth = (pFx - ptI[0].offsetX) / 2;
    halfHeight = (pFy - ptI[0].offsetY) / 2;
    arrow = true;
    arrowType = e.target.id;
    ctx2.clearRect(0, 0, width, height);
    if (rotatedValue !== 0) {
      transRotate(cx, cy, rotation);
    }
    drawCanvas2(ptI, pFx, pFy);
    arrowBox = e.target.parentNode.parentNode;
    arrowBox.style.opacity = "0";
    arrowBox.style.zIndex = "6";
  }
  //--------function that is activated when pressing a tool in the app---------------
  function change({ target }) {
    if (type === "filled") {
      containerRef.current.children[3].style.pointerEvents = "auto";
    }
    if (type === "eraser") {
      ctx1.globalCompositeOperation = "source-over";
    }
    type = target.id;
    droppe = false;
    if (target.id === "filled") {
      containerRef.current.children[3].style.pointerEvents = "none";
      cursorFill(canvas2, fillColor);
      return;
    }
    if (target.id === "eraser") {
      ctx2.strokeStyle = "white";
      ctx1.globalCompositeOperation = "destination-out";
      cursorCanvas(canvas2, "white", cursorWidth);
      return;
    }
    lineColor({ Ccolor: color });
  }
  //-----------function to rotate the canvas--------------------------------------------
  function rotate(e) {
    if (e) {
      rotatedValue = e.target.value;
      rotation = (rotatedValue * Math.PI) / 180;
    }
    ctx2.clearRect(0, 0, width, height);
    transRotate(cx, cy, rotation);
    drawCanvas2(ptI, pFx, pFy);
    transRotate(cx, cy, -rotation);
    locateArrows();
  }
  function transRotate(x, y, r) {
    ctx2.translate(x, y);
    ctx2.rotate(r);
    ctx2.translate(-x, -y);
  }
  //--------sets values ​​of ( ptI, pFx, pFy, cx, cy )--------------------------------------------------------------
  function setPointsValue() {
    let pIx, pIy;
    if (type === "circle" || type === "straightLine") {
      pFx = finalPointX;
      pFy = finalPointY;
      pIx = ppts[0].offsetX;
      pIy = ppts[0].offsetY;
    } else {
      if (ppts[0].offsetX < finalPointX) {
        pIx = ppts[0].offsetX;
        pFx = finalPointX;
      } else {
        pIx = finalPointX;
        pFx = ppts[0].offsetX;
      }
      if (ppts[0].offsetY < finalPointY) {
        pIy = ppts[0].offsetY;
        pFy = finalPointY;
      } else {
        pIy = finalPointY;
        pFy = ppts[0].offsetY;
      }
    }
    ptI = [{ offsetX: pIx, offsetY: pIy }];
    cx = pIx + (pFx - pIx) / 2;
    cy = pIy + (pFy - pIy) / 2;
  }

  //-------function that is activated when leaving the canvas----------------------
  function leave() {
    if (arrow) {
      return;
    }
    if (isDrawing === false) {
      return;
    }
    finishDrawing();
  }
  //------function that is activated when entering the canvas-----------------------
  function toEnter(e) {
    if (isClik === true) {
      if (isMoveColor || type === "filled") {
        return;
      }
      startDrawing(e);
    }
  }

  //-------function that checks the number of dubijos and returns to the previous drawing-----
  function goBack() {
    if (editable === true) {
      addDrawing();
    }
    erased = false;
    const numberOfDrawings = drawings.length;
    if (numberOfDrawings === dPosition) {
      ctx1.clearRect(0, 0, width, height);
    } else if (numberOfDrawings === dPosition + 1) {
      ctx1.clearRect(0, 0, width, height);
      dPosition = dPosition + 1;
    } else {
      ctx1.clearRect(0, 0, width, height);
      if (numberOfDrawings > 1) {
        dPosition = dPosition + 1;
        ctx1.putImageData(drawings[numberOfDrawings - dPosition - 1], 0, 0);
      }
    }
  }
  //------function that checks in which position of the drawing it is and goes to the next----
  function goForward() {
    if (editable === true) {
      addDrawing();
    }
    if (erased === false) {
      const numberOfDrawings = drawings.length;
      if (dPosition + 1 > 1) {
        erased = false;
        dPosition = dPosition - 1;
        ctx1.putImageData(drawings[numberOfDrawings - dPosition - 1], 0, 0);
      }
    }
  }
  //--------control Z function------------------------------------------
  function controlZ(e) {
    if (e.key === "Control") {
      control = true;
      return;
    }
    if ((e.key === "z") & (control === true)) {
      goBack();
    }
  }
  function controlzUp(e) {
    if (e.key === "Control") {
      control = false;
    }
  }
  //-------function that adds the drawing if it is in rotation mode-------------------------------------------
  function inRotation() {
    if (editable === true) {
      addDrawing();
      rotatorElmt.children[2].children[0].value = 0;
    }
  }
  //---------function to download the drawing-----------------------------------------
  function downloadImg(e) {
    if (editable === true) {
      addDrawing();
    }
    const image = canvas1.toDataURL();
    e.target.setAttribute("href", image);
  }
  //---------function clean all canvas-----------------------------------------
  function clearAll() {
    if (editable === true) {
      addDrawing();
    }
    if (erased === false) {
      erased = true;
      dPosition = dPosition - 1;
      ctx2.clearRect(0, 0, width, height);
      ctx1.clearRect(0, 0, width, height);
    }
  }
  //--------function to activate the dropper------------------------------------------
  function dropper(elmt, typeBC) {
    if (drawings.length > 0) {
      droppe = true;
    }
    typeC = typeBC;
    elmtC = elmt;
  }
  //------function that is activated by pressing the movecolor---
  function moveColor(e) {
    isMoveColor = e;
  }
  //--------pressing the edit button sets styles--------------------------------------------
  function clickEdit() {
    rotatorElmt.children[0].style.display = "none";
    locateArrows();
    if (type === "straightLine") {
      arrowsElemt.nextSibling.style.display = "block";
      arrowsElemt.nextSibling.style.zIndex = "20";
      return;
    } else if (type === "circle") {
      arrowsElemt.children[0].style.display = "none";
      arrowsElemt.children[1].style.display = "block";
      arrowsElemt.style.border = "none";
      arrowsElemt.style.borderTop = "1px solid";
    } else {
      arrowsElemt.children[0].style.display = "block";
      arrowsElemt.children[1].style.display = "none";
      rotatorElmt.children[2].style.display = "flex";
      arrowsElemt.style.border = "1px solid";
    }
    arrowsElemt.style.display = "block";
    arrowsElemt.style.zIndex = "20";
  }
  //---------position the arrows in the edit box------------------------------------------------------
  function locateArrows() {
    if (type === "straightLine") {
      arrowsElemt.nextSibling.children[0].children[0].style.left = `${cx}px`;
      arrowsElemt.nextSibling.children[0].children[0].style.top = `${cy}px`;
      arrowsElemt.nextSibling.children[0].children[1].style.left = `${ptI[0].offsetX}px`;
      arrowsElemt.nextSibling.children[0].children[1].style.top = `${ptI[0].offsetY}px`;
      arrowsElemt.nextSibling.children[0].children[2].style.left = `${pFx}px`;
      arrowsElemt.nextSibling.children[0].children[2].style.top = `${pFy}px`;
      return;
    }
    if (type === "circle") {
      const a = Math.pow(pFx - ptI[0].offsetX, 2);
      const b = Math.pow(pFy - ptI[0].offsetY, 2);
      const widthC = Math.sqrt(a + b);
      arrowsElemt.style.width = `${widthC}px`;
    } else {
      arrowsElemt.style.width = `${pFx - ptI[0].offsetX}px`;
      arrowsElemt.style.height = `${pFy - ptI[0].offsetY}px`;
    }
    arrowsElemt.style.transform = `rotate(${rotatedValue}deg)`;
    arrowsElemt.style.left = `${ptI[0].offsetX}px`;
    arrowsElemt.style.top = `${ptI[0].offsetY}px`;
  }
  //-----------return Component----------------------------------------
  return (
    <Container
      onMouseEnter={entrarContenedor}
      onMouseLeave={salirContenedor}
      ref={containerRef}
    >
      <CanvasElemt
        startDrawing={startDrawing}
        finishDrawing={finishDrawing}
        draw={draw}
        rotate={rotate}
        leave={leave}
        toEnter={toEnter}
        inRotation={inRotation}
        setSizes={setSizes}
        setElements={setElements}
        goBack={goBack}
        goForward={goForward}
        clickArrow={clickArrow}
        clickEdit={clickEdit}
      />
      <ComponenteInputRange lineWidth={lineWidth} />
      <ButtomTools
        inRotation={inRotation}
        change={change}
        getFillColor={getFillColor}
        lineColor={lineColor}
        clearAll={clearAll}
        moveColor={moveColor}
        downloadImg={downloadImg}
        dropper={dropper}
      />
    </Container>
  );
};

export default CanvasComponent;
