import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { AddProgram, EditProgram } from "../../services/user";

export const NewProgramModal = (props: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button onClick={handleShow} className="btn btn-warning">
        Add
      </Button>
      <ProgramModal
        modalName="Create a new program"
        id={-1}
        program={props.program.programName}
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
  const handleShow = () => setShow(true);

  return (
    <div style={{ float: "right" }}>
      <Button onClick={handleShow} className="btn btn-success">
        Edit
      </Button>
      <ProgramModal
        modalName="Edit a program"
        id={props.program.id}
        program={props.program.programName}
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
              handleFormSubmit(dispatch, id, modalProgram, days).then(() => {
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
