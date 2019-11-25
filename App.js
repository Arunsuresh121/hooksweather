import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Weather from './components/Weather';
import { API_KEY } from './utils/WeatherApiKey';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'No location',
      isLoading: false,
      temperature: 0,
      pressure:0,
      humidity:0,
      weatherCondition: 'Default',
      error: null
    };

    this.locationUpdated = this.locationUpdated.bind(this);
  }

  componentDidMount() {
    this.fetchWeather();
    Geolocation.getCurrentPosition(this.locationUpdated, console.log, {
      maximumAge: 10000,
      enableHighAccuracy: false,
    });
  }

  locationUpdated(location) {
    console.log(location);
    this.setState({
      location: `Longitude: ${location.coords.longitude}, Latitude: ${location.coords.latitude}`,
    });
  }

  fetchWeather(lat = 25, lon = 25) {
    console.log('a')
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
        .then(res => res.json())
        .then(json => {
            this.setState({
                temperature: json.main.temp,
                pressure: json.main.pressure,
                humidity: json.main.humidity,
                weatherCondition: json.weather[0].main,
                isLoading: false
                  
            });
        });
       
}

  render() {
    const {location,temperature,pressure,humidity,weatherCondition, isLoading} = this.state;
    return (

            <View style={styles.container}>
                           <Text>{location}</Text>
                  { isLoading ? <Text>Fetching Weather Data</Text> : 
                      <Weather weather={ weatherCondition } temperature={ temperature }  pressure={pressure} humidity={humidity}/> }
            </View>
   
   
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});


export default App;
