import { DeleteExercise } from "../services/user";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

export const DeleteExerciseButton = (props: any) => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginLeft: "1em" }}>
      <Button
        variant="danger"
        onClick={() => {
          DeleteExercise(dispatch, props.id);
        }}
        value="Delete"
      >
        Delete
      </Button>
    </div>
  );
};
