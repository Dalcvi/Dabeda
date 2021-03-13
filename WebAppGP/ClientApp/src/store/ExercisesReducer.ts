import mapKeys from "lodash/mapKeys";
import { omit } from "lodash"
import toArray from "lodash/toArray";
import { Action } from "redux";
import { ExercisesActionTypes } from "./types/ExercisesTypes";
import { KnownAction } from "./actions/ExercisesActions";

interface Exercise {
    id: number;
    exerciseName: string;
    setsAmount: number;
    dayId: number;
    programId: number;
}

export interface ExercisesState {
    exercises: {} // id: number, exerciseName: string, setsAmount: number, dayId: number, programId: number
}

const initialState: ExercisesState = {
    exercises: {}
}

export const exercisesReducer = (state: ExercisesState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case ExercisesActionTypes.SET_EXERCISES: {
            const newExercises = mapKeys(action.payload.exercises, "id");
            return {
                ...state,
                exercises: { ...newExercises }
            }
        }
        case ExercisesActionTypes.ADD_EXERCISE: {
            return {
                ...state,
                exercises: { ...state.exercises, [action.payload.id]: action.payload },
            };
        };
        case ExercisesActionTypes.EDIT_EXERCISE: {
            return {
                exercises: { ...state.exercises, [action.payload.id]: action.payload },
            };
        };
        case ExercisesActionTypes.DELETE_EXERCISE: {
            return {
                ...state,
                exercises: omit(state.exercises, action.payload.id)
            }
        }
        case ExercisesActionTypes.DELETE_BY_DAY: {
            const exercisesArray = toArray(state.exercises);
            const newArray = [];
            for (let i = 0; i < exercisesArray.length; i++) {
                if ((exercisesArray[i] as Exercise).dayId != action.payload.dayId)
                    newArray.push(exercisesArray[i]);
            }
            return {
                ...state,
                exercises: { ...mapKeys(newArray, "id") }
            }
        }
        case ExercisesActionTypes.DELETE_BY_PROGRAM: {
            const exercisesArray = toArray(state.exercises);
            const newArray = [];
            for (let i = 0; i < exercisesArray.length; i++) {
                if ((exercisesArray[i] as Exercise).programId != action.payload.programId)
                    newArray.push(exercisesArray[i]);
            }
            return {
                ...state,
                exercises: { ...mapKeys(newArray, "id") }
            }
        }
        default:
            return state;
    }
}