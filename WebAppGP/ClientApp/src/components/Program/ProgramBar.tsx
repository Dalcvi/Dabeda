import { useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Days } from "./Days";
import { EditProgramModal } from "./Modals/ProgramModal";

interface Program {
  id: number;
  name: string;
}

export const ProgramBar = (props: any) => {
  return (
    <>
      <div>
        <Accordion.Toggle
          as={Card.Header}
          className="program-text"
          style={{ background: "#f6f6e9" }}
          onClick={() => {
            if (props.selectedProgram !== (props.program as Program).id)
              props.setSelectedProgram((props.program as Program).id);
            else {
              props.setSelectedProgram(0);
            }
          }}
          eventKey={(props.program as Program).id.toString()}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div
              style={{
                wordBreak: "break-all",
                maxWidth: "70%",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <span
                className="d-flex align-items-center"
                style={
                  props.selectedProgram === (props.program as Program).id
                    ? {
                        color: "red",
                      }
                    : {}
                }
              >
                {(props.program as Program).name}
              </span>
            </div>
            {props.selectedProgram === (props.program as Program).id && (
              <div style={{ paddingLeft: "5%" }}>
                <FontAwesomeIcon icon={faCaretDown} size="lg" />
              </div>
            )}
            <div onClick={(e: any) => e.stopPropagation()}>
              <EditProgramModal program={props.program as Program} />
            </div>
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={(props.program as Program).id.toString()}>
          <Card.Body>
            <Days
              program={(props.program as Program).id}
              selectedDay={props.selectedDay}
              setSelectedDay={props.setSelectedDay}
            />
          </Card.Body>
        </Accordion.Collapse>
      </div>
    </>
  );
};
