import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: loading}),

    login: (user_name: string, user_password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await axios.get<IUser[]>('./users.json');
            const mockUser = response.data.find(user => user.user_name === user_name && user.user_password === user_password)
            console.log(mockUser);
            if (mockUser) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('auth', mockUser.user_name)
                dispatch(AuthActionCreators.setIsAuth(true))
                dispatch(AuthActionCreators.setUser(mockUser))
            } else {
                dispatch(AuthActionCreators.setIsError('Некорректный логин или пароль'));
            }
        } catch (e) {
            dispatch(AuthActionCreators.setIsError('Произошла ошибка'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {

        } catch (e) {

        }
    }
}