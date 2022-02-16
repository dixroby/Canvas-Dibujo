import { Arrows, Arrow } from "./ElementsDrawing";
import { faArrowsAltV, faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
//------------------------------------------------
const ArrowsElement = ({ clickArrow, draw, finishDrawing }) => {
  return (
    <div>
      <Arrows
        id={"leftUp"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          left: "0",
          top: "0",
          transform: "rotate(315deg) translateX(4px)  translateY(-9px)"
        }}
      >
        <Arrow icon={faArrowsAltV} />
      </Arrows>
      <Arrows
        style={{
          left: "50%",
          top: "0%",
          transform: "translateX(-5px) translateY(-10px) "
        }}
        id={"up"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
      >
        <Arrow icon={faArrowsAltV} />
      </Arrows>
      <Arrows
        id={"rightUp"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          left: "100%",
          top: "0%",
          transform: "rotate(45deg) translateX(-12px) translateY(-1px)"
        }}
      >
        <Arrow icon={faArrowsAltV} />
      </Arrows>
      <Arrows
        id={"right"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          left: "100%",
          top: "50%",
          transform: "rotate(90deg) translateX(-10px) translateY(4px)"
        }}
      >
        <Arrow icon={faArrowsAltV} />
      </Arrows>
      <Arrows
        id={"rightDown"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          left: "100%",
          top: "100%",
          transform: "rotate(135deg) translateX(-5px) translateY(14px)"
        }}
      >
        <Arrow icon={faArrowsAltV} />
      </Arrows>
      <Arrows
        id={"down"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          left: "50%",
          top: "100%",
          transform: "rotate(180deg) translateX(5px) translateY(10px)"
        }}
      >
        <Arrow icon={faArrowsAltV} />
      </Arrows>
      <Arrows
        id={"leftDown"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          left: "0",
          top: "100%",
          transform: "rotate(225deg) translateX(12px) translateY(6px)"
        }}
      >
        <Arrow icon={faArrowsAltV} />
      </Arrows>
      <Arrows
        id={"left"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          left: "0",
          top: "50%",
          transform: "rotate(270deg) translateX(9px) translateY(-7px)"
        }}
      >
        <Arrow icon={faArrowsAltV} />
      </Arrows>

      <Arrows
        id={"center"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          left: "50%",
          top: "50%",
          transform: "translateX(-11px) translateY(-11px) "
        }}
      >
        <Arrow icon={faArrowsAlt} />
      </Arrows>
    </div>
  );
};

const ArrowsElementC = ({ clickArrow, draw, finishDrawing }) => {
  return (
    <div>
      <Arrows
        id={"centerC"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          left: "0%",
          top: "0%",
          transform: "translateX(-11px) translateY(-12px) "
        }}
      >
        <Arrow icon={faArrowsAlt} />
      </Arrows>
      <Arrows
        id={"rightC"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          left: "100%",
          top: "0%",
          transform: "rotate(90deg) translateX(-11.5px) translateY(4px)"
        }}
      >
        <Arrow icon={faArrowsAltV} />
      </Arrows>
    </div>
  );
};
const ArrowsElementL = ({ clickArrow, draw, finishDrawing }) => {
  return (
    <div>
      <Arrows
        id={"centerL"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          transform: "translateX(-11px) translateY(-11px) "
        }}
      >
        <Arrow icon={faArrowsAlt} />
      </Arrows>
      <Arrows
        id={"inicio"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          transform: "translateX(-11px) translateY(-11px)"
        }}
      >
        <Arrow icon={faArrowsAlt} />
      </Arrows>
      <Arrows
        id={"final"}
        onPointerDown={clickArrow}
        onTouchMove={draw}
        onTouchEnd={finishDrawing}
        style={{
          transform: "translateX(-11px) translateY(-11px) "
        }}
      >
        <Arrow icon={faArrowsAlt} />
      </Arrows>
    </div>
  );
};
export { ArrowsElement, ArrowsElementC, ArrowsElementL };
