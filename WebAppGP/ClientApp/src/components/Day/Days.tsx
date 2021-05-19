import { useState } from "react";
import { DayBar } from "./DayBar";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
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
  if (
    props.selectedDay != 0 &&
    !Object.keys(userDays).includes(props.selectedDay.toString())
  ) {
    props.setSelectedDay(0);
  }

  const daysArray = filter(userDays, (day) => {
    return (day as Day).program === props.program;
  });

  const items = [] as any;
  daysArray.map((day) => {
    items.push(
      <DayBar
        key={(day as Day).id}
        day={day as Day}
        selectedDay={props.selectedDay}
        setSelectedDay={props.setSelectedDay}
      />
    );
  });

  items.push(<AddDay program={props.program} key={1}/>);

  return <>{items}</>;
};
