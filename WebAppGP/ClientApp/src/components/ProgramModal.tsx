import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { AddProgram } from "../services/user";

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
        program={props.program}
        handleFormSubmit={AddProgram}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

// export const EditProgramModal = (program: {}) => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <div>
//       <Button onClick={handleShow} className="btn btn-success">
//         Edit
//       </Button>
//       <ProgramModal
//         program={program}
//         handleFormSubmit={}
//         show={show}
//         handleClose={handleClose}
//       />
//     </div>
//   );
// };

const ProgramModal = ({
  program,
  handleFormSubmit,
  show,
  handleClose,
}: any) => {
  const [modalProgram, setModalProgram] = useState(program.programName);
  const dispatch = useDispatch();

  useEffect(() => {
    setModalProgram(program.programName);
  }, [program.programName]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header translate closeButton>
          <Modal.Title>Small Modal</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            handleFormSubmit(dispatch, modalProgram).then(() =>
              setModalProgram("")
            );
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
            <Button type="submit" variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
