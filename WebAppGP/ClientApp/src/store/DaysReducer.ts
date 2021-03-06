import mapKeys from "lodash/mapKeys";
import { omit } from "lodash"
import { Action } from "redux";
import { DaysActionTypes } from "./types/DaysTypes";
import { KnownAction } from "./actions/DaysActions";

export interface DaysState {
    days: {} // id: number, programName: string, userId: number
}

const initialState: DaysState = {
    days: {}
}

export const daysReducer = (state: DaysState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case DaysActionTypes.SET_DAYS: {
            const newDays = mapKeys(action.payload.days, "id");
            return {
                ...state,
                days: { ...newDays }
            }
        }
        case DaysActionTypes.ADD_DAY: {
            return {
                ...state,
                days: { ...state.days, [action.payload.id]: action.payload },
            };
        };
        case DaysActionTypes.EDIT_DAY: {
            return {
                days: { ...state.days, [action.payload.id]: action.payload },
            };
        };
        case DaysActionTypes.DELETE_DAY: {
            return {
                ...state,
                days: omit(state.days, action.payload.id)
            }
        }
        default:
            return state;
    }
}