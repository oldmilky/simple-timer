import React, { useState } from "react";
import "./Projects.css";
import AddProjectPopup from "../AddProjectPopup/AddProjectPopup";
import ProjectItem from "./ProjectItem";
import { omit } from "../../utils/omit";

function Projects() {
  const [popupActive, setPopupActive] = useState(false);

  const [projects, setProjects] = useState(() => {
    try {
      const projects = localStorage.getItem("projects");
      return projects ? JSON.parse(projects) : {};
    } catch (e) {
      console.log("localStorage error", e);
    }
  });

  const getCurrentDate = () => {
    return `${new Date().getUTCDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
  };

  const addProject = (title) => {
    const date = getCurrentDate();
    const newProjects = {
      ...projects,
      [title]: projects[title]
        ? projects[title][date]
          ? projects[title][date]
          : { [date]: 0 }
        : { [date]: 0 },
    };
    setProjects(newProjects);
    setPopupActive(false);
    localStorage.setItem("projects", JSON.stringify(newProjects));
  };

  const updateProject = (title) => {
    const date = getCurrentDate();
    const updatedProject = {
      ...projects,
      [title]: {
        [date]: projects[title][date]++,
      },
    };
    setProjects(updatedProject);
    localStorage.setItem("projects", JSON.stringify(updatedProject));
  };

  const removeProject = (id) => {
    const newProjects = omit(projects, id);
    setProjects(newProjects);
    localStorage.setItem("projects", JSON.stringify(newProjects));
  };

  const resetProject = (title) => {
    const updatedProject = {
      ...projects,
      [title]: { [getCurrentDate()]: 0 },
    };
    setProjects(updatedProject);
    localStorage.setItem("projects", JSON.stringify(updatedProject));
  };

  return (
    <>
      <div className="projects">
        <div className="projects__container">
          <button
            className="projects__add"
            onClick={() => setPopupActive(true)}
          >
            + Project
          </button>
          <div className="projects__wrapper">
            {Object.keys(projects).length !== 0 &&
              Object.entries(projects).map(([title, project]) => (
                <ProjectItem
                  key={title}
                  title={title}
                  timer={project[getCurrentDate()]}
                  reset={resetProject}
                  update={updateProject}
                  remove={removeProject}
                  history={project}
                />
              ))}
          </div>
        </div>
      </div>
      {popupActive && (
        <AddProjectPopup
          show={popupActive}
          onClickOutside={() => {
            setPopupActive(false);
          }}
          addProject={addProject}
        />
      )}
    </>
  );
}

export default Projects;
