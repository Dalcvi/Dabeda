import { UserActionTypes } from "../types/UserTypes";

interface SetUsername {
    type: UserActionTypes.SET_USERNAME,
    payload: string
}

export const UserActionCreators = {
    setUsername: (payload: SetUsername["payload"]) => ({ type: UserActionTypes.SET_USERNAME, payload }) as SetUsername,
};

export type KnownAction = SetUsername