import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, Button } from "react-bootstrap";
import { ChangeEmail } from "../../services/settings";

export const EmailChangeModal = (props: any) => {
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
        Change email
      </Button>
      <EmailModal show={show} handleClose={handleClose} />
    </div>
  );
};

const EmailModal = ({ show, handleClose }: any) => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (password === "" || newEmail === "") return;
    else {
      ChangeEmail({ currentPassword: password, email: newEmail }).then(
        (status: number) => {
          if (status >= 400 && status < 500)
            setErrorMessage("Wrong password, please try again");
          else if (status >= 500)
            setErrorMessage("Server is offline, please try again");
          else {
            handleClose();
          }
        }
      );
    }
  };

  const Clear = () => {
    setPassword("");
    setNewEmail("");
  };

  return (
    <>
      <Modal autoFocus centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Email</Modal.Title>
        </Modal.Header>
        {errorMessage && (
          <p className="text-center text-danger">{errorMessage}</p>
        )}
        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>New Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
                placeholder="New email"
                autoComplete="new-password"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <br />
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                autoComplete="new-password"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                Clear();
                handleClose();
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={(e) => onSubmit(e)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
