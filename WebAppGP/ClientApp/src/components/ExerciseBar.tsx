import { useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface Exercise {
  id: number;
  name: string;
  setsAmount: number;
  day: number;
  program: number;
}

export const ExerciseBar = (props: any) => {
  const sets = [] as any;
  for (let i = 0; i < (props.exercise as Exercise).setsAmount; i++) {
    sets.push(
      <label className="d-flex flex-column" style={{ width: "95%" }}>
        Set {i + 1}:
        <input className="form-control" type="number" value="0" />
      </label>
    );
  }
  return (
    <div className="exercise-bar d-flex flex-column align-items-center">
      <span style={{ fontSize: "1.5em" }}>
        {(props.exercise as Exercise).name}
      </span>
      <label className="d-flex flex-column" style={{ width: "95%" }}>
        Weight:
        <input className="form-control" type="number" value="0" />
      </label>
      {sets}
    </div>
  );
};
