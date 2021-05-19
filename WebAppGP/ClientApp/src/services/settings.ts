import axios from "axios";
import { AuthActionCreators as AuthAction } from "../store/actions/AuthActions";
import { UserActionCreators } from "../store/actions/UserActions";

const axiosInstance = axios.create({
  baseURL: `https://localhost:44356/api/Settings`,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    authorization: "Bearer " + sessionStorage.getItem("token"),
  };
  return config;
});

interface token {
  token: string;
}

export const ChangePassword = async (credentials: any) => {
  return axiosInstance
    .post("/changePassword", credentials)
    .then((result) => result.status)
    .catch((e) => (e.response ? e.response.status : 500));
};

export const ChangeEmail = async (credentials: any) => {
  return axiosInstance
    .post("/changeEmail", credentials)
    .then((result) => result.status)
    .catch((e) => (e.response ? e.response.status : 500));
};

export const ChangeUsername = async (dispatch: any, credentials: any) => {
  try {
    const { data } = await axiosInstance.post("/changeUsername", credentials);
    dispatch(AuthAction.authenticate({ token: (data as token).token }));
    dispatch(UserActionCreators.setUsername(credentials.username));
    return true;
  } catch {
    console.log("ERROR SINGUP");
    return false;
  }
};
