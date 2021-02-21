import * as LearningReact from './learningReact';
import { useSelector, TypedUseSelectorHook } from 'react-redux'

// The top-level state object
export interface ApplicationState {
    learner: LearningReact.LearningState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    learner: LearningReact.reducer
};

export const useTypedSelector: TypedUseSelectorHook<ApplicationState> = useSelector;

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
