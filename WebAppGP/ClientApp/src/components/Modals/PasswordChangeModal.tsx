import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, Button, InputGroup, FormControl } from "react-bootstrap";

export const ChangePasswordModal = (props: any) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button
        onClick={handleShow}
        variant="light"
        style={{
          backgroundColor: "#f6f6e9",
          color: "#272727",
          padding: "5px 20px 5px 20px",
          marginTop: "40px",
          width: "100%",
        }}
      >
        Change password
      </Button>
      <PasswordModal show={show} handleClose={handleClose} />
    </div>
  );
};

const PasswordModal = ({ show, handleClose }: any) => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal autoFocus centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <InputGroup>
              <Form.Label>Current password:</Form.Label>
              <FormControl type="password" autoComplete="new-password" />
            </InputGroup>
            <InputGroup>
              <Form.Label>New password:</Form.Label>
              <FormControl type="password" autoComplete="new-password" />
            </InputGroup>
            <InputGroup>
              <Form.Label>Confirm new password:</Form.Label>
              <FormControl type="password" autoComplete="new-password" />
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
