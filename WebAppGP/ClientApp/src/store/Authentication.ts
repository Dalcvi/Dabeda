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
            console.log("BROOO1");
            sessionStorage.setItem("token", action.payload.token);
            return {
                ...state, ...{
                    token: action.payload.token,
                    isLoggedIn: true
                }
            }

        }
        case AuthActionTypes.LOGOUT: {
            console.log("BROOO2");
            sessionStorage.clear();
            return {
                ...state, ...{
                    token: "",
                    isLoggedIn: false
                }
            }
        }
        default:
            return state;
    }
}

export default authReducer;