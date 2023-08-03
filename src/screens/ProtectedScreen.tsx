import React, { useContext } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

    const { user, token, logOut } = useContext( AuthContext)
   return (
       <View style={ stylesScreen.container}>
            <Text style={ stylesScreen.title }>Protected screen</Text>
            <Button
                title='logout'
                color='#5856D6'
                onPress={ logOut }
            />

            <Text>
                {JSON.stringify( user, null, 5 )}
            </Text>
            <Text>
                { token }
            </Text>
       </View>
   )
}

const stylesScreen = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 20
    }
});