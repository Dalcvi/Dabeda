import filter from "lodash/filter";
import { DeleteExerciseButton } from "./DeleteExerciseButton";
import { NewExerciseModal } from "../Modals/ExerciseModal";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ExercisesState } from "../../store/ExercisesReducer";
import { ApplicationState } from "../../store/Index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ExerciseBar } from "./ExerciseBar";

interface Exercise {
  id: number;
  name: string;
  setsAmount: number;
  day: number;
  program: number;
}

export const Exercises = (props: any) => {
  const allExercises = useSelector<
    ApplicationState,
    ExercisesState["exercises"]
  >((state) => state.exercises.exercises);

  const exercises = filter(
    allExercises,
    (exercise) => (exercise as Exercise).day === props.selectedDay
  );

  const items = [] as any;

  exercises.map((exercise) => {
    items.push(<ExerciseBar exercise={exercise as Exercise} />);
  });

  items.push(
    <NewExerciseModal
      exercise={{
        name: "",
        day: props.selectedDay,
        program: props.selectedProgram,
      }}
    />
  );

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
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "100%" }}
      >
        {items}
      </div>
    </div>
  );
};
