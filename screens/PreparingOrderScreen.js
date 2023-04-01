import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {

    const navigation = useNavigation();

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Delivery');
        }, 4000)
    },[]);

  return (
    <SafeAreaView className="bg-[#39B5E0] flex-1 justify-center items-center p-7">
        <Animatatable.Image
            source={require('../assets/Delivery.gif')}
            animation="slideInUp"
            iterationCount={1}
            className="h-100 w-100"
         />
         <Animatatable.Text
            animation="slideInUp"
            iterationCount={1}
            className="text-white font-bold text-lg my-10 text-center"
         >
            Waiting for Restaurant to accept your order!
         </Animatatable.Text>
         <Progress.Circle size={40} indeterminate={true} color="white" />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen