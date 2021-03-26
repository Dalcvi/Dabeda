import { useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { EditDayModal } from "./Modals/DayModal";

interface Day {
  id: number;
  name: string;
  program: number;
}

export const DayBar = (props: any) => {
  return (
    <>
      <Card.Header
        className="day-text d-flex align-items-center justify-content-between"
        onClick={() => {
          props.setSelectedDay((props.day as Day).id);
        }}
      >
        <span
          style={
            props.selectedDay === (props.day as Day).id ? { color: "red" } : {}
          }
        >
          {(props.day as Day).name}
        </span>
        <div onClick={(e: any) => e.stopPropagation()}>
          <EditDayModal day={props.day as Day} />
        </div>
      </Card.Header>
    </>
  );
};
