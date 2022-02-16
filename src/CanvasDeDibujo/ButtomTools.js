import {
  ButtonContainer,
  InputLabel,
  Label,
  Icon,
  Button,
  ColorButton,
  ToolsContainer
} from "./ElementsDrawing";
import BtnColor from "./ComponentColor";
import {
  faPencilAlt,
  faSlash,
  faEraser,
  faFillDrip,
  faPalette
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircle,
  faSquare,
  faSave
} from "@fortawesome/free-regular-svg-icons";
//------------------------------------------------------
const ellipse = (
  <svg
    style={{ pointerEvents: "none" }}
    xmlns="http://www.w3.org/2000/svg"
    height="100%"
    width="100%"
  >
    <ellipse
      cx="50%"
      cy="50%"
      rx="46%"
      ry="35%"
      stroke="black"
      strokeWidth="3"
      fill="transparent"
    />
  </svg>
);
//------------------------------------------------
const ButtomTools = ({
  inRotation,
  change,
  lineColor,
  clearAll,
  downloadImg,
  getFillColor,
  dropper,
  moveColor
}) => {
  //-------------------------------------------
  function handleClik(e) {
    e.target.previousSibling.click();
  }
  //-------------------------------------------
  return (
    <ButtonContainer onClick={inRotation}>
      <ToolsContainer>
        <InputLabel
          type={"radio"}
          id={"normal"}
          name={"type"}
          onChange={change}
        />
        <Label onClick={handleClik}>
          <Icon icon={faPencilAlt} />
        </Label>
        <InputLabel
          type={"radio"}
          id={"straightLine"}
          name={"type"}
          onChange={change}
        />
        <Label onClick={handleClik}>
          <Icon icon={faSlash} />
        </Label>
        <InputLabel
          type={"radio"}
          id={"circle"}
          name={"type"}
          onChange={change}
        />
        <Label onClick={handleClik}>
          <Icon icon={faCircle} />
        </Label>
        <InputLabel
          type={"radio"}
          id={"square"}
          name={"type"}
          onChange={change}
        />
        <Label onClick={handleClik}>
          <Icon icon={faSquare} />
        </Label>
        <InputLabel
          type={"radio"}
          id={"ellipse"}
          name={"type"}
          onChange={change}
        />
        <Label onClick={handleClik}>{ellipse}</Label>
        <InputLabel
          type={"radio"}
          id={"eraser"}
          name={"type"}
          onChange={change}
        />
        <Label onClick={handleClik}>
          <Icon icon={faEraser} />
        </Label>
        <InputLabel
          type={"radio"}
          id={"filled"}
          name={"type"}
          onChange={change}
        />
        <Label>
          <Icon icon={faFillDrip} />
          <BtnColor
            funcColor={getFillColor}
            dropper={dropper}
            moveColor={moveColor}
            type={"fill"}
          />
        </Label>
        <ColorButton>
          <Icon icon={faPalette} />
          <BtnColor
            funcColor={lineColor}
            dropper={dropper}
            moveColor={moveColor}
            type={"pencil"}
          />
        </ColorButton>
      </ToolsContainer>
      <Button onClick={clearAll}>Limpiar</Button>
      <Button style={{ height: "33px" }} onClick={downloadImg} download>
        <Icon icon={faSave} />
      </Button>
    </ButtonContainer>
  );
};

export default ButtomTools;
