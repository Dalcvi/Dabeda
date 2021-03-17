import { Action } from 'redux';
import { AuthActionTypes } from "./types/AuthTypes";
import { KnownAction } from "./actions/AuthActions";

export interface AuthState {
    token: string,
    isLoggedIn: boolean
}

const initialState = {
    token: "",
    isLoggedIn: false
}

export const authReducer = (state: AuthState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case AuthActionTypes.AUTHENTICATE: {
            sessionStorage.setItem("token", action.payload.token);
            return {
                ...state, ...{
                    token: action.payload.token,
                    isLoggedIn: true
                }
            }

        }
        case AuthActionTypes.LOGOUT: {
            sessionStorage.clear();
            break;
        }
        default:
            return state;
    }
}

export default authReducer;