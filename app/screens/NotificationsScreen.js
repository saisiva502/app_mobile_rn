import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import config from '../config';
import Notifications from '../components/Notifications';
import MainWrapper from '../components/MainWrapper';


export default class NotificationsScreen extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: config.I18n.t('main_menu.our_services', {locale: navigation.state.params.locale})
  // });
  static navigationOptions = ({ navigation }) => ({
    title: "Notifications"
  });
  // static navigationOptions = {
  //   header: null
  // };

  render() {
    return (
      <MainWrapper navigation={this.props.navigation}
            locale={this.props.navigation.state.params.locale}>
        <View>
          <Notifications navigation={this.props.navigation}
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
