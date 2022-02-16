import React, { useState, useEffect } from "react";
import {
  ImputLineContainer,
  ImputSizeLineContainer,
  LineCircle
} from "./ElementsDrawing";

const ComponenteInputRange = ({ lineWidth }) => {
  const [line, setLine] = useState(3);

  useEffect(() => {
    lineWidth(line);
  }, [line, lineWidth]);

  function getLineWidth({ target }) {
    setLine(target.value);
  }
  return (
    <ImputLineContainer>
      <ImputSizeLineContainer>
        <input
          type={"range"}
          onChange={getLineWidth}
          min={"1"}
          max={"30"}
          value={line}
        />
        <div style={{ left: `${(line - 1) * 13}px`, pointerEvents: "none" }}>
          {line}
        </div>
      </ImputSizeLineContainer>
      <LineCircle>
        <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30}>
          <circle cx={15} cy={15} r={line / 2} />
        </svg>
      </LineCircle>
    </ImputLineContainer>
  );
};

export default ComponenteInputRange;
