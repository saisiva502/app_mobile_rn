import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import config from '../config';
import MainWrapper from '../components/MainWrapper';
import OurPartners from '../components/OurPartners';
import Footer from '../components/Footer';


export default class OruPartnersScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: config.I18n.t('main_menu.our_partners', {locale: navigation.state.params.locale})
  });

  render() {
    return (
      <MainWrapper
        navigation={this.props.navigation}
        locale={this.props.locale}
      >
        <View style={styles.screenContainer}>
          <OurPartners
            navigation={this.props.navigation}
            locale={this.props.navigation.state.params.locale}
          />
        </View>
      </MainWrapper>
    );
  }
}


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 10,
  }
});