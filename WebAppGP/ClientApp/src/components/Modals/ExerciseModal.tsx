import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { AddExercise, EditExercise } from "../../services/user";

export const NewExerciseModal = (props: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button onClick={handleShow} className="btn btn-warning">
        Create
      </Button>
      <ExerciseModal
        modalName="Create a new exercise"
        id={-1}
        exercise={props.exercise.exerciseName}
        setsAmount={0}
        dayId={props.exercise.dayId}
        handleFormSubmit={AddExercise}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export const EditExerciseModal = (props: any) => {
  console.log(props.exercise);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ float: "right" }}>
      <Button onClick={handleShow} className="btn btn-success">
        Edit
      </Button>
      <ExerciseModal
        modalName="Edit a exercise"
        id={props.exercise.id}
        exercise={props.exercise.exerciseName}
        setsAmount={props.exercise.setsAmount}
        dayId={props.exercise.dayId}
        handleFormSubmit={EditExercise}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

const ExerciseModal = ({
  modalName,
  id,
  exercise,
  setsAmount,
  dayId,
  handleFormSubmit,
  show,
  handleClose,
}: any) => {
  const [modalExercise, setModalExercise] = useState("");
  const [amountOfSets, setAmountOfSets] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setModalExercise(exercise);
    setAmountOfSets(setsAmount as number);
  }, [exercise]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalName}</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            if (modalExercise != "") {
              handleClose();
              handleFormSubmit(
                dispatch,
                id,
                modalExercise,
                amountOfSets,
                dayId
              ).then(() => {
                if (exercise === "") setModalExercise("");
              });
            }
          }}
        >
          <Modal.Body>
            <InputGroup>
              <FormControl
                value={modalExercise}
                onChange={(event) => setModalExercise(event.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Form.Label>Sets:</Form.Label>
              <FormControl
                type="number"
                value={amountOfSets}
                onChange={(event) => {
                  setAmountOfSets(Math.floor(parseInt(event.target.value, 10)));
                }}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
