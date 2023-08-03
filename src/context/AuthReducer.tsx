import { Usuario } from "../interfaces/appInterfaces"

export interface AuthState {
    status: 'validating' | 'authenticated' | 'notAuthenticated'
    token: string | null,
    errorMessage: string,
    user: Usuario | null,
}
type AuthAction =
    | { type: 'signUp', payload: { token: string, user: Usuario } }
    | { type: 'addError', payload: string}
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logOut' }

export const authReducer = ( state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "addError":
            return{
                ...state,
                user: null,
                status: 'notAuthenticated',
                token: null,
                errorMessage: action.payload
            }

        case "logOut":
        case "notAuthenticated":
            return {
                ...state,
                status: 'notAuthenticated',
                token: null,
                user: null,
            }

        case "removeError":
            return {
                ...state,
                errorMessage: ''
            }

        case "signUp":
            return{
                ...state,
                errorMessage: '',
                status: "authenticated",
                token: action.payload.token,
                user: action.payload.user
            }
    
        default:
            return state;
    }
}