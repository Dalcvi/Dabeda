import axios from 'axios';
import { AuthActionCreators as AuthAction } from "../store/actions/AuthActions";
import { UserActionCreators as UserAction } from "../store/actions/UserActions";

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
        console.log(credentials);
        const { data } = await axiosInstance.post('/signup', credentials);
        dispatch(AuthAction.authenticate({ token: (data as AuthenticatedUser).token }));
        dispatch(UserAction.setUsername((data as AuthenticatedUser).username));
    }
    catch {
        console.log("ERROR SINGUP");
    }
}

export const SignIn = async (dispatch: any, credentials: any) => {
    try {
        const { data } = await axiosInstance.post('/signin', credentials);
        dispatch(AuthAction.authenticate({ token: (data as AuthenticatedUser).token }));
        dispatch(UserAction.setUsername((data as AuthenticatedUser).username));
    }
    catch {
        console.log("ERROR SIGNIN")
    }
}