import { UserActionCreators } from "../store/actions/UserActions";
import { ProgramsActionCreators } from "../store/actions/ProgramsActions";
import { DaysActionCreators } from "../store/actions/DaysActions";
import { ExercisesActionCreators } from "../store/actions/ExercisesActions";


// URL to backend
const baseURL = `${process.env.BASE_URL}/WebAppGP`;


// Used to get Exercise programs from backend database
export const GetPrograms = async (dispatch: any) => {
    try {
        const response = {
            username: "FakeUser",

            programs: [{ id: 1, programName: "Epic program", userId: 5 },
            { id: 2, programName: "Epic program222", userId: 5 },
            { id: 3, programName: "Haha wroom", userId: 5 }],

            days: [{ id: 1, dayName: "Chest", programId: 1 },
            { id: 2, dayName: "Legs", programId: 1 },
            { id: 3, dayName: "Back", programId: 1 }],

            exercises: [{ id: 1, exerciseName: "Bench", dayId: 1 },
            { id: 2, exerciseName: "Squats", dayId: 2 },
            { id: 3, exerciseName: "Deadlifts", dayId: 3 }]
        }
        const programs = {
            programs: [{ id: 1, programName: "Epic program", userId: 5 },
            { id: 2, programName: "Epic program222", userId: 5 },
            { id: 3, programName: "Haha wroom", userId: 5 }]
        }
        const days = {
            days: [{ id: 1, dayName: "Chest", programId: 1 },
            { id: 2, dayName: "Legs", programId: 1 },
            { id: 3, dayName: "Back", programId: 1 }]
        }
        const exercises = {
            exercises: [{ id: 1, exerciseName: "Bench", setsAmount: 4, dayId: 1, programId: 1 },
            { id: 2, exerciseName: "Squats", setsAmount: 4, dayId: 1, programId: 1 },
            { id: 3, exerciseName: "Deadlifts", setsAmount: 4, dayId: 1, programId: 1 }]
        }
        dispatch(UserActionCreators.setUsername(response.username));
        dispatch(ProgramsActionCreators.setPrograms(programs));
        dispatch(DaysActionCreators.setDays(days));
        dispatch(ExercisesActionCreators.setExercises(exercises));
    }
    catch {
        console.log("Error!");
    }
}


// Sends Email and password to backend and if the answer is 200, we know we logged in.
// If answer is 400, we know the login was unsuccessful
// CHANGE THIS LATER
export const Login = async (dispatch: any, email: string, password: string) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: email, Password: password })
        };
        const response = await fetch(baseURL + "/login", requestOptions)
            .then(response => {
                if (!response.ok) {
                    return response.json()
                        .catch(() => {
                            // Couldn't parse the JSON
                            throw new Error(response.status.toString());
                        })
                        .then(({ message }) => {
                            // Got valid JSON with error response, use it
                            throw new Error(message || response.status);
                        });
                }
                // Successful response, parse the JSON and return the data
                return response.json();
            });

        // Used to artificially have exercise programs filled in
        const username = {
            username: response.username
            // days: [{ id: 1, dayName: "Chest", programId: 1 },
            // { id: 2, dayName: "Legs", programId: 1 },
            // { id: 3, dayName: "Back", programId: 1 }],

            // exercises: [{ id: 1, exerciseName: "Bench", dayId: 1 },
            // { id: 2, exerciseName: "Squats", dayId: 2 },
            // { id: 3, exerciseName: "Deadlifts", dayId: 3 }]
        };
        const programs = {
            programs: [{ id: 1, programName: "Epic program", userId: 5 },
            { id: 2, programName: "Epic program222", userId: 5 },
            { id: 3, programName: "Haha wroom", userId: 5 }]
        };
        const days = {
            days: [{ id: 1, dayName: "Chest", programId: 1 },
            { id: 2, dayName: "Legs", programId: 1 },
            { id: 3, dayName: "Back", programId: 1 }]
        }
        const exercises = {
            exercises: [{ id: 1, exerciseName: "Bench", dayId: 1 },
            { id: 2, exerciseName: "Squats", dayId: 2 },
            { id: 3, exerciseName: "Deadlifts", dayId: 3 }]
        }

        dispatch(UserActionCreators.setUsername(response.username));
        dispatch(ProgramsActionCreators.setPrograms(programs));
        dispatch(DaysActionCreators.setDays(days));
        dispatch(ExercisesActionCreators.setExercises(exercises));
        return response.username;
    }
    catch {
        console.log("ERROR");
        return false;
    }
}

// Registers an account if Username or Email isn't being used already
export const Register = async (email: string, password: string, username: string) => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, email: email, password: password })
        };
        const response = await fetch(baseURL + "/register", requestOptions).then(response => {
            if (!response.ok) {
                return response.json()
                    .catch(() => {
                        // Couldn't parse the JSON
                        throw new Error(response.status.toString());
                    })
                    .then(({ message }) => {
                        // Got valid JSON with error response, use it
                        throw new Error(message || response.status);
                    });
            }
            // Successful response, parse the JSON and return the data
            return response.json();
        });
        if (response.usernameTaken === true)
            console.log("Username taken");
        if (response.emailTaken === true)
            console.log("Email taken");
    }
    catch {
        console.log("ERROR");
    }
}

// Creates a new program
export const AddProgram = async (dispatch: any, fakeId: number, name: string, userId: number) => {
    try {
        const program = {
            id: Math.floor(Math.floor(Math.random() * 22) * Math.random() * 1000),
            programName: name,
            userId: userId
        }
        dispatch(ProgramsActionCreators.addProgram(program));
    }
    catch {
        console.log("Couldn't add program!");
    }
}

export const EditProgram = async (dispatch: any, realId: number, name: string, userId: number) => {
    try {
        const program = {
            id: realId,
            programName: name,
            userId: userId
        }
        dispatch(ProgramsActionCreators.editProgram(program));
    }
    catch {
        console.log("Couldn't edit program!");
    }
}

export const DeleteProgram = async (dispatch: any, deleteId: number) => {
    try {
        dispatch(ProgramsActionCreators.deleteProgram({ id: deleteId }));
    }
    catch {
        console.log("Couldn't delete program!");
    }
}

export const AddDay = async (dispatch: any, fakeId: number, name: string, programId: number) => {
    try {
        const day = {
            id: Math.floor(Math.floor(Math.random() * 22) * Math.random() * 1000),
            dayName: name,
            programId: programId
        }
        dispatch(DaysActionCreators.addDay(day));
    }
    catch {
        console.log("Couldn't add day!");
    }
}

export const EditDay = async (dispatch: any, dayId: number, name: string, programId: number) => {
    try {
        const day = {
            id: dayId,
            dayName: name,
            programId: programId
        }
        dispatch(DaysActionCreators.editDay(day));
    }
    catch {
        console.log("Couldn't edit day!");
    }
}

export const DeleteDay = async (dispatch: any, deleteId: number) => {
    try {
        dispatch(DaysActionCreators.deleteDay({ id: deleteId }));
    }
    catch {
        console.log("Couldn't delete day!");
    }
}

export const DeleteDayByProgram = async (dispatch: any, deleteProgramId: number) => {
    try {
        dispatch(DaysActionCreators.deleteByProgram({ programId: deleteProgramId }));
    }
    catch {
        console.log("Couldn't delete exercises by day!")
    }
}

export const AddExercise = async (dispatch: any, fakeId: number, name: string, amount: number, programId: number) => {
    try {
        const exercise = {
            id: Math.floor(Math.floor(Math.random() * 22) * Math.random() * 1000),
            exerciseName: name,
            setsAmount: amount,
            dayId: programId
        }
        dispatch(ExercisesActionCreators.addExercise(exercise));
    }
    catch {
        console.log("Couldn't add exercise!");
    }
}

export const EditExercise = async (dispatch: any, exerciseId: number, name: string, amount: number, programId: number) => {
    try {
        const exercise = {
            id: exerciseId,
            exerciseName: name,
            setsAmount: amount,
            dayId: programId
        }
        dispatch(ExercisesActionCreators.editExercise(exercise));
    }
    catch {
        console.log("Couldn't edit exercise!");
    }
}

export const DeleteExercise = async (dispatch: any, deleteId: number) => {
    try {
        dispatch(ExercisesActionCreators.deleteExercise({ id: deleteId }));
    }
    catch {
        console.log("Couldn't delete exercise!");
    }
}

export const DeleteExerciseByDay = async (dispatch: any, deleteDayId: number) => {
    try {
        dispatch(ExercisesActionCreators.deleteByDay({ dayId: deleteDayId }));
    }
    catch {
        console.log("Couldn't delete exercises by day!")
    }
}

export const DeleteExerciseByProgram = async (dispatch: any, deleteProgramId: number) => {
    try {
        dispatch(ExercisesActionCreators.deleteByProgram({ programId: deleteProgramId }));
    }
    catch {
        console.log("Couldn't delete exercises by day!")
    }
}