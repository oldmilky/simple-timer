import React, { useState, useRef, useEffect } from "react";
import "./Popup.css";

function AddProjectPopup({ onClickOutside, addProject, show }) {
  const [title, setTitle] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  if (!show) return null;

  return (
    <div className="popup">
      <div className="popup__content" ref={ref}>
        <p className="popup__title">Project name</p>
        <div className="popup__wrapper">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            onKeyDown={(e) => e.key === "Enter" && addProject(title)}
            className="popup__input"
            placeholder="Name"
          />
        </div>
        <button className="popup__add_button" onClick={() => addProject(title)}>
          Create
        </button>
      </div>
    </div>
  );
}

export default AddProjectPopup;
