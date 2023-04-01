import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryCard = ({imgURL, title}) => {
  return (
    <View>
        <TouchableOpacity className="relative mr-2">
            <Image source={{
                uri: imgURL,
            }}
            className="w-20 h-20 rounnded" />
            <Text className="absolute bottom-1 left-1 text-white font-bold">{title}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CategoryCard