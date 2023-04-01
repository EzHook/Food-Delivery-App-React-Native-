import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectCartTotal } from '../slice/basketSlice'
import { useNavigation } from '@react-navigation/native'

const BasketIcon = () => {

    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const cartTotal = useSelector(selectCartTotal);

  if(items.length === 0){
    return null;
  }

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity onPress={()=> navigation.navigate('Cart')} className="bg-[#39B5E0] mx-5 p-4 rounded-lg flex-row space-x-1 items-center">
        <Text className="text-white font-extrabold text-lg bg-[#0081B4] px-2 py-1">{items.length}</Text>
        <Text className="text-white flex-1 text-center text-lg font-extrabold">View Cart</Text>
        <Text className="text-white text-lg font-extrabold">₹ {cartTotal}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon