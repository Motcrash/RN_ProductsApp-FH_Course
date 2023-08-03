import React from 'react'
import { View, Text, Dimensions } from 'react-native'

export const Background = () => {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
   return (
        <View style = {{
            width: windowWidth,
            height: windowHeight, 
            position: 'absolute'
        }}>
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#5856D6',
                width: windowWidth,
                height: windowHeight,
        }}
        />

        <View
            style={{
                position: 'absolute',
                backgroundColor: 'white',
                width: 300,
                height: 500,
                transform: [
                    { rotateZ: '-70deg'}
                ],
                bottom: -250
            }}
        />
       </View>
            
   )
}