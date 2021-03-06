import { DaysActionTypes } from "../types/DaysTypes";

interface SetDaysAction {
    type: DaysActionTypes.SET_DAYS,
    payload: {
        days: {}
    }
}

interface AddDayAction {
    type: DaysActionTypes.ADD_DAY,
    payload: {
        id: number, dayName: string, programId: number
    }
}

interface EditDayAction {
    type: DaysActionTypes.EDIT_DAY,
    payload: {
        id: number, dayName: string, programId: number
    }
}

interface DeleteDayAction {
    type: DaysActionTypes.DELETE_DAY,
    payload: { id: number }
}

export const DaysActionCreators = {
    setDays: (payload: SetDaysAction["payload"]) => ({ type: DaysActionTypes.SET_DAYS, payload }) as SetDaysAction,
    addDay: (payload: AddDayAction["payload"]) => ({ type: DaysActionTypes.ADD_DAY, payload }) as AddDayAction,
    editDay: (payload: EditDayAction["payload"]) => ({ type: DaysActionTypes.EDIT_DAY, payload }) as EditDayAction,
    deleteDay: (payload: DeleteDayAction["payload"]) => ({ type: DaysActionTypes.DELETE_DAY, payload }) as DeleteDayAction
};

export type KnownAction = SetDaysAction | AddDayAction | EditDayAction | DeleteDayAction;