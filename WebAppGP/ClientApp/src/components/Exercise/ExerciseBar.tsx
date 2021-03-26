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
  const [reps, setReps] = useState(0);
  const sets = [] as any;
  for (let i = 0; i < (props.exercise as Exercise).setsAmount; i++) {
    sets.push(
      // <label className="d-flex flex-column" style={{ width: "95%" }}>
      //   Set {i + 1}:
      <input
        style={{ width: "19%", margin: "5px 2px" }}
        className="form-control"
        type="number"
        value={reps}
        onChange={(event) => {
          setReps(Number(event.target.value));
          if (
            event.target.value.length > 1 &&
            event.target.value[0] === "0" &&
            event.target.value[1] !== "."
          ) {
            event.target.value = event.target.value.substring(
              1,
              event.target.value.length
            );
          }
        }}
      />
      // </label>
    );
  }
  return (
    <div
      className="exercise-bar d-flex flex-column align-items-center"
      style={{ padding: "0 2% 0 2%" }}
    >
      <span style={{ fontSize: "1.5em" }}>
        {(props.exercise as Exercise).name}
      </span>
      <label
        className="d-flex flex-column"
        style={{ width: "100%", margin: "0 5px 0 5px", fontSize: "1.3em" }}
      >
        Weight:
        <input className="form-control" type="number" value="0" />
      </label>
      <label style={{ fontSize: "1.3em" }}>
        Sets:
        <div className="d-flex flex-wrap">{sets}</div>
      </label>
    </div>
  );
};
