import mapKeys from "lodash/mapKeys";
import toArray from "lodash/toArray";
import { omit } from "lodash"
import { Action } from "redux";
import { CompletedExercisesTypes } from "./types/CompletedExercisesTypes";
import { KnownAction } from "./actions/CompletedExercisesActions";

export interface CompletedExercisesState {
    completedExercises: {} // id: number, exerciseId: number, name: string, weight: number, reps: Array,
    // date: date
}

const initialState: CompletedExercisesState = {
    completedExercises: {}
}

export const completedExercisesReducer = (state: CompletedExercisesState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case CompletedExercisesTypes.SET_COMPLETED_EXERCISES: {
            const tempState = state;
            for (let i = 0; i < action.payload.length; i++) {
                const temp = [...(tempState.completedExercises[action.payload[i]["exerciseId"]] as [] || []), action.payload[i]]
                tempState.completedExercises = { ...tempState.completedExercises, [action.payload[i]["exerciseId"]]: temp }
            }
            return {
                ...state,
                completedExercises: { ...tempState.completedExercises }
            }
        }
        default:
            return state;
    }
}