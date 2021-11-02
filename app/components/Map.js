import React from 'react'
import { FlatList, TouchableOpacity, Text, View, Image} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';

const Map = (props) => {
    const navigation = useNavigation();

    const markerPress = (n) => {
        console.log(n)
        navigation.navigate('Cam')
    }

    return (
        <MapView
            style={tw`flex-1`}
            initialRegion={{
                latitude: 63.4346,
                longitude: 10.3985,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {props.markers.map((prop, key) => {
                return (
                    <Marker
                        key={key}
                        coordinate={{
                            latitude: prop.lat,
                            longitude: prop.lng,
                        }}
                    >
                        <TouchableOpacity
                            onPress={()=>{markerPress(prop)}}
                        >
                        <Image
                            style={{
                                borderRadius:100,
                                width: 80,
                                height: 80,
                                resizeMode: "cover"
                            }}
                            source={{
                                uri: prop.img
                            }}
                        />
                        </TouchableOpacity>
                    </Marker>
                );
            })}
        </MapView>
    )
}

export default Map
