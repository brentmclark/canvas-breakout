import React, { useLayoutEffect, useEffect } from "react";
import "./styles.css";
import drawLoop from "./drawLoop";

export default function App() {
  const gameCanvas = React.useRef(null);
  const [ctx, setCtx] = React.useState(null);
  const [didLose, setDidLose] = React.useState(false);
  const [didWin, setDidWin] = React.useState(false);

  useLayoutEffect(() => {
    setCtx(gameCanvas.current.getContext("2d"));
  }, []);

  useEffect(() => {
    if (!ctx) {
      return;
    }
    const canvas = gameCanvas.current;

    drawLoop({
      canvas,
      ctx,
      onLose: () => setDidLose(true),
      onWin: () => setDidWin(true)
    });
  }, [ctx]);

  return (
    <div className="App">
      <h1>Breakout!</h1>
      <p>Break all of the bricks to win the game.</p>
      <p>You have three chances to win.</p>
      <canvas ref={gameCanvas} width="480" height="320" />
      {didLose && (
        <div>
          <h4>Awwww, you lost.</h4>
          <button
            type="button"
            onClick={e => {
              document.location.reload();
            }}
          >
            Start Over?
          </button>
        </div>
      )}
      {didWin && (
        <div>
          <h4>Congratulations, you won!!!</h4>
          <button
            type="button"
            onClick={e => {
              document.location.reload();
            }}
          >
            Start Over?
          </button>
        </div>
      )}
    </div>
  );
}
