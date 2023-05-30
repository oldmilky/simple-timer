import "./Projects.css";
import trash from "../../images/trash.svg";
import Timer from "../Timer/Timer";
import History from "../History/History";

function ProjectItem({ timer, title, update, remove, reset, history }) {
  return (
    <div className="projectitem__container">
      <div className="projectitem">
        <button className="projectitem__button">{title}</button>
        <img
          className="projectitem__icon"
          src={trash}
          alt="trash"
          onClick={() => remove(title)}
        />
      </div>
      <Timer
        timer={timer}
        title={title}
        update={update}
        reset={reset}
        remove={remove}
      />
      <History history={history} reset={reset} />
    </div>
  );
}

export default ProjectItem;
