import React, { useEffect, } from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps <any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {

    const { signUp, errorMessage, removeError} = useContext( AuthContext )

    useEffect(() => {
        if( errorMessage.length === 0 ) return
  
        Alert.alert('Incorrect login', errorMessage, [{ text: 'Ok', onPress: removeError}]);
      }, [ errorMessage ])

    const { name, email, password, onChange} = useForm({
        email: '',
        password: '',
        name: ''
    });

    const onRegister = () => {
        console.log({email, password, name});
        
        Keyboard.dismiss();
        signUp({
            nombre: name,
            correo: email, 
            password 
        });
    }

   return (
    <>
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: '#5856D6'}}
        >

            <View style={ loginStyles.formContainer }>

                <WhiteLogo/>
                
                <Text style={ loginStyles.title }>Sign up</Text>

                <Text style={ loginStyles.label }>Name: </Text>
                <TextInput
                    placeholder='Type your name'
                    placeholderTextColor={ 'rgba( 255,255,255,0.8) '}
                    keyboardType='email-address'
                    underlineColorAndroid='white'
                    style={ loginStyles.inputField }
                    selectionColor='white'

                    onChangeText={( value ) => onChange(value, 'name')}
                    value={ name }

                    autoCapitalize='words'
                    autoCorrect={ false }
                />

                <Text style={ loginStyles.label }>Email: </Text>
                <TextInput
                    placeholder='example@gmail.com'
                    placeholderTextColor={ 'rgba( 255,255,255,0.8) '}
                    keyboardType='email-address'
                    underlineColorAndroid='white'
                    style={ loginStyles.inputField }
                    selectionColor='white'
                    autoCapitalize='none'
                    autoCorrect={ false }
                    onChangeText={( value ) => onChange(value, 'email')}
                    value={ email }
                />

                <Text style={ loginStyles.label }>Password: </Text>
                <TextInput
                    placeholder='Type your password'
                    placeholderTextColor={ 'rgba( 255,255,255,0.8) '}
                    underlineColorAndroid='white'
                    style={ loginStyles.inputField }
                    selectionColor='white'
                    autoCapitalize='none'
                    autoCorrect={ false }
                    secureTextEntry
                    onChangeText={( value ) => onChange(value, 'password')}
                    value={ password }
                />

                <View style={ loginStyles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={ 0.9 }
                        style={ loginStyles.logButton }
                        onPress={ onRegister }
                    >
                        <Text style={ loginStyles.logButtonText }>
                            Create account
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={ () => navigation.replace('LoginScreen')}
                    activeOpacity={ 0.8}
                    style={ loginStyles.backButton }
                >
                    <Icon
                        name= 'arrow-back-outline'
                        size={ 45 }
                        color= 'white'
                    />
                </TouchableOpacity>

                    </View>

        </KeyboardAvoidingView>
    </>
   )
}