import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  I18nManager,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation'

import OneSignal from 'react-native-onesignal'; // Import package from node modules

import config from '../config';
import MainWrapper from '../components/MainWrapper';
import Logo from '../components/Logo';
import RNRestart from 'react-native-restart';
import _ from 'lodash';

export default class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    OneSignal.init("d5e9e3d9-9534-4ad1-bad2-124a65ed3862", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

  }

  componentWillMount() {                                                                                                                                                                                                                                                            
    this.timeouts = [];
    StatusBar.setHidden(true);
    let localePath = 'props.navigation.state.params.locale';
    this.locale = _.get(this, localePath, config.DEFAULT_LOCALE);

    AsyncStorage.getItem('@O3:locale', (err, locale) => {
      if (locale !== null) {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'Home',
              params: { locale: locale }
            })
          ]
        }))
      }else{
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: 'LanguagesScreen',
            })
          ]
        }))
      }
    });

  }

  // myiOSPromptCallback(permission){
  //   co
  // }

  componentWillUnmount() {
    StatusBar.setHidden(true);
    this.timeouts.forEach(clearTimeout);
  }



  render() {
    return (
      <View style={styles.welcomeContainer}>
        <Image source={require('../images/backgrounds/light.jpg')} style={styles.backgroundImage}/>
        <Logo />
        <View>
          {/*
          <TouchableOpacity style={styles.formButton} onPress={() => navigate('Home')}>
            <Text style={styles.buttonText}>FTTH User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.formButton} onPress={() => navigate('RequestInstallation')}>
            <Text style={styles.buttonText}>Request Installation</Text>
          </TouchableOpacity>
          */}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 10,
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'cover', // or 'stretch'
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