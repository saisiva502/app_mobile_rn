import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import config from '../config';

import MainWrapper from '../components/MainWrapper';
import PartnerInfo from '../components/PartnerInfo';


export default class ContactPageScreen extends Component {
  static navigationOptions = {
    title: 'Need Help ?'
  };

  render() {
    let locale = (this.props.navigation.state.params.locale) ? this.props.navigation.state.params.locale : this.props.locale;

    return (
      <MainWrapper navigation={this.props.navigation} tab={"2"} locale={this.props.navigation.state.params.locale}>
        <View>
          <PartnerInfo
            navigation={this.props.navigation}
            locale={locale}
          />
        </View>
      </MainWrapper>
    );
  }
}