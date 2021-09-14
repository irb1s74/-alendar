import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload: auth}),
    setIsError: (error: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (loading: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload: loading}),

    login: (user_name: string, user_password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            const response = await UserService.getUsers()
            const mockUser = response.data.find(user => user.user_name === user_name && user.user_password === user_password)
            if (mockUser) {
                localStorage.setItem('auth', 'true')
                localStorage.setItem('user', mockUser.user_name)
                dispatch(AuthActionCreators.setUser(mockUser))
                dispatch(AuthActionCreators.setIsAuth(true))
            } else {
                dispatch(AuthActionCreators.setIsError('Некорректный логин или пароль'));
            }
        } catch (e) {
            dispatch(AuthActionCreators.setIsError('Произошла ошибка'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
        dispatch(AuthActionCreators.setIsAuth(false))
        dispatch(AuthActionCreators.setUser({} as IUser))

    }
}