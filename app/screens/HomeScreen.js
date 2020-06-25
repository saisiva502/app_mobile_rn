import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import MainWrapper from '../components/MainWrapper';
import MainMenu from '../components/MainMenu';
import MainFooter from '../components/MainFooter';

// import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';


export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <MainWrapper navigation={this.props.navigation} tab={"0"} locale={this.props.navigation.state.params.locale}>
        <View>
          <MainMenu
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
    flex: 11,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 5,
  }
});