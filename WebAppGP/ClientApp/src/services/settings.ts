import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `https://localhost:44356/Settings`
});

export const ChangePassword = async (credentials: any) => {
    try {
        // await axiosInstance.post('/changePassword', credentials);
        console.log("BRUH");
        console.log(credentials["newPassword"]);
        console.log(credentials);
        return true;
    }
    catch {
        console.log("ERROR SINGUP");
        return false;
    }
}

export const ChangeEmail = async (credentials: any) => {
    try {
        //await axiosInstance.post('/changeEmail', credentials);
        return true;
    }
    catch {
        console.log("ERROR SINGUP");
        return false;
    }
}

export const ChangeUsername = async (dispatch: any, credentials: any) => {
    try {
        //await axiosInstance.post('/changeUsername', credentials);
        return true;
    }
    catch {
        console.log("ERROR SINGUP");
        return false;
    }
}

