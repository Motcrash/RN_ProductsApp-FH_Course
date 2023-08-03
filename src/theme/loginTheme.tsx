import { StyleSheet } from 'react-native'

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20
    },
    label: {
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22
    },
    inputField: {
        color: 'white',
        fontSize: 20
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    logButton: {
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
    },
    logButtonText: {
        fontSize: 18,
        color: 'white'
    },
    signButtonContainer: {
        alignItems: 'flex-end',
        marginTop: 18
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
    }
});