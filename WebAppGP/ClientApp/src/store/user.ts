import _ from 'lodash';
import { Action, Reducer } from 'redux';
import { UserActionTypes } from "./types/UserTypes";
import { KnownAction } from "./actions/UserActions";

export interface UserState {
  username: string,
}

const initialState = {
  username: "",
}

export const userReducer = (state: UserState = initialState, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case UserActionTypes.SET_USERNAME: {
      return {
        ...state,
        username: action.payload
      }
    }
    default:
      return state;
  }
}

export default userReducer;