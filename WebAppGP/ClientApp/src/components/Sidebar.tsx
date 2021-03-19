import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ProgramsTest } from "./ProgramsTest";

export const Sidebar = (props: any) => {
  return (
    <div id={props.sidebarStyle} className="sidebar">
      <div className="text-right" style={{ paddingRight: "10%" }}>
        <FontAwesomeIcon
          className="arrow"
          icon={faChevronLeft}
          size="3x"
          onClick={() => props.changeStyle()}
        />
      </div>
      <ProgramsTest
        selectedProgram={props.selectedProgram}
        setSelectedProgram={props.setSelectedProgram}
        selectedDay={props.selectedDay}
        setSelectedDay={props.setSelectedDay}
      />
    </div>
  );
};
