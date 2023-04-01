import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from '../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectBasketItems, selectBasketItemsWithId ,removeFromCart } from '../slice/basketSlice';


const DishRow = ({ id, name, description, price, image }) => {

    const [isPressed, setIsPressed] = useState(false);
    
    const items = useSelector((state) => selectBasketItemsWithId(state, id));
    const dispatch = useDispatch();

    const addItemToCart = () => {
        dispatch(addToCart({ id, name, description, price, image }))
    }

    const removeItemFromCart = () => {
        if(!items.length  > 0) {
            return;
        }
        dispatch(removeFromCart({ id }))
    }


  return (
<>
    <TouchableOpacity onPress={()=>{setIsPressed(!isPressed)}} className={`bg-white border border-gray-200 p-4 ${isPressed && "border-b-0"}`}>
    <View className="flex-row">
        <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">₹ {price}</Text>
        </View>
        <View>
            <Image
                style={{
                    borderWidth: 1,
                    borderColor: "#F3F3F4"
                }}
                source={{
                    uri : urlFor(image).url()
                }}
                className="h-20 w-20 p-4 bg-gray-300"
             />
        </View>
    </View>
    </TouchableOpacity>
    {isPressed && (
        <View className="bg-white px-4">
            <View className="flex-row space-x-2 pb-3 items-center">
                <TouchableOpacity
                 disabled={!items.length}
                 onPress={removeItemFromCart}>
                    <MinusCircleIcon size={40}
                     color={items.length > 0 ? "#62CDFF" : "gray"} />
                </TouchableOpacity>

                <Text>{items.length}</Text>

                
                <TouchableOpacity onPress={addItemToCart}>
                    <PlusCircleIcon size={40} color="#62CDFF" />
                </TouchableOpacity>
            </View>
        </View>
    )}
</>
  )
}

export default DishRow