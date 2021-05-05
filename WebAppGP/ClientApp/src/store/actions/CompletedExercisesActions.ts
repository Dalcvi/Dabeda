import { CompletedExercisesTypes } from "../types/CompletedExercisesTypes";

interface SetCompletedExercisesAction {
    type: CompletedExercisesTypes.SET_COMPLETED_EXERCISES,
    payload: []
}

export const CompletedExercisesCreators = {
    setCompletedExercisesAction: (payload: SetCompletedExercisesAction["payload"]) => ({ type: CompletedExercisesTypes.SET_COMPLETED_EXERCISES, payload }) as SetCompletedExercisesAction
}

export type KnownAction = SetCompletedExercisesAction;