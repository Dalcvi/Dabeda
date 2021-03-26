import { useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { NewDayModal } from "../Modals/DayModal";

interface Day {
  id: number;
  name: string;
  program: number;
}
export const AddDay = (props: any) => {
  return (
    <>
      <div>
        <Card.Header className="day-text">
          <NewDayModal day={{ name: "", program: props.program }} />
        </Card.Header>
      </div>
    </>
  );
};
