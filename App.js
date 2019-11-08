import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import axios from 'axios'



export default function App() {
  const [restaurants, setRestaurants] = useState([])
  const [region, setRegion] = useState()

  useEffect(() => {
    getRestaurants()
  })

  const getRestaurants = async function () {
    const { data } = await axios.get('https://makeitreal.s3.amazonaws.com/restaurants.json')
    setRegion({
      "latitude": 6.212441468010145,
      "latitudeDelta": 0.017312309942147053,
      "longitude": -75.56225979700685,
      "longitudeDelta": 0.017414577305316925
    })
    setRestaurants(data)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        showsUserLocation
        initialRegion={region}>
        {restaurants.map(restaurant => (
          <Marker
            coordinate={{
              latitude: parseFloat(restaurant.lat),
              longitude: parseFloat(restaurant.long)
            }}
            title={restaurant.name}
            key={restaurant.name}
          />
        ))}
      </MapView>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },
});
