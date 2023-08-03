import React, { createContext, useReducer } from "react";
import { LoginResponse, Usuario, LoginData } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from "./AuthReducer";
import productsApi from "../api/productsApi";

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    user: Usuario | null,
    status: 'validating' | 'authenticated' | 'notAuthenticated'
    signUp: () => void,
    signIn: ( loginData: LoginData) => void,
    logOut: () => void,
    removeError: () => void,
}

const authInitialState: AuthState = {
    status: 'validating',
    token: null,
    errorMessage: '',
    user: null
}

type Children = {
    children: React.JSX.Element
}

export const AuthContext = createContext({} as AuthContextProps );

export const AuthProvider = ({ children }: Children) => {

    const [ state, dispatch ] = useReducer( authReducer, authInitialState )

    const signIn = async({ correo, password }: LoginData) => {

        try {
            const { data } = await productsApi.post<LoginResponse>('/auth/login', { correo, password })
            dispatch({ type: 'signUp', payload: {
                token: data.token,
                user: data.usuario
            }})
        } catch ( error: any ) {
            dispatch({ type: 'addError', payload: error.response.data.msg || 'Incorrect data'})
        }

    };
    const signUp = () => {};
    const logOut = () => {};
    const removeError = () => {
        dispatch({ type: 'removeError'})
    };

    return(
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    )
}