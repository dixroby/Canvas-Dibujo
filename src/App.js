import React from "react";
import "./styles.css";
import "./Normalize.css";
import CanvasComponent from "./CanvasDeDibujo/CanvasComponent";

export default function App() {
  return (
    <>
      <h1 className={"title"}>
        <a
          className={"title"}
          href={"https://www.facebook.com/simonenrique.ramirezferrer"}
        >
          Simon Enrique Ramirez Ferer
        </a>
      </h1>
      <CanvasComponent />
    </>
  );
}
