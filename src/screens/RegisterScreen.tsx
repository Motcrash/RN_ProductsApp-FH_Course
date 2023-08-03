import React from 'react'
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps <any, any> {}

export const RegisterScreen = ({ navigation }: Props) => {

    const { email, password, onChange} = useForm({
        email: '',
        password: '',
        name: ''
    });

    const onRegister = () => {
        Keyboard.dismiss();
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

                    onChangeText={( value ) => onChange(value, 'email')}
                    value={ email }

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
                        onPress={ ( ) => onRegister() }
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