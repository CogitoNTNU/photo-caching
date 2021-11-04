import React, { useState, useCallback, useMemo, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, Image} from 'react-native';
import tw from "tailwind-react-native-classnames";
import Map from '../components/Map';

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const markers = [
  {
      id: 1,
      text: 'Samf',
      img: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Studentersamfundet_i_Trondhjem%2C_front.jpeg',
      lat: 63.422407,
      lng: 10.394986
  },
  {
      id: 2,  
      text: 'Gløs',
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/NTNU_Trondheim_Mainbuilding.jpg/240px-NTNU_Trondheim_Mainbuilding.jpg',
      lat: 63.4346,
      lng: 10.3985
  }
]

const MapScreen = () => {
  const [viewMapMarkerSheet, setViewMapMarkerSheet] = useState(-1);

    // hooks
    const sheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ["50%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
      console.log("handleSheetChange", index);
    }, []);

    const handleSnapPress = useCallback((index) => {
      sheetRef.current?.snapToIndex(index);
    }, []);

    const handleClosePress = useCallback(() => {
      sheetRef.current?.close();
      setViewMapMarkerSheet(-1)
    }, []);

    const handleMapMarkerPress = (e) => {
        console.log(e);
        setViewMapMarkerSheet(0)
    }

    return (
        <View style={tw`h-full`}>
          <Map markers={markers} handleMapMarkerPress={handleMapMarkerPress}/>
          <BottomSheet
            index={viewMapMarkerSheet}
            ref={sheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            onClose={handleClosePress}
            enablePanDownToClose
            style={styles.contentContainer}
          >
            <BottomSheetView>
              <Text>Awesome 🔥</Text>
            </BottomSheetView>
          </BottomSheet>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 20
    },
    contentContainer: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
  });
  
