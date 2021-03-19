import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../store/Index";
import "../styles/learningReact.css";
import { UserState } from "../store/User";
import { Programs } from "./Programs";
import { Sidebar } from "./Sidebar";
import { ExercisesTemp } from "./ExercisesTemp";

export const MainPage = () => {
  const username = useSelector<ApplicationState, UserState["username"]>(
    (state) => state.user.username
  );
  const [selectedProgram, setSelectedProgram] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [fullSidebar, setFullSidebar] = useState(true);
  const [sidebarStyle, setSidebarStyle] = useState("#sidebar-big");

  const changeStyle = () => {
    if (!fullSidebar) setSidebarStyle("sidebar-big");
    else setSidebarStyle("sidebar-small");
    setFullSidebar(!fullSidebar);
  };

  return (
    <div className="d-flex" style={{ overflow: "hidden" }}>
      <Sidebar
        selectedProgram={selectedProgram}
        setSelectedProgram={setSelectedProgram}
        fullSidebar={fullSidebar}
        sidebarStyle={sidebarStyle}
        changeStyle={changeStyle}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div style={{ width: "100%" }}>
        <ExercisesTemp
          fullSidebar={fullSidebar}
          changeStyle={changeStyle}
          selectedDay={selectedDay}
          selectedProgram={selectedProgram}
        />
      </div>
    </div>
  );
};

export default MainPage;
