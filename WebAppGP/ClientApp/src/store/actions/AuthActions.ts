import { AuthActionTypes } from "../types/AuthTypes";

interface Authenticate {
    type: AuthActionTypes.AUTHENTICATE,
    payload: {
        token: string
    }
}

interface Logout {
    type: AuthActionTypes.LOGOUT,
}


export const AuthActionCreators = {
    authenticate: (payload: Authenticate["payload"]) => ({ type: AuthActionTypes.AUTHENTICATE, payload }) as Authenticate,
    logout: () => ({ type: AuthActionTypes.LOGOUT }) as Logout
};

export type KnownAction = Authenticate | Logout;