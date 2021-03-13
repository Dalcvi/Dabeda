import { DeleteDay, DeleteExerciseByDay } from "../services/user";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

export const DeleteDayButton = (props: any) => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginLeft: "1em" }}>
      <Button
        variant="danger"
        onClick={() => {
          DeleteDay(dispatch, props.id);
          DeleteExerciseByDay(dispatch, props.id);
        }}
        value="Delete"
      >
        Delete
      </Button>
    </div>
  );
};
