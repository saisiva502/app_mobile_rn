import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
  I18nManager,
  AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation'


import config from '../config';
import MainWrapper from '../components/MainWrapper';
import Logo from '../components/Logo';
import RNRestart from 'react-native-restart';
import _ from 'lodash';


export default class LanguagesScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      locale: ''
    }
    // this.setLanguage = this.setLanguage.bind(this)
  }


  // componentWillMount() {
  //   this.timeouts = [];
  //   StatusBar.setHidden(true);
  //   let localePath = 'props.navigation.state.params.locale';
  //   this.locale = _.get(this, localePath, config.DEFAULT_LOCALE);

  //   if (_.has(this, localePath)) {
  //     AsyncStorage.setItem('@O3:locale', this.locale, (err, result) => {
  //       this.timeouts.push(setTimeout(() => {
  //         RNRestart.Restart();
  //       }, 2000));
  //     });
  //   }

  //   AsyncStorage.getItem('@O3:locale', (err, locale) => {
  //     if (locale !== null) { this.locale = locale; }
  //     I18nManager.forceRTL(!(config.LTR_LOCALES.includes(this.locale)));
  //     this.timeouts.push(setTimeout(() => {
  //       this.props.navigation.dispatch(NavigationActions.reset({
  //         index: 0,
  //         actions: [
  //           NavigationActions.navigate({
  //             routeName: 'Home',
  //             params: { locale: this.locale }
  //           })
  //         ]
  //       }))
  //     }, 1000));
  //   });
  // }

  // componentWillUnmount() {
  //   StatusBar.setHidden(true);
  //   this.timeouts.forEach(clearTimeout);
  // }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.welcomeContainer}>
        <View style={{height: '100%', width: '100%', top: '40%'}}>
          {
          Object.keys(config.LANGUAGES).map(function (code) {
            let lang = config.LANGUAGES[code];
            let title = config.I18n.t('global.locale', {locale: code});

            return (
              <TouchableOpacity
                key={code}
                style={[styles.gridItem, styleMe(lang.color).itemBG]}
                onPress={()=> setLanguage(code)}
              >
                <Text style={styles.title}>{title}</Text>
              </TouchableOpacity>
            );
          })
        }
        </View>
      </View>
    );
  }
}


let setLanguage = function(lang) {
  AsyncStorage.setItem('@O3:locale', lang, (err, result) => {
    RNRestart.Restart();
  });
}



let styleMe = function(color) {
  return {
    itemBG: {
      backgroundColor: color
    }
  }
};

const styles = StyleSheet.create({
  welcomeContainer: {
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
  },
  gridItem:{
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center'
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});