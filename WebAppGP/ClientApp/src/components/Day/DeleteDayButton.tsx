import { DeleteDay, DeleteExerciseByDay } from "../services/user";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

export const DeleteDayButton = (props: any) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        variant="danger"
        onClick={() => {
          DeleteDay(dispatch, props.id);
        }}
        value="Delete"
      >
        Delete
      </Button>
    </div>
  );
};
