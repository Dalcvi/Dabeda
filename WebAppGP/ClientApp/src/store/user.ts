import mapKeys from "lodash/mapKeys";
import { omit } from "lodash"
import _ from 'lodash';
import { Action, Reducer } from 'redux';
import { UserActionTypes } from "./types/UserTypes";
import { KnownAction } from "./actions/UserActions";

// export interface UserState {
//   username: string,
//   programs: {}, // EXAMPLE: id: {id: number, programName: string, userId: int}
//   days: {}, // EXAMPLE: id: {id: number, dayName: string, programId: int}
//   exercises: {}, // EXAMPLE: id: {id: number, exercise: string, dayId: int}
// }

// const initialState = {
//   username: "",
//   programs: {}, // EXAMPLE: id: {id: number, programName: string, userId: int}
//   days: {}, // EXAMPLE: id: {id: number, dayName: string, programId: int}
//   exercises: {}, // EXAMPLE: id: {id: number, exercise: string, dayId: int}
// }

// interface SetStateAction {
//   type: 'SET_STATE',
//   payload: {
//     username: string,
//     programs: {},
//     days: {},
//     exercises: {}
//   }
// }

// interface AddProgramAction {
//   type: 'ADD_PROGRAM',
//   payload: {
//     id: number, programName: string, days: []
//   }
// }

// interface EditProgramAction {
//   type: 'EDIT_PROGRAM',
//   payload: {
//     id: number, programName: string, days: []
//   }
// }

// interface DeleteProgramAction {
//   type: 'DELETE_PROGRAM',
//   payload: { id: number }
// }

// type KnownAction = SetStateAction | AddProgramAction | EditProgramAction | DeleteProgramAction;

// export const ActionCreators = {
//   setState: (payload: UserState) => ({ type: 'SET_STATE', payload }) as SetStateAction,
//   addProgram: (payload: { id: number, programName: string, days: [] }) => ({ type: 'ADD_PROGRAM', payload }) as AddProgramAction,
//   editProgram: (payload: { id: number, programName: string, days: [] }) => ({ type: 'EDIT_PROGRAM', payload }) as EditProgramAction,
//   deleteProgram: (payload: { id: number }) => ({ type: 'DELETE_PROGRAM', payload }) as DeleteProgramAction
// };

// export const userReducer: Reducer<UserState> = (state: UserState = initialState, incomingAction: Action) => {
//   if (state === undefined) {
//     return initialState;
//   }

//   const action = incomingAction as KnownAction;
//   switch (action.type) {
//     case 'SET_STATE': {
//       console.log("Okay");
//       const newPrograms = mapKeys(action.payload.programs, "id");
//       const newDays = mapKeys(action.payload.days, "id");
//       const newExercises = mapKeys(action.payload.exercises, "id");
//       return {
//         username: action.payload.username,
//         programs: { ...newPrograms },
//         days: { ...newDays },
//         exercises: { ...newExercises },
//       };
//     };
//     case 'ADD_PROGRAM': {
//       return {
//         ...state,
//         programs: { ...state.programs, [action.payload.id]: action.payload },
//       };
//     };
//     case 'EDIT_PROGRAM': {
//       return {
//         username: state.username,
//         programs: { ...state.programs, [action.payload.id]: action.payload },
//         days: state.days,
//         exercises: state.exercises
//       };
//     };
//     case 'DELETE_PROGRAM': {
//       return {
//         ...state,
//         programs: omit(state.programs, action.payload.id)
//       }
//     }
//     default:
//       return { ...state };
//   }
// }

export interface UserState {
  username: string,
}

const initialState = {
  username: "",
}

export const userReducer = (state: UserState = initialState, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case UserActionTypes.SET_USERNAME: {
      return {
        ...state,
        username: action.payload
      }
    }
    default:
      return state;
  }
}

export default userReducer;