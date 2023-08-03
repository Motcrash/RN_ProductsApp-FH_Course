import React, { useContext, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert} from 'react-native'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyles } from '../theme/loginTheme'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessage, removeError } = useContext(AuthContext)

    useEffect(() => {
      if( errorMessage.length === 0 ) return

      Alert.alert('Incorrect login', errorMessage, [{ text: 'Ok', onPress: removeError}]);
    }, [ errorMessage ])
    

    const { email, password, onChange} = useForm({
        email: '',
        password: ''
    });

    const onLogin = () => {
        Keyboard.dismiss();

        signIn({ correo: email, password});
    }

    return (
       <>
            <Background/>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >

                <View style={ loginStyles.formContainer }>

                    <WhiteLogo/>
                    
                    <Text style={ loginStyles.title }>Login</Text>

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
                            onPress={ ( ) => onLogin() }
                        >
                            <Text style={ loginStyles.logButtonText }>
                                Log in
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={ loginStyles.signButtonContainer}>
                        <TouchableOpacity
                            activeOpacity={ 0.9 }
                            onPress={() => navigation.replace('RegisterScreen')}
                        >
                            <Text style={ loginStyles.logButtonText }>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
       </>
    )
}