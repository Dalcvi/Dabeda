import mapKeys from "lodash/mapKeys";
import { omit } from "lodash"
import { Action } from "redux";
import { ExercisesActionTypes } from "./types/ExercisesTypes";
import { KnownAction } from "./actions/ExercisesActions";

export interface ExercisesState {
    exercises: {} // id: number, exerciseName: string, dayId: number
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
        default:
            return state;
    }
}