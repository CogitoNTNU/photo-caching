import React from 'react'
import { FlatList, TouchableOpacity, Text, View, Image} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import MapView from 'react-native-maps';

const Map = () => {
    return (
        <MapView
            style={tw`flex-1`}
            initialRegion={{
                latitude: 63.4346,
                longitude: 10.3985,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    )
}

export default Map
