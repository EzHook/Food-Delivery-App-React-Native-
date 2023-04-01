import { View, Text, SafeAreaView, Image, StyleSheet, StatusBar, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../sanity';


const HomeScreen = () => {

    const[fetchFeatured, setFetchFeatured] = useState([]);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    
    useEffect(()=>{
         client.fetch(`*[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`).then((data)=>{
      setFetchFeatured(data);
    })

    },[]);

  return (
    <SafeAreaView style={Style.AndroidSafeArea} className="bg-white pt-5">
            {/* <Header/> */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image
                source={{
                    uri: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80"
                }}
                className="h-7 w-7 p-4 rounded-full bg-gray-300"
                 />

                 <View className="flex-1">
                    <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
                    <Text className="font-bold text-xl">Current Location
                    <ChevronDownIcon size={20} color="#62CDFFd" />
                    </Text>
                </View>

                <UserIcon size={30} color="#62CDFF" />
            </View>
             
                           {/* <search /> */}
        <View className="flex-row items-center space-x-2 mx-4 pb-2">
            <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                <MagnifyingGlassIcon color="gray" size={20} />
                <TextInput placeholder='Restaurants and cuisines'
                keyboardType='default' />
            </View>
            <AdjustmentsHorizontalIcon color="#62CDFF" />
         </View>

                         {/* <Body /> */}

         <ScrollView>
                {/* <Categories /> */}

                <Categories />

                {/* <Featured /> */}

                { fetchFeatured?.map(category=>{
                  return <FeaturedRow
                key={category._id}
                id= {category._id}
                title={category.name}
                description={category.short_description}
                 />
                }) }

         </ScrollView>
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
})

export default HomeScreen

