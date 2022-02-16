import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//-------------------------------------------
const Container = styled.div`
  font-family: sans-serif;
  border-radius: 5px;
  user-select: none;
  background: white;
  position: relative;
  padding: 10px 10px 10px 0;
  display: grid;
  margin-top: 20px;
  justify-items: center;
  grid-template-columns: 134px auto;
  grid-template-rows: 30px 40px auto;

  grid-template-areas:
    "her  sizes"
    "her  rotater"
    "her  canva";
`;
//--------------------------------------
const CanvasContainer = styled.div`
  grid-area: canva;
  position: relative;
  margin: auto;
  border: 1px solid;
  margin: auto;
`;

const Canvas1 = styled.canvas`
  position: relative;
  z-index: 5;
`;

const Canvas2 = styled.canvas`
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 7;
  touch-action: none;
`;
//--------------------------------------
const ButtonContainer = styled.div`
  grid-area: her;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 60px 10px 10px;
  align-self: start;
  justify-content: center;
  align-items: center;
`;

const ToolsContainer = styled.div`
  border-bottom: 5px solid;
  border-right: 5px solid;
  border-radius: 4px;
`;

const Button = styled.a`
  height: 25px;
  line-height: 24px;
  text-decoration: none;
  cursor: pointer;
  background: rgba(55, 55, 55, 1);
  padding: 1px 5px;
  color: white;
  margin: 5px 0 0 0;
  font-size: 17px;
  border-radius: 4px;
  &:hover {
    background: rgba(30, 100, 50, 0.8);
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 2em;
  pointer-events: none;
`;

const Label = styled.label`
  height: 30px;
  width: 34px;
  position: relative;
  cursor: pointer;
  border: 5px solid;
  border-color: transparent;
  margin: 2px;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #daf7a6;
  }
`;

const InputLabel = styled.input`
  display: none;

  &:checked + ${Label} {
    border-color: gray;
  }
`;
//--------------------------------------
const ImputLineContainer = styled.div`
  touch-action: none;
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 497px;
  transform: rotate(90deg);
  position: absolute;
  left: -145.5px;
  top: 233px;
  border: 1px solid;
  border-radius: 3px;
`;

const ImputSizeLineContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  div {
    pointer-events: none;
    text-align: center;
    line-height: 30px;
    color: white;
    position: absolute;
    width: 30px;
    height: 30px;
    background: #4479bd;
    border-radius: 50%;
    top: 10.5px;
    transform: rotate(-90deg);
  }
  input {
    flex: 3;
    margin-left: 10px;
    margin-top: 2px;
  }
`;
const LineCircle = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
//--------------------------------------
const InputSizeCanvas = styled.div`
  grid-area: sizes;
  width: 100%;
  min-width: 300px;
  height: 100%;
  background: black;
  display: flex;
  overflow: hidden;
  border-radius: 3px;
  label {
    display: block;
    background: white;
    width: 25%;
    height: 92%;
    border: 1px solid;
    line-height: 29px;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    opacity: 1;
    height: 30px;
  }
  input {
    width: 25%;
    height: 81%;
    font-size: 15px;
    font-weight: 600;
    line-height: 25px;
    outline: none;
    text-align: center;
  }
`;
//--------------------------------------
const InputRotateContainer = styled.div`
  position: relative;
  grid-area: rotater;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  label {
    font-size: 20px;
    font-weight: 800;
    align-items: center;
    display: none;
  }
  input {
    margin-left: 10px;
  }
`;
//--------------------------------------
const ComponetColorContainer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const PickerContainer = styled.div`
  position: absolute;
  z-index: 50;
  top: -270px;
  cursor: crosshair;
`;

const ColorButton = styled.div`
  height: 30px;
  width: 34px;
  margin: 2px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  touch-action: none;
  position: relative;
  border: 5px solid;
  border-color: transparent;
  cursor: pointer;

  &:hover {
    background: #daf7a6;
  }
`;
//----------------------------------------
const ArrowsContainer = styled.div`
  left: 0;
  top: 0;
  position: absolute;
  pointer-events: none;
  display: none;
  touch-action: none;
`;
const Arrows = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  background: white;
  width: auto;
  height: auto;
  z-index: 20;
  border: 1px solid;
  border-radius: 12px;
  cursor: pointer;
  pointer-events: auto;
`;
const Arrow = styled(FontAwesomeIcon)`
  font-size: 20px;
  pointer-events: none;
`;
//----------------------------------------
const EditButtom = styled.button`
  width: 70px;
  height: 24px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-35px);
  display: none;
`;
//--------------------------------------
const ContainerToolsColor = styled.div`
  width: 100%;
  height: 30px;
  background: white;
  position: absolute;
  top: 242px;
  left: 0px;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 2px, rgb(0 0 0 / 30%) 0px 4px 8px;
`;
const IconToolColor = styled.div`
  position: absolute;
  left: 195px;
  top: 6px;
  cursor: pointer;
`;
const InputFixeColor = styled.input`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 5px;
  left: 125px;
`;
const LabelFixeColor = styled.label`
  position: absolute;
  top: 5px;
  left: 75px;
`;
//-----------------------------------
export {
  InputRotateContainer,
  Container,
  InputSizeCanvas,
  CanvasContainer,
  Canvas1,
  Canvas2,
  ButtonContainer,
  Button,
  Label,
  InputLabel,
  ColorButton,
  ImputLineContainer,
  ImputSizeLineContainer,
  LineCircle,
  Icon,
  ToolsContainer,
  ComponetColorContainer,
  PickerContainer,
  IconToolColor,
  Arrows,
  Arrow,
  EditButtom,
  ArrowsContainer,
  ContainerToolsColor,
  InputFixeColor,
  LabelFixeColor
};
