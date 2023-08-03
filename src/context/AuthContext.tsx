import React, { createContext, useEffect, useReducer } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginResponse, Usuario, LoginData, SignUpData } from '../interfaces/appInterfaces';
import { AuthState, authReducer } from "./AuthReducer";
import productsApi from "../api/productsApi";

type AuthContextProps = {
    errorMessage: string,
    token: string | null,
    user: Usuario | null,
    status: 'validating' | 'authenticated' | 'notAuthenticated'
    signUp: ( signUpData: SignUpData) => void,
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

    useEffect(() => {
        AsyncStorage.getItem('token')
            .then( token => {
                console.log(token);
            }).catch( err => {
                console.log({ err });
            })
    }, []);

    useEffect(() => {
      checkToken();
    }, [])
    

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');

        if( !token ) return dispatch({ type: 'notAuthenticated'})

        const resp = await productsApi.get('/auth', )

        if( resp.status !== 200 ) return dispatch({ type: 'notAuthenticated'})

        dispatch({ type: 'signUp', payload: {
            token: resp.data.token,
            user: resp.data.usuario
        }})    

    }

    const [ state, dispatch ] = useReducer( authReducer, authInitialState )

    const signIn = async({ correo, password }: LoginData) => {

        try {
            const { data } = await productsApi.post<LoginResponse>('/auth/login', { correo, password })
            dispatch({ type: 'signUp', payload: {
                token: data.token,
                user: data.usuario
            }})
            await AsyncStorage.setItem('token', data.token);
        } catch ( error: any ) {
            dispatch({ type: 'addError', payload: error.response.data.msg || `There's already an account with this email`})
        }

    };
    const signUp = async({ correo, nombre, password}: SignUpData) => {
        try {
            const { data } = await productsApi.post<LoginResponse>('/usuarios', { correo, password, nombre })
            dispatch({ type: 'signUp', payload: {
                token: data.token,
                user: data.usuario
            }})
            await AsyncStorage.setItem('token', data.token);
        } catch ( error: any ) {
            console.log(error.response.data);
            dispatch({ type: 'addError', payload: error.response.data.errors[0].msg || 'Please check your data'})
        }
    };


    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logOut'})
    };
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