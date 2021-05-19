import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, Button } from "react-bootstrap";
import { ChangePassword } from "../../services/settings";

export const PasswordChangeModal = (props: any) => {
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

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [notMatchingPassword, setNotMatchingPassword] = useState(false);
  const [strongPassword, setStrongPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      CheckIfStrongPassword();
      CheckIfPasswordMatches();
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [newPassword]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      CheckIfPasswordMatches();
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [confPassword]);

  const CheckIfPasswordMatches = () => {
    if (newPassword == "" || confPassword == "") {
      setNotMatchingPassword(false);
    } else {
      if (newPassword != confPassword) setNotMatchingPassword(true);
      else setNotMatchingPassword(false);
    }
  };

  const CheckIfStrongPassword = () => {
    if (newPassword == "" || passwordRegex.test(newPassword)) {
      setStrongPassword(true);
    } else {
      setStrongPassword(false);
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (notMatchingPassword || !strongPassword || password === "") return;
    else {
      ChangePassword({
        currentPassword: password,
        newPassword: newPassword,
        confirmedPassword: confPassword,
      }).then((status: number) => {
        if (status >= 400 && status < 500)
          setErrorMessage("Wrong password, please try again");
        else if (status >= 500)
          setErrorMessage("Server is offline, please try again");
        else {
          Clear();
          handleClose();
        }
      });
    }
  };

  const Clear = () => {
    setPassword("");
    setNewPassword("");
    setConfPassword("");
    setNotMatchingPassword(false);
    setStrongPassword(true);
  };

  return (
    <>
      <Modal autoFocus centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        {errorMessage && (
          <p className="text-center text-danger">{errorMessage}</p>
        )}
        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Current password:</Form.Label>
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
            <Form.Group>
              <Form.Label>New password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="New password"
                autoComplete="new-password"
                isInvalid={notMatchingPassword || !strongPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                {!strongPassword &&
                  `Password must contain at least 8 characters, with one uppercase letter,
            one lowercase letter and one number`}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm new password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={confPassword}
                onChange={(event) => setConfPassword(event.target.value)}
                placeholder="Confirm password"
                autoComplete="new-password"
                isInvalid={notMatchingPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                Password doesn't match
              </Form.Control.Feedback>
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
