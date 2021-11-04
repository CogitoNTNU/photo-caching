import React, { useState, useCallback, useMemo, useRef } from 'react';
import { FlatList, TouchableOpacity, Text, View, Image} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import MapView, { Circle, Marker, AnimatedRegion } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';

const Map = (props) => {
    const mapRef = useRef(null)
    const navigation = useNavigation();
    const [mapPaddingBottom, setMapPaddingBottom] = useState(0);
    const [mapRegion, setRegion] = useState({
        latitude: 63.4346,
        longitude: 10.3985,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const markerPress = (n) => {
        //setMapPaddingBottom(400)
        props.handleMapMarkerPress(n);
        const newCamera = {
            center: { 
                latitude: 63.4346,
                longitude: 10.3985 },
            zoom: 14,
            heading: 0,
            pitch: 0,
            altitude: 600
        }
        mapRef.current.animateCamera(newCamera, { duration: 200 });
    }

    const mapRegionChange = (e) => {
        setRegion(e);
        setMapPaddingBottom(0)
    }

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            initialRegion={mapRegion}
            mapType={'standard'}
            showsUserLocation
            showsCompass
            showsPointsOfInterest={false}
            pitchEnabled={false}
            toolbarEnabled={false}
            mapPadding={{bottom:mapPaddingBottom}}
            onRegionChange={mapRegionChange}
        >
            {props.markers.map((prop, key) => {
                return (
                <View key={key}>
                    <Marker
                        coordinate={{
                            latitude: prop.lat,
                            longitude: prop.lng,
                        }}
                        style={{
                            shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 4,
                                },
                                shadowOpacity: 0.40,
                                shadowRadius: 4.65,
                                elevation: 8,
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
                                resizeMode: "cover",
                            }}
                            source={{
                                uri: prop.img
                            }}
                        />
                        </TouchableOpacity>
                    </Marker>
                    <Circle
                        center={{
                            latitude: prop.lat,
                            longitude: prop.lng,
                        }}
                        radius={40}
                        fillColor={"rgba(26, 188, 156,.4)"}
                        strokeColor={"rgba(26, 188, 156,.9)"}
                    />
                </View>
                );
            })}
        </MapView>
    )
}

export default Map
