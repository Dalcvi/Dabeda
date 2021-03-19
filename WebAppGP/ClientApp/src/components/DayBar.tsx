import { useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface Day {
  id: number;
  name: string;
  program: number;
}

export const DayBar = (props: any) => {
  return (
    <>
      <Card.Header
        className="day-text"
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
      </Card.Header>
    </>
  );
};
