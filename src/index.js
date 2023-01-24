import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Rect, Text } from "react-konva";
let history = [{ x: 100, y: 100 }];

let historyIndex = 0;
function App() {
  let [present, setPresent] = useState(history[0]);

  const handleUndo = () => {
    if (historyIndex === 0) {
      return;
    }
    historyIndex -= 1;
    const previous = history[historyIndex];
    setPresent(previous);
  };

  const handleRedo = () => {
    if (historyIndex === history.length - 1) {
      return;
    }
    historyIndex += 1;
    const next = history[historyIndex];
    setPresent(next);
  };

  const handleDragEnd = e => {
    history = history.slice(0, historyIndex + 1);
    console.log("history", history);

    const position = {
      x: e.target.x(),
      y: e.target.y()
    };
    console.log("e", e);
    history = history.concat([position]);
    historyIndex += 1;
    setPresent(position);
  };

  return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="undo" onClick={handleUndo} />
          <Text text="redo" x={40} onClick={handleRedo} />
          <Text text={historyIndex} x={80}/>
          <Rect
              x={present.x}
              y={present.y}
              width={50}
              height={50}
              fill="black"
              draggable
              onDragEnd={handleDragEnd}
          />
        </Layer>
      </Stage>
  );
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

