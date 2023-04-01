import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slice/restaurantSlice';
import { removeFromCart, selectBasketItems, selectCartTotal } from '../slice/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity';

const CartScreen = () => {

  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItemInCart, setGroupedItemInCart] = useState([]);
  const dispatch = useDispatch();

  useEffect(()=>{
    const groupedItems = items.reduce((results, item)=>{
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    },{});
    setGroupedItemInCart(groupedItems);
  }, [items])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#39B5E0] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center p-2">Cart</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>
          <TouchableOpacity
          onPress={navigation.goBack}
          className="rounded-full absolute top-9 bg-gray-100 right-5"
          >
            <XCircleIcon color="#62CDFF" height={50} width={50}  />
          </TouchableOpacity>
        </View>
        <View className="flex-row space-x-4 px-3 py-3 items-center bg-white my-5">
          <Image source={{
            uri:"https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80"
          }}
          className="h-7 w-7 rounded-full p-4 bg-gray-300" 
          />
          <Text className="flex-1">Delivered in 30-50 min</Text>
          <TouchableOpacity onPress={navigation.goBack}>
            <Text className="text-[#39B5E0]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemInCart).map(([key, items])=>(
            <View
             className="flex-row items-center space-x-3 py-2 px-5 bg-white"
             key={key}>
              <Text className="text-[#39B5E0]">{items.length} x</Text>
              <Image
              source={{
                uri: urlFor(items[0]?.image).url()
              }}
              className="h-12 w-12 rounded-full"
               />
               <Text className="flex-1">{items[0]?.name}</Text>
               <Text className="text-gray-600">₹ {items[0]?.price}</Text>
               <TouchableOpacity onPress={()=> dispatch(removeFromCart({ id: key}))}>
                <Text className="text-[#39B5E0]">Remove</Text>
               </TouchableOpacity>
            </View>
            ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between ">
            <Text className="text-gray-400">Sub total</Text>
            <Text className="text-gray-400">₹ {cartTotal}</Text>
          </View>
          <View className="flex-row justify-between ">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">₹ 60</Text>
          </View>
          <View className="flex-row justify-between ">
            <Text className="text-gray-400">Order Total</Text>
            <Text className="font-extrabold">₹ {cartTotal + 60}</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('PreparingOrder')} className="rounded-lg bg-[#39B5E0] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CartScreen