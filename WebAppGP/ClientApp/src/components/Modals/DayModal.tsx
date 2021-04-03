import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { AddDay, EditDay } from "../../services/user";
import { DeleteDayButton } from "../Day/DeleteDayButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

export const NewDayModal = (props: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <span onClick={handleShow}>
        <div className="d-flex align-items-center justify-content-between">
          Create Day
          <FontAwesomeIcon icon={faPlusSquare} size="lg" />
        </div>
      </span>
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
  const handleShow = (e: any) => {
    setShow(true);
    e.stopPropagation();
  };

  return (
    <div>
      <span onClick={handleShow}>
        <FontAwesomeIcon icon={faCog} size="lg" />
      </span>
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
      <Modal centered show={show} onHide={handleClose}>
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
          <Modal.Footer
            className={
              id !== -1
                ? "d-flex align-items-center justify-content-between"
                : ""
            }
          >
            {id !== -1 && (
              <div onClick={handleClose}>
                <DeleteDayButton id={id} />
              </div>
            )}
            <div>
              <Button
                style={{ marginRight: "10px" }}
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
