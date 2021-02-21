import { Action, Reducer } from 'redux';

export interface LearningState {
    input: string;
}

export interface ChangeNameAction { type: "CHANGE_NAME" }
export interface InputChangeAction { type: "INPUT_CHANGE", input: '' }

export type KnownAction = ChangeNameAction | InputChangeAction;

export const actionCreators = {
    inputChange: (value: string) => ({ type: 'INPUT_CHANGE', input: value } as InputChangeAction)
};

export const reducer: Reducer<LearningState> = (state: LearningState = { input: "" }, incomingAction: Action): LearningState => {
    if (state === undefined) {
        return {
            input: ''
        };
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'INPUT_CHANGE':
            console.log("haha2");
            return {
                input: action.input,
            };
        default:
            return state;
    }
}