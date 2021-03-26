import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Programs } from "./Programs";

export const Sidebar = (props: any) => {
  return (
    <aside id={props.sidebarStyle} className="sidebar">
      <div className="text-right" style={{ paddingRight: "10%" }}>
        <FontAwesomeIcon
          id="left-arrow"
          className="arrow"
          icon={faChevronLeft}
          size="3x"
          onClick={() => props.changeStyle()}
        />
      </div>
      <Programs
        selectedProgram={props.selectedProgram}
        setSelectedProgram={props.setSelectedProgram}
        selectedDay={props.selectedDay}
        setSelectedDay={props.setSelectedDay}
      />
    </aside>
  );
};
