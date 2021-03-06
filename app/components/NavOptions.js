import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { FlatList, TouchableOpacity, Text, View, Image} from 'react-native'
import tw from 'tailwind-react-native-classnames'

const data = [
    {
        id: "123",
        title: "Lorem ipsum",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen"
    },
    {
        id: "456",
        title: "Lorem ipsum",
        image: "https://links.papareact.com/28w",
        screen: "InfoScreen"
    }
]

const NavOptions = () => {
    const navigation = useNavigation();
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                    onPress={()=> navigation.navigate('Map')}
                >
                    <View>
                        {/*
                        <Image
                            style={{
                                width: 120,
                                height: 120,
                                resizeMode: "contain"
                            }}
                            source={{
                                uri: item.image
                            }}
                        />
                        */}
                        <Text
                            style={
                                tw`mt-2 text-lg font-semibold`
                            }
                        >
                            {item.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default NavOptions
