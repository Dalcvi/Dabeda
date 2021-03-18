import filter from "lodash/filter";
import toArray from "lodash/toArray";
import { NewDayModal, EditDayModal } from "./Modals/DayModal";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DaysState } from "../store/DaysReducer";
import { ApplicationState } from "../store/Index";
import { DeleteDayButton } from "./DeleteDayButton";
import { Exercises } from "./Exercises";

interface Day {
  id: number;
  name: string;
  program: number;
}

export const Days = (props: any) => {
  if (props.programId == -1) {
    return <div>Nothing to see here</div>;
  } else {
    const [selectedDayId, setSelectedDayId] = useState(-1);
    const [selectedDayObject, setSelectedDayObject] = useState({} as Day);

    const allDays = useSelector<ApplicationState, DaysState["days"]>(
      (state) => state.days.days
    );
    const daysArray = filter(allDays, (day) => {
      return (day as Day).program === props.programId;
    });

    const hasDays = daysArray.length > 0;
    if (selectedDayId == -1 && hasDays) {
      setSelectedDayId((daysArray[0] as Day).id);
      setSelectedDayObject(daysArray[0] as Day);
    }

    if (selectedDayId != -1 && daysArray.length == 0) {
      setSelectedDayId(-1);
      setSelectedDayObject({} as Day);
    }

    if (
      !allDays.hasOwnProperty(selectedDayId.toString()) &&
      selectedDayId != -1
    ) {
      setSelectedDayId(-1);
      setSelectedDayObject({} as Day);
    }
    return (
      <>
        <div
          style={{
            padding: "10px",
            background: "rgba(255,255,255,0.4)",
            borderRadius: "7px",
          }}
        >
          <h2>Select:</h2>
          <NewDayModal day={{ name: "", program: props.programId }} />
          <div className="d-flex justify-content-between">
            <Dropdown>
              <Dropdown.Toggle
                style={{ width: "600%" }}
                className="d-flex justify-content-between align-items-center"
                variant="light"
                id="dropdown-basic"
              >
                <span>
                  {hasDays ? (selectedDayObject as Day).name : "No days"}
                </span>
              </Dropdown.Toggle>
              {hasDays ? (
                <Dropdown.Menu>
                  {daysArray.map((day) => {
                    if (
                      (day as Day).id === (selectedDayObject as Day).id &&
                      (day as Day).name !== (selectedDayObject as Day).name
                    ) {
                      (selectedDayObject as Day).name = (day as Day).name;
                    }

                    return (
                      <Dropdown.Item
                        key={(day as Day).id}
                        onClick={() => {
                          setSelectedDayId((day as Day).id);
                          setSelectedDayObject(day as Day);
                        }}
                      >
                        <span style={{ fontSize: "1.4em" }}>
                          {(day as Day).name}
                        </span>
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              ) : (
                <Dropdown.Menu>
                  <Dropdown.Item active={false}>No days</Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
            <div className="d-flex">
              {selectedDayObject != ({} as Day) && (
                <>
                  <EditDayModal day={selectedDayObject} />
                  <DeleteDayButton id={selectedDayId} />
                </>
              )}
            </div>
          </div>
        </div>
        <h1 className="text-center">
          Selected day: {(selectedDayObject as Day).name}
        </h1>
        <Exercises dayId={selectedDayId} programId={props.programId} />
      </>
    );
  }
};
