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
        id: number, exerciseName: string, setsAmount: number, dayId: number
    }
}

interface EditExerciseAction {
    type: ExercisesActionTypes.EDIT_EXERCISE,
    payload: {
        id: number, exerciseName: string, setsAmount: number, dayId: number
    }
}

interface DeleteExerciseAction {
    type: ExercisesActionTypes.DELETE_EXERCISE,
    payload: { id: number }
}

interface DeleteByDayAction {
    type: ExercisesActionTypes.DELETE_BY_DAY,
    payload: { dayId: number }
}
interface DeleteByProgramAction {
    type: ExercisesActionTypes.DELETE_BY_PROGRAM,
    payload: { programId: number }
}

export const ExercisesActionCreators = {
    setExercises: (payload: SetExercisesAction["payload"]) => ({ type: ExercisesActionTypes.SET_EXERCISES, payload }) as SetExercisesAction,
    addExercise: (payload: AddExerciseAction["payload"]) => ({ type: ExercisesActionTypes.ADD_EXERCISE, payload }) as AddExerciseAction,
    editExercise: (payload: EditExerciseAction["payload"]) => ({ type: ExercisesActionTypes.EDIT_EXERCISE, payload }) as EditExerciseAction,
    deleteExercise: (payload: DeleteExerciseAction["payload"]) => ({ type: ExercisesActionTypes.DELETE_EXERCISE, payload }) as DeleteExerciseAction,
    deleteByDay: (payload: DeleteByDayAction["payload"]) => ({ type: ExercisesActionTypes.DELETE_BY_DAY, payload }) as DeleteByDayAction,
    deleteByProgram: (payload: DeleteByProgramAction["payload"]) => ({ type: ExercisesActionTypes.DELETE_BY_PROGRAM, payload }) as DeleteByProgramAction,
};

export type KnownAction = SetExercisesAction | AddExerciseAction | EditExerciseAction | DeleteExerciseAction | DeleteByDayAction | DeleteByProgramAction;