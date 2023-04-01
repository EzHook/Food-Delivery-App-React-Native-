import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/solid';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../slice/restaurantSlice';


const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {params : {
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
  }} = useRoute();

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown: false,
    });
  },[]);

  useEffect(()=>{
    dispatch(setRestaurant({
      id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
    }))
  },[])

  return (<>
  <BasketIcon />
    <ScrollView>
      <View className="relative">
        <Image
        source={{
          uri : urlFor(imgUrl).url(),
        }}
        className="w-full h-56 bg-gray-400 p-4"
         />
         <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-14 p-2 left-5 
         bg-gray-100 rounded-full">
          <ArrowLeftIcon size={20} color="#62CDFF"
          />
         </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flew-row space-x-2 my-1">
            <View className="flex-row items-center space-x-1">
                <StarIcon size={22} color="green" opacity={0.5} />
                  <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}
                </Text> . {genre}
              </Text>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon size={22} color="gray" opacity={0.4} />
                <Text className="text-xs text-gray-500">Nearby . {address}</Text>
              </View>
            </View>
          </View>
          <Text className="text-xs text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>
        <TouchableOpacity className="flex-row items-center p-4 space-x-2 border-y border-gray-300 ">
          <QuestionMarkCircleIcon size={20} color="gray" opacity={0.6} />
          <Text className="font-bold pl-2 flex-1">Have a food allergy?</Text>
          <ChevronRightIcon color="#62CDFF" />
        </TouchableOpacity>
      </View>
      <View className="pb-36">
        <Text className="font-bold text-xl px-4 pt-6 mb-3">Menu</Text>

       {/*  Dishes */}

        { dishes?.map((dish)=>{
          return (<DishRow
          key={dish._id}
          id={dish._id}
          name={dish.name}
          description={dish.short_description}
          price={dish.price}
          image={dish.image}
           />);
        })}

      </View>
    </ScrollView>
    </>
  )
}

export default RestaurantScreen