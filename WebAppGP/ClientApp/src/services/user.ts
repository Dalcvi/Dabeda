import { UserActionCreators } from "../store/actions/UserActions";
import { ProgramsActionCreators } from "../store/actions/ProgramsActions";
import { DaysActionCreators } from "../store/actions/DaysActions";
import { ExercisesActionCreators } from "../store/actions/ExercisesActions";
import { CompletedExercisesCreators } from "../store/actions/CompletedExercisesActions";
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: `https://localhost:44356/api/Programs`
});

axiosInstance.interceptors.request.use(config => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});



// URL to backend
const baseURL = `https://localhost:44356/api/Programs`;


// Used to get Exercise programs from backend database
export const GetInfo = async (dispatch: any) => {
    try {
        const { data } = await axiosInstance.get('/getUserInfo')
        dispatch(UserActionCreators.setUsername(data.username));
        dispatch(ProgramsActionCreators.setPrograms(data.programs));
        dispatch(DaysActionCreators.setDays(data.days));
        dispatch(ExercisesActionCreators.setExercises(data.exercises));
        return await data.username;
    }
    catch (error) {
        console.log(error);
    }
}

// Creates a new program
export const AddProgram = async (dispatch: any, fakeId: number, name: string) => {
    try {
        const toSend = { Name: name };
        const { data } = await axiosInstance.post('/addProgram', toSend);
        dispatch(ProgramsActionCreators.addProgram({ id: data.id, name: name }))
    }
    catch (error) {
        console.log(error);
    }
}

export const EditProgram = async (dispatch: any, id: number, name: string) => {
    try {
        console.log(id);
        console.log(name);
        const toSend = { id: id, Name: name };
        await axiosInstance.post('/editProgram', toSend);

        dispatch(ProgramsActionCreators.editProgram({ id: id, name: name }))
    }
    catch {
        console.log("Couldn't edit program!");
    }
}

export const DeleteProgram = async (dispatch: any, deleteId: number) => {
    try {
        const toSend = { id: deleteId }
        await axiosInstance.post('/deleteProgram', toSend);
        dispatch(ProgramsActionCreators.deleteProgram({ id: deleteId }));
        DeleteDayByProgram(dispatch, deleteId);
        DeleteExerciseByProgram(dispatch, deleteId);
    }
    catch {
        console.log("Couldn't delete program!");
    }
}

export const AddDay = async (dispatch: any, fakeId: number, name: string, programId: number) => {
    try {
        console.log(programId);
        const toSend = { Name: name, Program: programId };
        const { data } = await axiosInstance.post('/addDay', toSend);
        dispatch(DaysActionCreators.addDay({ id: data.id, name: name, program: programId }));
    }
    catch {
        console.log("Couldn't add day!");
    }
}

export const EditDay = async (dispatch: any, dayId: number, name: string, programId: number) => {
    try {
        console.log(name);
        const toSend = { id: dayId, Name: name };
        await axiosInstance.post('/editDay', toSend);
        dispatch(DaysActionCreators.editDay({ id: dayId, name: name, program: programId }));
    }
    catch {
        console.log("Couldn't edit day!");
    }
}

export const DeleteDay = async (dispatch: any, deleteId: number) => {
    try {
        const toSend = { id: deleteId };
        await axiosInstance.post('/deleteDay', toSend)
        dispatch(DaysActionCreators.deleteDay({ id: deleteId }));
        DeleteExerciseByDay(dispatch, deleteId);
    }
    catch {
        console.log("Couldn't delete day!");
    }
}

export const DeleteDayByProgram = async (dispatch: any, deleteProgramId: number) => {
    try {
        dispatch(DaysActionCreators.deleteByProgram({ program: deleteProgramId }))
    }
    catch {
        console.log("Couldn't delete exercises by day!")
    }
}

export const AddExercise = async (dispatch: any, fakeId: number, name: string, amount: number, day: number, program: number) => {
    try {
        console.log(program);
        const toSend = { Name: name, setsAmount: amount, Day: day };
        const { data } = await axiosInstance.post('/addExercise', toSend);
        dispatch(ExercisesActionCreators.addExercise({ id: data.id, name: name, setsAmount: amount, day: day, program: program }));
    }
    catch {
        console.log("Couldn't add exercise!");
    }
}

export const EditExercise = async (dispatch: any, id: number, name: string, amount: number, day: number, program: number) => {
    try {
        const toSend = { id: id, Name: name, setsAmount: amount };
        await axiosInstance.post('/editExercise', toSend);
        dispatch(ExercisesActionCreators.editExercise({ id: id, name: name, setsAmount: amount, day: day, program: program }));
    }
    catch {
        console.log("Couldn't edit exercise!");
    }
}

export const DeleteExercise = async (dispatch: any, deleteId: number) => {
    try {
        const toSend = { id: deleteId };
        await axiosInstance.post('/deleteExercise', toSend);

        dispatch(ExercisesActionCreators.deleteExercise({ id: deleteId }));
    }
    catch {
        console.log("Couldn't delete exercise!");
    }
}

export const DeleteExerciseByDay = async (dispatch: any, deleteDayId: number) => {
    try {
        dispatch(ExercisesActionCreators.deleteByDay({ day: deleteDayId }));
    }
    catch {
        console.log("Couldn't delete exercises by day!")
    }
}

export const DeleteExerciseByProgram = async (dispatch: any, deleteProgramId: number) => {
    try {
        dispatch(ExercisesActionCreators.deleteByProgram({ program: deleteProgramId }))
    }
    catch {
        console.log("Couldn't delete exercises by day!")
    }
}

export const SendCompletedExercises = async (dispatch: any, completedExercises: []) => {
    try {
        const { data } = await axiosInstance.post('/registerExercise', completedExercises);
        console.log(data);
        dispatch(CompletedExercisesCreators.setCompletedExercisesAction(data as []));
    }
    catch {
        console.log("Couldn't save progress!")
    }

}

export const GetDay = async (dispatch: any, dayId: number) => {
    try {
        //const { data } = await axiosInstance.post('/registerExercise', completedExercises);
        const { data } = await axiosInstance.get('/day', { params: { dayId } });
        dispatch(CompletedExercisesCreators.setCompletedExercisesAction(data as []));
    }
    catch {
        console.log("Couldn't save progress!")
    }
}