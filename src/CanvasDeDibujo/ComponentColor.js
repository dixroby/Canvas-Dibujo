import { useRef, useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import {
  ComponetColorContainer,
  PickerContainer,
  IconToolColor,
  ContainerToolsColor,
  InputFixeColor,
  LabelFixeColor
} from "./ElementsDrawing";
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
//------------------------------------------------------------------------
const ComponentColor = ({ funcColor, type = "pencil", dropper, moveColor }) => {
  const finish = useRef(true);
  const fixe = useRef(false);
  const isReszing = useRef(false);
  const ElementRef = useRef(null);
  const [color, setColor] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  let prevX, prevY, boxLeft, boxTop;
  //------------------------------------------------------------------------
  function handleClick() {
    if (type === "fill") {
      ElementRef.current.parentNode.previousSibling.click();
    }
    finish.current = true;
    if (fixe.current === false) {
      ElementRef.current.style.width = "300%";
    }
    if (type === "pencil") {
      if (
        ElementRef.current.parentNode.previousSibling.previousSibling
          .checked === true
      )
        ElementRef.current.parentNode.parentNode.children[0].click();
    }
    setDisplayColorPicker(true);
  }
  const boxColor = `rgba(${color.r},${color.g},${color.b},${color.a})`;

  //-------Establece color --------------------------------------------------------
  useEffect(() => {
    ElementRef.current.parentNode.children[0].style.color = `${boxColor}`;
    funcColor({ Ccolor: boxColor });
    if (type === "pencil") {
      ElementRef.current.parentNode.parentNode.style.borderColor = `${boxColor}`;
    }
  }, [funcColor, boxColor, type]);
  //------------------------------------------------------------------------
  useEffect(() => {
    if (type === "fill") {
      funcColor({ Ccolor: "rgba(255,255,255,1)" });
    }
    ElementRef.current.parentNode.parentNode.children[0].click();
  }, []);
  //------------------------------------------
  function dropperClick() {
    dropper(ElementRef.current, type);
    setDisplayColorPicker(false);
  }
  //------------------------------------------------
  function toucEnd() {
    if (fixe.current === true) {
      return;
    }
    if (finish.current === false) {
      setDisplayColorPicker(false);
    }
  }

  function closeTheWindow() {
    if (fixe.current === true) {
      return;
    }
    setDisplayColorPicker(false);
    ElementRef.current.style.width = "100%";
  }

  function touchMove() {
    finish.current = false;
  }
  //------------------------------------------
  function pushBox(e) {
    moveColor(true);
    boxLeft = ElementRef.current.children[0].offsetLeft;
    boxTop = ElementRef.current.children[0].offsetTop;
    isReszing.current = true;
    if (e.targetTouches) {
      window.addEventListener("touchmove", moveBox);
      window.addEventListener("touchend", upBox);
      prevX = e.targetTouches[0].clientX;
      prevY = e.targetTouches[0].clientY;
    } else {
      window.addEventListener("mousemove", moveBox);
      window.addEventListener("mouseup", upBox);
      prevX = e.clientX;
      prevY = e.clientY;
    }
  }

  function moveBox(e) {
    if (fixe.current === true) {
      if (isReszing.current === true) {
        let newX, newY;
        if (e.targetTouches) {
          newX = prevX - e.targetTouches[0].clientX;
          newY = prevY - e.targetTouches[0].clientY;
        } else {
          newX = prevX - e.clientX;
          newY = prevY - e.clientY;
        }
        ElementRef.current.children[0].style.left = `${boxLeft - newX}px`;
        ElementRef.current.children[0].style.top = `${boxTop - newY}px`;
      }
    }
  }

  function changeFixe(e) {
    if (fixe.current === false) {
      e.target.previousSibling.style.display = "block";
      ElementRef.current.style.width = "100%";
      fixe.current = true;
    } else {
      e.target.previousSibling.style.display = "none";
      fixe.current = false;
    }
  }

  function upBox(e) {
    moveColor(false);
    if (e.targetTouches) {
      window.removeEventListener("touchmove", moveBox);
      window.removeEventListener("touchend", upBox);
    } else {
      window.removeEventListener("mousemove", moveBox);
      window.removeEventListener("mouseup", upBox);
    }
    isReszing.current = false;
  }
  //---------------------------------------------------------------
  return (
    <ComponetColorContainer
      onClick={handleClick}
      onMouseLeave={closeTheWindow}
      ref={ElementRef}
    >
      {displayColorPicker && (
        <PickerContainer onTouchEnd={toucEnd} onTouchMove={touchMove}>
          <ChromePicker
            color={color}
            onChange={(color) => setColor(color.rgb)}
          />
          ,
          <ContainerToolsColor>
            <IconToolColor
              style={{ left: "5px", display: "none" }}
              onMouseDown={pushBox}
              onTouchStart={pushBox}
            >
              <FontAwesomeIcon icon={faArrowsAlt} />
            </IconToolColor>
            <InputFixeColor
              type={"checkbox"}
              id={"fixe"}
              onChange={changeFixe}
            />
            <LabelFixeColor htmlFor={"fixe"}>FIJAR</LabelFixeColor>
            <IconToolColor onMouseUp={dropperClick}>
              <FontAwesomeIcon icon={faEyeDropper} />
            </IconToolColor>
          </ContainerToolsColor>
        </PickerContainer>
      )}
    </ComponetColorContainer>
  );
};

export default ComponentColor;
