import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import config from '../config';
import MainWrapper from '../components/MainWrapper';
import Logo from '../components/Logo';


export default class RequestInstallationScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const {goBack} = this.props.navigation;
    return (
      <MainWrapper
        navigation={this.props.navigation}
        locale={this.props.locale}
      >
        <View style={styles.mainContainer}>
          <Logo />
          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.formButton} onPress={() => { goBack() }}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MainWrapper>
    );
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 10,
  },
  formContainer: {
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
    marginTop: 10
  },
  formButton: {
    backgroundColor: '#227799',
    opacity: 0.8,
    padding: 15,
    margin: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: config.DEFAULT_FONT,
  }
});