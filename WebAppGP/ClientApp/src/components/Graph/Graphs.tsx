import { useSelector } from "react-redux";
import { CompletedExercisesState } from "../../store/CompletedExercisesReducer";
import { ApplicationState } from "../../store";
import { Line } from "react-chartjs-2";
import { Graph } from "./Graph";
import filter from "lodash/filter";
import mapValues from "lodash/mapValues";

interface completedExercise {
  id: number;
  exerciseId: number;
  name: string;
  weight: number;
  reps: Array<Number>;
  date: string;
}

export const Graphs = (props: any) => {
  const allCompletedExercises: { [key: string]: any } = useSelector<
    ApplicationState,
    CompletedExercisesState["completedExercises"]
  >((state) => state.completedExercises.completedExercises);
  const okay = Object.values(allCompletedExercises);
  console.log(allCompletedExercises);
  const exercisesByDay = mapValues(
    filter(props.allExercises, { day: props.selectedDay }),
    (n) => {
      return { id: n["id"], name: n["name"] };
    }
  );

  const exerciseIds = Object.values(exercisesByDay);
  console.log(exerciseIds);
  const items = [] as any[];
  if (Object.keys(allCompletedExercises).length != 0) {
    exerciseIds.map((exercise) => {
      items.push(
        <div className="exercise-bar" style={{ padding: "10px" }}>
          <h4 className="text-center">{exercise["name"]}</h4>
          <Graph completedExercises={allCompletedExercises[exercise["id"]]} />
        </div>
      );
    });
  }

  return (
    <div>
      <div
        className="d-flex flex-column align-items-center"
        style={{ width: "100%" }}
      >
        {items}
      </div>
    </div>
  );
};
