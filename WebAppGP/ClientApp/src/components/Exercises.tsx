import filter from "lodash/filter";
import { DeleteExerciseButton } from "./DeleteExerciseButton";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ExercisesState } from "../store/ExercisesReducer";
import { ApplicationState } from "../store/Index";
import { useForm } from "react-hook-form";
import { NewExerciseModal, EditExerciseModal } from "./Modals/ExerciseModal";

export const Exercises = (props: any) => {
  interface Exercise {
    id: number;
    name: string;
    setsAmount: number;
    day: number;
    program: number;
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data[0]);

  const allExercises = useSelector<
    ApplicationState,
    ExercisesState["exercises"]
  >((state) => state.exercises.exercises);

  const exercises = filter(
    allExercises,
    (exercise) => (exercise as Exercise).day === props.dayId
  );

  const showExercises = [] as any;

  exercises.map((exercise) => {
    const sets = [];
    for (let i = 0; i < (exercise as Exercise).setsAmount; i++)
      sets.push(
        <div key={i}>
          <Form.Label
            className="font-weight-bold"
            style={{
              lineHeight: "100%",
              fontSize: "1.5rem",
            }}
          >
            {i}:
          </Form.Label>
          <Form.Control
            style={{ minWidth: "20px", width: "80px", marginRight: "10px" }}
            defaultValue={0}
            type="number"
            name={i + "#" + (exercise as Exercise).name}
            ref={register}
          />
        </div>
      );

    showExercises.push(
      <>
        <Form.Group key={(exercise as Exercise).id}>
          <div className="d-flex justify-content-between">
            <Form.Label>{(exercise as Exercise).name}</Form.Label>
            <div className="d-flex">
              <EditExerciseModal exercise={exercise as Exercise} />
              <DeleteExerciseButton id={(exercise as Exercise).id} />
            </div>
          </div>
          <Form.Label>Weight:</Form.Label>
          <Form.Control
            ref={register}
            name={"Weight#" + (exercise as Exercise).name}
            type="number"
          />
          <Form.Label>Sets:</Form.Label>
          <Form.Row style={{ marginLeft: "2rem" }}>{sets}</Form.Row>
        </Form.Group>
        <hr style={{ borderBottom: "3px solid #2e0d15" }} />
      </>
    );
  });

  return (
    <>
      <NewExerciseModal
        exercise={{ name: "", day: props.dayId, program: props.programId }}
      />
      <div style={{ background: "rgba(255,255,255,0.4)", padding: "10px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {showExercises}
          <Button type="submit" className="mb-2">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};
