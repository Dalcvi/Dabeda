import axios from 'axios';
import { AuthActionCreators as AuthAction } from "../store/actions/AuthActions";
import { UserActionCreators } from "../store/actions/UserActions";

const axiosInstance = axios.create({
    baseURL: `https://localhost:44356/api/Settings`
});

axiosInstance.interceptors.request.use(config => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

interface token {
    token: string;
}


export const ChangePassword = async (credentials: any) => {
    try {
        await axiosInstance.post('/changePassword', credentials);
        return true;
    }
    catch {
        console.log("ERROR SINGUP");
        return false;
    }
}

export const ChangeEmail = async (credentials: any) => {
    try {
        await axiosInstance.post('/changeEmail', credentials);
        return true;
    }
    catch {
        console.log("ERROR SINGUP");
        return false;
    }
}

export const ChangeUsername = async (dispatch: any, credentials: any) => {
    try {
        const { data } = await axiosInstance.post('/changeUsername', credentials);
        dispatch(AuthAction.authenticate({ token: (data as token).token }));
        dispatch(UserActionCreators.setUsername(credentials.username));
        return true;
    }
    catch {
        console.log("ERROR SINGUP");
        return false;
    }
}

