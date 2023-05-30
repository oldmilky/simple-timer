import { useState } from "react";
import "./History.css";
import historyLogo from "../../images/history.svg";
import { formatTime } from "../../utils/utils";

function History({ history }) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="history">
      <button
        className="history__button_show"
        onClick={() => setShowHistory(!showHistory)}
      >
        <img className="timer__logo" src={historyLogo} alt="history" />
        {showHistory ? "Hide History" : "Show History"}
      </button>
      {showHistory && (
        <ul className="history__table">
          {Object.entries(history).map(([date, seconds]) => (
            <li className="history__table_element" key={date}>
              {date} : {formatTime(seconds)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
