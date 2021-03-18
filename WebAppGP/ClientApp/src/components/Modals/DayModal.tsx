import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { AddDay, EditDay } from "../../services/user";

export const NewDayModal = (props: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button onClick={handleShow} className="btn btn-warning">
        Create
      </Button>
      <DayModal
        modalName="Create a new day"
        id={-1}
        day={props.day.name}
        program={props.day.program}
        handleFormSubmit={AddDay}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export const EditDayModal = (props: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ float: "right" }}>
      <Button onClick={handleShow} className="btn btn-success">
        Edit
      </Button>
      <DayModal
        modalName="Edit a day"
        id={props.day.id}
        day={props.day.name}
        program={props.day.program}
        handleFormSubmit={EditDay}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

const DayModal = ({
  modalName,
  id,
  day,
  program,
  handleFormSubmit,
  show,
  handleClose,
}: any) => {
  const [modalDay, setModalDay] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setModalDay(day);
  }, [day]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalName}</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            if (modalDay != "") {
              handleClose();
              handleFormSubmit(dispatch, id, modalDay, program).then(() => {
                if (day === "") setModalDay("");
              });
            }
          }}
        >
          <Modal.Body>
            <InputGroup>
              <FormControl
                value={modalDay}
                onChange={(event) => setModalDay(event.target.value)}
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
