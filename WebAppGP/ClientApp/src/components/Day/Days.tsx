import { useState } from "react";
import { DayBar } from "./DayBar";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store/Index";
import toArray from "lodash/toArray";
import filter from "lodash/filter";
import { DaysState } from "../../store/DaysReducer";
import { Accordion } from "react-bootstrap";
import { AddDay } from "./AddDay";

interface Day {
  id: number;
  name: string;
  program: number;
}

export const Days = (props: any) => {
  const userDays = useSelector<ApplicationState, DaysState["days"]>(
    (state) => state.days.days
  );

  const daysArray = filter(userDays, (day) => {
    return (day as Day).program === props.program;
  });

  const items = [] as any;
  daysArray.map((day) => {
    items.push(
      <DayBar
        day={day as Day}
        selectedDay={props.selectedDay}
        setSelectedDay={props.setSelectedDay}
      />
    );
  });

  items.push(<AddDay program={props.program} />);

  return <>{items}</>;
};
