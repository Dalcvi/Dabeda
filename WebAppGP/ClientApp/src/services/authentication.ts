import axios from 'axios';
import { AuthActionCreators as AuthAction } from "../store/actions/AuthActions";
import { GetInfo } from "./user";

const axiosInstance = axios.create({
    baseURL: `https://localhost:44356/Authorization`
});

interface AuthenticatedUser {
    username: string;
    token: string;
    id: string;
}

export const SignUp = async (dispatch: any, credentials: any) => {
    try {
        const { data } = await axiosInstance.post('/signup', credentials);
        dispatch(AuthAction.authenticate({ token: (data as AuthenticatedUser).token }));
        GetInfo(dispatch);
    }
    catch {
        console.log("ERROR SINGUP");
    }
}

export const SignIn = async (dispatch: any, credentials: any) => {

        return axiosInstance.post('/signin', credentials).then(result => {
            dispatch(AuthAction.authenticate({ token: (result.data as AuthenticatedUser).token }));
            GetInfo(dispatch);
            return result.status;
        }).catch(e => e.response ? e.response.status : 500);
    }

export const Logout = (dispatch: any) => {
    try {
        console.log("123321");
        dispatch(AuthAction.logout());
    }
    catch {
        console.log("ERROR LOGOUT");
    }
}