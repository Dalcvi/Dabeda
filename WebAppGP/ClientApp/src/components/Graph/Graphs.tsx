import { useSelector } from "react-redux";
import { CompletedExercisesState } from "../../store/CompletedExercisesReducer";
import { ApplicationState } from "../../store/Index";
import { Line } from "react-chartjs-2";
import { Graph } from "./Graph";

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
  const exerciseIds = Object.keys(props.allExercises);
  const items = [] as any[];
  if (Object.keys(allCompletedExercises).length != 0) {
    exerciseIds.map((id) => {
      items.push(
        <div className="exercise-bar" style={{ padding: "10px" }}>
          <Graph completedExercises={allCompletedExercises[id]} />
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
