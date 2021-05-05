import { userReducer, UserState } from "./UserReducer";
import { programsReducer, ProgramsState } from "./ProgramsReducer";
import { daysReducer, DaysState } from "./DaysReducer";
import { exercisesReducer, ExercisesState } from "./ExercisesReducer";
import { authReducer, AuthState } from "./Authentication";
import { completedExercisesReducer, CompletedExercisesState } from "./CompletedExercisesReducer";

// The top-level state object
export interface ApplicationState {
    auth: AuthState;
    user: UserState;
    programs: ProgramsState;
    days: DaysState;
    exercises: ExercisesState;
    completedExercises: CompletedExercisesState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    auth: authReducer,
    user: userReducer,
    programs: programsReducer,
    days: daysReducer,
    exercises: exercisesReducer,
    completedExercises: completedExercisesReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
