import {
  DeleteProgram,
  DeleteDayByProgram,
  DeleteExerciseByProgram,
} from "../services/user";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

export const DeleteProgramButton = (props: any) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Button
        variant="danger"
        onClick={() => {
          DeleteProgram(dispatch, props.id);
          DeleteDayByProgram(dispatch, props.id);
          DeleteExerciseByProgram(dispatch, props.id);
        }}
        value="Delete"
      >
        Delete
      </Button>
    </div>
  );
};
