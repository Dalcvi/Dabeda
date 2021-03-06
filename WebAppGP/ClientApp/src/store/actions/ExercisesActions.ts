import { ExercisesActionTypes } from "../types/ExercisesTypes";

interface SetExercisesAction {
    type: ExercisesActionTypes.SET_EXERCISES,
    payload: {
        exercises: {}
    }
}

interface AddExerciseAction {
    type: ExercisesActionTypes.ADD_EXERCISE,
    payload: {
        id: number, exerciseName: string, dayId: number
    }
}

interface EditExerciseAction {
    type: ExercisesActionTypes.EDIT_EXERCISE,
    payload: {
        id: number, exerciseName: string, dayId: number
    }
}

interface DeleteExerciseAction {
    type: ExercisesActionTypes.DELETE_EXERCISE,
    payload: { id: number }
}

export const ExercisesActionCreators = {
    setExercises: (payload: SetExercisesAction["payload"]) => ({ type: ExercisesActionTypes.SET_EXERCISES, payload }) as SetExercisesAction,
    addExercise: (payload: AddExerciseAction["payload"]) => ({ type: ExercisesActionTypes.ADD_EXERCISE, payload }) as AddExerciseAction,
    editExercise: (payload: EditExerciseAction["payload"]) => ({ type: ExercisesActionTypes.EDIT_EXERCISE, payload }) as EditExerciseAction,
    deleteExercisey: (payload: DeleteExerciseAction["payload"]) => ({ type: ExercisesActionTypes.DELETE_EXERCISE, payload }) as DeleteExerciseAction
};

export type KnownAction = SetExercisesAction | AddExerciseAction | EditExerciseAction | DeleteExerciseAction;