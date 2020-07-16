import React from "react";

interface Props {

  score: number,
  playAgain: () => void
}

const Result: React.FC<Props> = ({score, playAgain}) => (
  <div className="score-board">
    <div className="score">You scored {score} / 5 correct answers!</div>
    <button className="playBtn" onClick={playAgain}>
      Play again!
    </button>
  </div>
);

export default Result;
