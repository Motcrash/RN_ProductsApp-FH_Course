import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { MainStack } from './src/navigation/MainStackNav';
import { AuthProvider } from './src/context/AuthContext';

interface Children {
    children: React.JSX.Element
}

const AppState = ({ children}: Children ) => {
    return(
        <AuthProvider>
            { children }
        </AuthProvider>
    )
}

const App = () => {
   return (
       <NavigationContainer>
            <AppState>
                <MainStack/>
            </AppState>
       </NavigationContainer>
   )
}

export default App;