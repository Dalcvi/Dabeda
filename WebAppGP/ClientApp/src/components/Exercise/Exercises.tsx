import filter from "lodash/filter";
import { NewExerciseModal } from "../Modals/ExerciseModal";
import { Button } from "react-bootstrap";
import toArray from "lodash/toArray";
import { useSelector, useDispatch } from "react-redux";
import { CompletedExercisesState } from "../../store/CompletedExercisesReducer";
import { ApplicationState } from "../../store/Index";
import { ExerciseBar } from "./ExerciseBar";
import { SendCompletedExercises } from "../../services/user";

interface Exercise {
  id: number;
  name: string;
  setsAmount: number;
  day: number;
  program: number;
}

export const Exercises = (props: any) => {
  const dispatch = useDispatch();

  const answer = { doneExercises: {} };

  const exercises = filter(
    props.allExercises,
    (exercise) => (exercise as Exercise).day === props.selectedDay
  );
  const items = [] as any;

  if (props.selectedDay != 0)
    exercises.map((exercise) => {
      items.push(
        <ExerciseBar exercise={exercise as Exercise} answer={answer} />
      );
    });
  return (
    <div>
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "100%" }}
      >
        {items}
        <NewExerciseModal
          exercise={{
            name: "",
            day: props.selectedDay,
            program: props.selectedProgram,
          }}
        />
      </div>
      <Button
        onClick={() => sendCompletedExercises(dispatch, answer.doneExercises)}
      >
        CLICK ME!
      </Button>
    </div>
  );
};

const sendCompletedExercises = (dispatch: any, doneExercises: {}) => {
  const completedExercises = toArray(doneExercises);
  const date = new Date(
    2021,
    4,
    Math.floor(Math.random() * 30)
  ).toLocaleDateString();
  for (let i = 0; i < completedExercises.length; i++) {
    completedExercises[i] = {
      ...(completedExercises[i] as {}),
      ["date"]: date,
    };
  }
  SendCompletedExercises(dispatch, completedExercises as []);
};
