import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { ApplicationState } from "../store/Index";
import { UserState } from "../store/User";
import { useSelector, useDispatch } from "react-redux";
import { PasswordChangeModal } from "./Modals/PasswordChangeModal";
import { EmailChangeModal } from "./Modals/EmailChangeModal";
import { ChangeUsername } from "../services/settings";

export const Settings = (props: any) => {
  const userName = useSelector<ApplicationState, UserState["username"]>(
    (state) => state.user.username
  );
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [usernameText, setUsernameText] = useState("");

  const Apply = () => {
    if (usernameText === username || usernameText === "") return;
    else {
      if (ChangeUsername(dispatch, { username: usernameText })) {
      }
    }
  };

  const SettingUsernames = () => {
    setUsername(userName);
    setUsernameText(userName);
  };

  if (username === "" && userName != "") {
    SettingUsernames();
  }
  return (
    <div
      style={{
        backgroundColor: "#272727",
        height: "88vh",
        padding: "5rem 20px 0 20px",
      }}
      className="d-flex flex-column align-items-center"
    >
      <div
        style={{ maxWidth: "425px", width: "100%" }}
        className="d-flex justify-content-between"
      >
        <div
          style={{
            borderRadius: "50%",
            width: "110px",
            height: "110px",
            backgroundColor: "red",
            marginBottom: "30px",
          }}
        />
        <div>
          <p
            style={{
              color: "#f6f6e9",
            }}
          >
            Change Username
          </p>
          <InputGroup className="mb-3">
            <FormControl
              style={{ color: "#272727" }}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={usernameText}
              onChange={(e) => setUsernameText(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      <div
        style={{ maxWidth: "425px", width: "100%" }}
        className="d-flex justify-content-between"
      >
        <Button
          variant="light"
          style={{
            backgroundColor: "#f6f6e9",
            color: "#272727",
            padding: "5px",
          }}
        >
          Change picture
        </Button>
        <Button
          variant="light"
          style={{
            backgroundColor: "#f6f6e9",
            color: "#272727",
            padding: "5px 20px 5px 20px",
          }}
          onClick={() => Apply()}
        >
          Apply
        </Button>
      </div>
      <div style={{ maxWidth: "425px", width: "100%" }}>
        <EmailChangeModal />
        <PasswordChangeModal />
      </div>
    </div>
  );
};

export default Settings;
