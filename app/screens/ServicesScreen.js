import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import config from '../config';
import Services from '../components/Services';
import OurServices from '../components/OurServices';
import Footer from '../components/Footer';
import MainWrapper from '../components/MainWrapper';


export default class ServicesScreen extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: config.I18n.t('main_menu.our_services', {locale: navigation.state.params.locale})
  // });
  static navigationOptions = ({ navigation }) => ({
    title: "Services"
  });
  // static navigationOptions = {
  //   header: null
  // };

  render() {
    return (
      <MainWrapper navigation={this.props.navigation}
            locale={this.props.navigation.state.params.locale} tab={"1"}>
        <View>
          <Services navigation={this.props.navigation}
            locale={this.props.navigation.state.params.locale}/>
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
    backgroundColor: 'transparent',
    margin: 5,
  }
});
