import mapKeys from "lodash/mapKeys";
import { Action, Reducer } from 'redux';

export interface UserState {
  username: string,
  programs: {}, // EXAMPLE: id: {id: number, programName: string, days: []}
  days: {}, // EXAMPLE: id: {id: number, dayName: string, exercises: []}
  exercises: {}, // EXAMPLE: id: {id: number, exercise: string, sets: number}
}

const initialState = {
  username: "",
  programs: {}, // EXAMPLE: id: {id: number, programName: string, days: []}
  days: {}, // EXAMPLE: id: {id: number, dayName: string, exercises: []}
  exercises: {}, // EXAMPLE: id: {id: number, exercise: string, sets: number}
}

interface SetStateAction {
  type: 'SET_STATE',
  payload: {
    username: string,
    programs: {},
    days: {},
    exercises: {}
  }
}

interface AddProgramAction {
  type: 'ADD_PROGRAM',
  payload: {
    id: number, programName: string, days: []
  }
}

interface EditProgramAction {
  type: 'EDIT_PROGRAM',
  payload: {
    program: { id: number, programName: string, days: [] }
  }
}

type KnownAction = SetStateAction | AddProgramAction | EditProgramAction;

export const ActionCreators = {
  setState: (payload: UserState) => ({ type: 'SET_STATE', payload }) as SetStateAction,
  addProgram: (payload: { id: number, programName: string, days: [] }) => ({ type: 'ADD_PROGRAM', payload }) as AddProgramAction,
  editProgram: (payload: { program: {} }) => ({ type: 'EDIT_PROGRAM', payload }) as EditProgramAction
};

export const userReducer: Reducer<UserState> = (state: UserState = {
  username: "",
  programs: {},
  days: {},
  exercises: {}
}, incomingAction: Action): UserState => {
  if (state === undefined) {
    return initialState;
  }

  const action = incomingAction as KnownAction;
  switch (action.type) {
    case 'SET_STATE': {
      console.log("Okay");
      const newPrograms = mapKeys(action.payload.programs, "id");
      const newDays = mapKeys(action.payload.days, "id");
      const newExercises = mapKeys(action.payload.exercises, "id");
      return {
        username: action.payload.username,
        programs: { ...newPrograms },
        days: { ...newDays },
        exercises: { ...newExercises },
      };
    };
    case 'ADD_PROGRAM': {
      return {
        username: state.username,
        programs: { ...state.programs, [action.payload.id]: action.payload },
        days: state.days,
        exercises: state.exercises
      }
    }
    case 'EDIT_PROGRAM': {
      return {
        username: state.username,
        programs: { ...state.programs, [action.payload.program.id]: action.payload.program },
        days: state.days,
        exercises: state.exercises
      }
    }
    default:
      return { ...state };
  }
}

export default userReducer;