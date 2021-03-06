import mapKeys from "lodash/mapKeys";
import { omit } from "lodash"
import { Action } from "redux";
import { ProgramsActionTypes } from "./types/ProgramsTypes";
import { KnownAction } from "./actions/ProgramsActions";

export interface ProgramsState {
    programs: {} // id: number, programName: string, userId: number
}

const initialState: ProgramsState = {
    programs: {}
}

export const programsReducer = (state: ProgramsState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case ProgramsActionTypes.SET_PROGRAMS: {
            const newPrograms = mapKeys(action.payload.programs, "id");
            return {
                ...state,
                programs: { ...newPrograms }
            }
        }
        case ProgramsActionTypes.ADD_PROGRAM: {
            return {
                ...state,
                programs: { ...state.programs, [action.payload.id]: action.payload },
            };
        };
        case ProgramsActionTypes.EDIT_PROGRAM: {
            return {
                programs: { ...state.programs, [action.payload.id]: action.payload },
            };
        };
        case ProgramsActionTypes.DELETE_PROGRAM: {
            return {
                ...state,
                programs: omit(state.programs, action.payload.id)
            }
        }
        default:
            return state;
    }
}