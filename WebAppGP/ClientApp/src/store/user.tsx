const initialState = {
    username: "",
    programs: {},   // EXAMPLE: id: {id: number, programName: string, days: []}
    days: {},       // EXAMPLE: id: {id: number, dayName: string, exercises: []}
    exercises: {}   // EXAMPLE: id: {id: number, exercise: string, sets: number, weight: number, reps: []}
};

export const ActionTypes = {
    SET_STATE: 'SET_STATE',
};

export const ActionCreators = {
    setState: (payload: any) => ({type: ActionTypes.SET_STATE, payload})
};

export default function userReducer(state = initialState, action: any) {
    switch(action.type) {
        
        case ActionTypes.SET_STATE:
            return {
                ...state, 
                    username: action.payload.username,
                    programs: action.payload.programs,
                    days: action.payload.days, 
                    exercises: action.payload.exercises
            };
    };
};
