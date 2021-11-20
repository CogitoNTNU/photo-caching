import React from 'react'; 

import {View, Pressable, Dimensions, StyleSheet, Text} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width} = Dimensions.get('window')

const TabBar = ({ state, descriptors, navigation}: any) =>{
  return (
    <View style={styles.mainContainer}>


          <View style = {[styles.mainItemContainer, {borderRightWidth: "notes"? 3:0}]}>
            <Pressable
              onPress = {()=>console.log('ok')}
              style = {{opacity: 1, borderRadius: 20, }}>
              <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1, padding: 10}}>
                 <FontAwesome5 name={'map-marker-alt'} size={22} color={'#2c3e50'}/>
                 <Text style={styles.iconText}>
                    Map
                 </Text>
              </View>
            </Pressable>
          </View>
          <View style = {[styles.mainItemContainer, {borderRightWidth: "notes"? 3:0}]}>
            <Pressable
              onPress = {()=>console.log('ok')}
              style = {{opacity: .8, borderRadius: 20, }}>
              <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1, padding: 10}}>
                 <FontAwesome5 name={'check-double'} size={22} color={'#2c3e50'}/>
                 <Text style={styles.iconText}>
                    Catched
                 </Text>
              </View>
            </Pressable>
          </View>
          <View style = {[styles.mainItemContainer, {borderRightWidth: "notes"? 3:0}]}>
            <Pressable
              onPress = {()=>console.log('ok')}
              style = {{opacity: .8, borderRadius: 20, }}>
              <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1, padding: 10}}>
                 <FontAwesome5 name={'user'} size={22} color={'#2c3e50'}/>
                 <Text style={styles.iconText}>
                    Profile
                 </Text>
              </View>
            </Pressable>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    opacity: .82,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginHorizontal: 0,
    paddingBottom: 22,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: -1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 0,
    elevation: 10,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginVertical: 0,
    borderRadius: 1, 
    borderColor: "rgba(0,0,0,0)",
  }, 
  iconText: {
    color: "#2c3e50",
    marginTop: 5,
    fontSize: 12
  }
})


export default TabBar; 