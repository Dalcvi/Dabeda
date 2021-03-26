import { DaysActionTypes } from "../types/DaysTypes";

interface SetDaysAction {
    type: DaysActionTypes.SET_DAYS,
    payload: []
}

interface AddDayAction {
    type: DaysActionTypes.ADD_DAY,
    payload: {
        id: number, name: string, program: number
    }
}

interface EditDayAction {
    type: DaysActionTypes.EDIT_DAY,
    payload: {
        id: number, name: string, program: number
    }
}

interface DeleteDayAction {
    type: DaysActionTypes.DELETE_DAY,
    payload: { id: number }
}

interface DeleteByProgramAction {
    type: DaysActionTypes.DELETE_BY_PROGRAM,
    payload: { program: number }
}

export const DaysActionCreators = {
    setDays: (payload: SetDaysAction["payload"]) => ({ type: DaysActionTypes.SET_DAYS, payload }) as SetDaysAction,
    addDay: (payload: AddDayAction["payload"]) => ({ type: DaysActionTypes.ADD_DAY, payload }) as AddDayAction,
    editDay: (payload: EditDayAction["payload"]) => ({ type: DaysActionTypes.EDIT_DAY, payload }) as EditDayAction,
    deleteDay: (payload: DeleteDayAction["payload"]) => ({ type: DaysActionTypes.DELETE_DAY, payload }) as DeleteDayAction,
    deleteByProgram: (payload: DeleteByProgramAction["payload"]) => ({ type: DaysActionTypes.DELETE_BY_PROGRAM, payload }) as DeleteByProgramAction
};

export type KnownAction = SetDaysAction | AddDayAction | EditDayAction | DeleteDayAction | DeleteByProgramAction;