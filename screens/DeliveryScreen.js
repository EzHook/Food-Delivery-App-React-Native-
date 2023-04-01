import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../slice/restaurantSlice';
import { XMarkIcon } from 'react-native-heroicons/solid'
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);


  return (
    <View className="bg-[#39B5E0] flex-1">
        <SafeAreaView className="z-50">
            <View className="flex-row p-8 justify-between items-center">
                <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                    <XMarkIcon size={35} color="white" />
                </TouchableOpacity>
                <Text className="font-light text-white text-lg">Order Help</Text>
            </View>
            <View className="bg-white rounded-md mx-5 my-2 z-50 shadow-md p-5">
                <View className="flex-row justify-between">
                    <View>
                        <Text className="text-gray-400 text-lg">Estimated Delivery</Text>
                        <Text className="font-bold text-3xl">40-55 Minutes</Text>
                    </View>
                    <Image source={{
                        uri: "https://cdn.dribbble.com/users/1226927/screenshots/3934449/ph_dribbble.gif"
                    }}
                    className="h-20 w-20" />
                </View>
                    <Progress.Bar size={30} color="#62CDFF" indeterminate={true} />
                    <Text className="text-gray-500 mt-3">Your order at {restaurant.title} is being prepared</Text>
            </View>
        </SafeAreaView>
        <MapView
        initialRegion={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
        >
            <Marker
             coordinate={{
                latitude: restaurant.lat,
                longitude: restaurant.long,
             }}
             title={restaurant.title}
             description={restaurant.short_description}
             identifier="origin"
             pinColor="#62CDFF"
             />
        </MapView>  
        <SafeAreaView className="flex-row bg-white items-center space-x-5 h-28">
            <Image
            source={{
                uri : "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80"
            }}
            className="h-12 w-12 rounded-full bg-gray-300 p-4 ml-5"
             />
             <View className="flex-1">
                <Text className="text-lg">EzHook</Text>
                <Text className="text-gray-400">Mr Dev.</Text>
             </View>
             <Text className="text-[#39B5E0] text-lg mr-5 font-bold">Call</Text>
        </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen