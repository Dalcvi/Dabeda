import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { AddProgram, EditProgram } from "../../services/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { DeleteProgramButton } from "../DeleteProgramButton";

export const NewProgramModal = (props: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <span onClick={handleShow}>
        <div className="d-flex align-items-center justify-content-between">
          Create Program
          <FontAwesomeIcon icon={faPlusSquare} size="lg" />
        </div>
      </span>
      <ProgramModal
        modalName="Create a new program"
        id={-1}
        program={props.program.name}
        days={[] as []}
        handleFormSubmit={AddProgram}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export const EditProgramModal = (props: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (e: any) => {
    setShow(true);
    e.stopPropagation();
  };

  return (
    <div style={{ float: "right" }}>
      <span onClick={handleShow}>
        <FontAwesomeIcon icon={faCog} size="lg" />
      </span>
      <ProgramModal
        modalName="Edit a program"
        id={props.program.id}
        program={props.program.name}
        days={props.program.days}
        handleFormSubmit={EditProgram}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

const ProgramModal = ({
  modalName,
  id,
  program,
  days,
  handleFormSubmit,
  show,
  handleClose,
}: any) => {
  const [modalProgram, setModalProgram] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setModalProgram(program);
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalName}</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            if (modalProgram != "") {
              handleClose();
              handleFormSubmit(dispatch, id, modalProgram).then(() => {
                if (program === "") setModalProgram("");
              });
            }
          }}
        >
          <Modal.Body>
            <InputGroup>
              <FormControl
                value={modalProgram}
                onChange={(event) => setModalProgram(event.target.value)}
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
                <DeleteProgramButton id={id} />
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
