import React, { Component } from 'react';
import {
  StyleSheet,
  WebView,
  Alert
} from 'react-native';

import config from '../config';


export default class RechargeAccountScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: config.I18n.t('main_menu.quick_recharge', {locale: navigation.state.params.locale})
  });

  componentWillMount() {
    this.timeouts = [];
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout);
  }

  render() {
    const {goBack} = this.props.navigation;
    const locale = this.props.navigation.state.params.locale;

    return (
      <WebView
        source={{uri: `${config.QUICK_RECHARGE_URL}?lang=${locale}&ref=app`}}
        onLoadStart={() => {
          this.timeouts.push(setTimeout(() => {
            goBack();
            Alert.alert( //could not load page, show error popup
              config.I18n.t('global.error'), //title
              config.I18n.t('errors.not_ftth_user'), //content
              [ { text: config.I18n.t('global.ok') } ] //buttons
            );
          }, 3000));
        }}
        onLoad={() => {
          this.timeouts.forEach(clearTimeout)
        }}
        onError={() => { goBack() }}
        renderLoading={this.renderLoading}
        startInLoadingState={true}
      />
    );
  }
}


const styles = StyleSheet.create({

});