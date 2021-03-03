import { ActionCreators } from '../store/user';

const baseURL = `https://localhost:44356/WebAppGP`;

export const GetPrograms = async (dispatch: any) => {
    try {
        const response = {
            username: "FakeUser",

            programs: [{ id: 1, programName: "Epic program", days: [1, 2] },
            { id: 2, programName: "Epic program222", days: [3] },
            { id: 3, programName: "Haha wroom", days: [] }],

            days: [{ id: 1, dayName: "Chest", exercises: [1] },
            { id: 2, dayName: "Legs", exercises: [2] },
            { id: 3, dayName: "Back", exercises: [3] }],

            exercises: [{ id: 1, exerciseName: "Bench", sets: 4 },
            { id: 2, exerciseName: "Squats", sets: 4 },
            { id: 3, exerciseName: "Deadlifts", sets: 4 }]
        }
        dispatch(ActionCreators.setState(response));
    }
    catch {
        console.log("Error!");
    }
}

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
        const upgradedResponse = {
            username: response.username,

            programs: [{ id: 1, programName: "Epic program", days: [1, 2] },
            { id: 2, programName: "Epic program222", days: [3] },
            { id: 3, programName: "Haha wroom", days: [] }],

            days: [{ id: 1, dayName: "Chest", exercises: [1] },
            { id: 2, dayName: "Legs", exercises: [2] },
            { id: 3, dayName: "Back", exercises: [3] }],

            exercises: [{ id: 1, exerciseName: "Bench", sets: 4 },
            { id: 2, exerciseName: "Squats", sets: 4 },
            { id: 3, exerciseName: "Deadlifts", sets: 4 }]
        }

        dispatch(ActionCreators.setState(upgradedResponse));
        return true;
    }
    catch {
        console.log("ERROR");
        return false;
    }
}

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

export const AddProgram = async (dispatch: any, name: string) => {
    try {
        const tempArray = [] as [];
        const program = {
            id: Math.floor(Math.random() * 22),
            programName: name,
            days: tempArray
        }
        dispatch(ActionCreators.addProgram(program));
    }
    catch {
        console.log("Error!");
    }
}
