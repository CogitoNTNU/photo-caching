import React, { useState, useCallback, useMemo, useRef } from 'react';
import { FlatList, TouchableOpacity, Text, View, Image} from 'react-native'
import tw from 'tailwind-react-native-classnames'
import MapView, { Circle, Marker, AnimatedRegion } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';

const Map = (props) => {
    const mapRef = useRef(null)
    const navigation = useNavigation();
    const [mapRegion, setRegion] = useState({
        latitude: 63.4346,
        longitude: 10.3985,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const markerPress = (n) => {
        props.handleMapMarkerPress(n);
        const newCamera = {
            center: { 
                latitude: n.lat-0.00058,
                longitude: n.lng
            },
            zoom: 17.8,
            heading: 0,
            pitch: 0
        }
        mapRef.current.animateCamera(newCamera, { duration: 200 });
    }

    const mapRegionChange = (e) => {
        setRegion(e);
    }

    const customMapStyle = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#6195a0"
                }
            ]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "lightness": "0"
                },
                {
                    "saturation": "0"
                },
                {
                    "color": "#f5f5f2"
                },
                {
                    "gamma": "1"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
                {
                    "lightness": "-3"
                },
                {
                    "gamma": "1.00"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#bae5ce"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fac9a9"
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#4e4e4e"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#787878"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "hue": "#0a00ff"
                },
                {
                    "saturation": "-77"
                },
                {
                    "gamma": "0.57"
                },
                {
                    "lightness": "0"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#43321e"
                }
            ]
        },
        {
            "featureType": "transit.station.rail",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "hue": "#ff6c00"
                },
                {
                    "lightness": "4"
                },
                {
                    "gamma": "0.75"
                },
                {
                    "saturation": "-68"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#eaf6f8"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#c7eced"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "lightness": "-49"
                },
                {
                    "saturation": "-53"
                },
                {
                    "gamma": "0.79"
                }
            ]
        }
    ]

    return (
        <MapView
            customMapStyle={customMapStyle}
            provider={'google'}
            ref={mapRef}
            style={tw`flex-1`}
            initialRegion={mapRegion}
            mapType={'standard'}
            showsUserLocation
            showsCompass
            showsPointsOfInterest={false}
            pitchEnabled={false}
            toolbarEnabled={false}
            onRegionChange={mapRegionChange}
        >
            {props.markers.map((prop, key) => {
                return (
                    <View key={key}>
                        <Marker
                            anchor={{x: .5, y: .5}}
                            key={`marker-${key}`}
                            coordinate={{
                                latitude: prop.lat,
                                longitude: prop.lng,
                            }}
                            onPress={()=>{markerPress(prop)}}
                        >
                            <Image
                                style={{
                                    borderRadius:100,
                                    width: 70,
                                    height: 70,
                                    resizeMode: "cover",
                                    borderColor:'rgba(255, 255, 255,.8)',
                                    borderWidth: 3,
                                }}
                                source={{
                                    uri: prop.img
                                }}
                            />
                        </Marker>
                        <Circle
                            center={{
                                latitude: prop.lat,
                                longitude: prop.lng,
                            }}
                            radius={40}
                            fillColor={"rgba(26, 188, 156,.4)"}
                            strokeColor={"rgba(26, 188, 156,.9)"}
                            strokeWidth={2}
                        />
                </View>
                );
            })}
        </MapView>
    )
}

export default Map
