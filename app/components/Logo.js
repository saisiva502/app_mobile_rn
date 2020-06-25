import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Logo extends Component {
  render() {
    return(
      <View>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.companyName}>Fiber To The Home</Text>
      </View>
    );
  }
}

const images = {
  logo: require('../images/logo.png'),
}

const styles = StyleSheet.create({
  // backgroundImage: {
  //   resizeMode: 'cover', // or 'stretch'
  // },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    marginTop: '50%'
    // backgroundColor: 'red'
  },
  companyName: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#000000',
    marginTop: -60,
    height: 80
  },
  logo: {
    marginTop: -20,
    width: 200,
    height: 200,
  }
});