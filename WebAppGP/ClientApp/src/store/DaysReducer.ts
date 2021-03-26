import mapKeys from "lodash/mapKeys";
import toArray from "lodash/toArray";
import { omit } from "lodash"
import { Action } from "redux";
import { DaysActionTypes } from "./types/DaysTypes";
import { KnownAction } from "./actions/DaysActions";

export interface DaysState {
    days: {} // id: number, dayName: string, programId: number
}

const initialState: DaysState = {
    days: {}
}

interface Day {
    id: number;
    dayName: string;
    program: number;
}

export const daysReducer = (state: DaysState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case DaysActionTypes.SET_DAYS: {
            const newDays = mapKeys(action.payload, "id");
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
        case DaysActionTypes.DELETE_BY_PROGRAM: {
            const exercisesArray = toArray(state.days);
            const newArray = [];
            for (let i = 0; i < exercisesArray.length; i++) {
                if ((exercisesArray[i] as Day).program != action.payload.program)
                    newArray.push(exercisesArray[i]);
            }
            return {
                ...state,
                days: { ...mapKeys(newArray, "id") }
            }
        }
        default:
            return state;
    }
}