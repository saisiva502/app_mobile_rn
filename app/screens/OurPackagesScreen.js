import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import config from '../config';
import MainWrapper from '../components/MainWrapper';
import OurPackages from '../components/OurPackages';
import Footer from '../components/Footer';


export default class OurPackagesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: config.I18n.t('main_menu.our_packages', {locale: navigation.state.params.locale})
  });

  render() {
    return (
      <MainWrapper
        navigation={this.props.navigation}
        locale={this.props.locale}
      >
        <View>
          <OurPackages
            navigation={this.props.navigation}
            locale={this.props.navigation.state.params.locale}
          />
        </View>
      </MainWrapper>
    );
  }
}


const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'transparent',
    margin: 5,
  }
});