import { ProgramsActionTypes } from "../types/ProgramsTypes";

interface SetProgramsAction {
  type: ProgramsActionTypes.SET_PROGRAMS,
  payload: []
}

interface AddProgramAction {
  type: ProgramsActionTypes.ADD_PROGRAM,
  payload: {
    id: number, name: string
  }
}

interface EditProgramAction {
  type: ProgramsActionTypes.EDIT_PROGRAM,
  payload: {
    id: number, name: string
  }
}

interface DeleteProgramAction {
  type: ProgramsActionTypes.DELETE_PROGRAM,
  payload: { id: number }
}

export const ProgramsActionCreators = {
  setPrograms: (payload: SetProgramsAction["payload"]) => ({ type: ProgramsActionTypes.SET_PROGRAMS, payload }) as SetProgramsAction,
  addProgram: (payload: AddProgramAction["payload"]) => ({ type: ProgramsActionTypes.ADD_PROGRAM, payload }) as AddProgramAction,
  editProgram: (payload: EditProgramAction["payload"]) => ({ type: ProgramsActionTypes.EDIT_PROGRAM, payload }) as EditProgramAction,
  deleteProgram: (payload: DeleteProgramAction["payload"]) => ({ type: ProgramsActionTypes.DELETE_PROGRAM, payload }) as DeleteProgramAction
};

export type KnownAction = SetProgramsAction | AddProgramAction | EditProgramAction | DeleteProgramAction;