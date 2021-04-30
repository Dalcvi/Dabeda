import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store/Index";
import { Exercises } from "../Exercise/Exercises";
import { Graphs } from "../Graph/Graphs";
import { ExercisesState } from "../../store/ExercisesReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";

export const ShowDay = (props: any) => {
  const [showExercises, setShowExercises] = useState(true);

  const allExercises = useSelector<
    ApplicationState,
    ExercisesState["exercises"]
  >((state) => state.exercises.exercises);

  return (
    <div id="exercises">
      <FontAwesomeIcon
        id="right-side-ar"
        className={
          !props.fullSidebar
            ? "right-side-arrow arrow"
            : "right-side-arrow-hide arrow"
        }
        icon={faChevronRight}
        size="3x"
        onClick={!props.fullSidebar && props.changeStyle}
      />
      {props.selectedDay != 0 && (
        <>
          <Row className="d-flex justify-content-center">
            <div
              className="d-flex justify-content-around"
              style={{
                width: "50%",
                color: "white",
                marginTop: "2rem",
                fontSize: "1.2rem",
              }}
            >
              <p
                onClick={() => {
                  if (!showExercises) setShowExercises(true);
                }}
                style={showExercises ? { borderBottom: "1px solid red" } : {}}
              >
                Exercises
              </p>
              <p
                onClick={() => {
                  if (showExercises) setShowExercises(false);
                }}
                style={!showExercises ? { borderBottom: "1px solid red" } : {}}
              >
                Graphs
              </p>
            </div>
          </Row>
          {showExercises ? (
            <Exercises
              allExercises={allExercises}
              fullSidebar={props.fullSidebar}
              changeStyle={props.changeStyle}
              selectedDay={props.selectedDay}
              selectedProgram={props.selectedProgram}
            />
          ) : (
            <Graphs allExercises={allExercises} />
          )}
        </>
      )}
    </div>
  );
};

export default ShowDay;
