import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform
} from 'react-native';

import config from '../config';
import MainWrapper from '../components/MainWrapper';
import FindLocation from '../components/FindLocation';


export default class FindLocationScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
      title: config.I18n.t('main_menu.find_location', {locale: navigation.state.params.locale})
  });

  render() {
    let theme = (this.props.navigation.state.params.theme) ? this.props.navigation.state.params.theme : this.props.theme;
    let locale = (this.props.navigation.state.params.locale) ? this.props.navigation.state.params.locale : this.props.locale;
    let defaultLocResData = {};
    let location = (this.props.navigation.state.params.location) ? this.props.navigation.state.params.location : defaultLocResData;

    return (
      <MainWrapper theme={theme}
        navigation={this.props.navigation}
        locale={this.props.locale}
      >
        <View style={styles.screenContainer}>
            <FindLocation
                navigation={this.props.navigation}
                locale={locale}
                location={location}
                theme={theme}
            />
            {/*<FindLocationIOS
                navigation={this.props.navigation}
                locale={locale}
                location={location}
                theme={theme}
            />*/}
        </View>
      </MainWrapper>
    );
  }
}

FindLocationScreen.defaultProps = {
  theme: 'light',
  locale: 'en'
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 5,
  }
});
