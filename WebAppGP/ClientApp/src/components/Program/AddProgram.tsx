import { useState } from "react";
import { Card, Accordion } from "react-bootstrap";
import { EditProgramModal, NewProgramModal } from "./Modals/ProgramModal";

interface Program {
  id: number;
  name: string;
}

// export const AddProgram = (props: any) => {
//   return (
//     <>
//       <div>
//         <Card.Header className="program-text">
//           <NewProgramModal program={{ name: "" }} />
//         </Card.Header>
//       </div>
//     </>
//   );
// };

export const AddProgram = (props: any) => {
  return (
    <Accordion>
      <Card.Header className="program-text">
        <NewProgramModal program={{ name: "" }} />
      </Card.Header>
    </Accordion>
  );
};
