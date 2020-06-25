import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { StyleProvider, Thumbnail, Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import MainFooter from './MainFooter';
import config from '../config';

export default class MainWrapper extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      current_tab: 0
    }
    this.onNavigation = this.onNavigation.bind(this)
  }

  onNavigation(screen, locale, tab){
    if(tab == 0){
      // this.setState({current_tab: 0})
      this.props.navigation.navigate('Home', {locale: locale})
    }
    if(tab == 1){
      // this.setState({current_tab: 1})
      this.props.navigation.navigate('ServicesScreen', {locale: locale, title: "Services"})
    }
  }


  render() {
    let locale = config.I18n.locale = this.props.locale;
    const { navigate } = this.props.navigation;
    // alert(JSON.stringify(navigate))
    return (
      <View style={styles.container}>  
        <View style={{paddingBottom: 60}}>
          {this.props.children}
        </View>
        <View style={ styles.bottomView} >
          <Grid>
            <Col style={styles.icon}>
              <TouchableOpacity style={styles.icon}
                onPress={() => navigate('Home', {locale: locale})}
              >
                <Icon name="apps" style={this.props.tab == 0 ? {color: '#c92e79'} : {}}/>
                <Text style={this.props.tab == 0 ? {color: '#c92e79'} : {}}>Home</Text>
              </TouchableOpacity>
            </Col>
            <Col style={styles.icon}>
              <TouchableOpacity style={styles.icon}
                onPress={() => navigate('ServicesScreen', {locale: locale, title: "Services"})}
              >
                <Icon name="ios-calendar" style={this.props.tab == 1 ? {color: '#c92e79'} : {}}/>
                <Text style={this.props.tab == 1 ? {color: '#c92e79'} : {}}>Services</Text>
              </TouchableOpacity>
            </Col>
            <Col style={styles.icon}>
              <TouchableOpacity style={styles.icon}
                onPress={() => navigate('ContactPage', {locale: locale, title: "Need Help ?"})}
              >
                <Icon name="ios-help-circle-outline" style={this.props.tab == 2 ? {color: '#c92e79'} : {}}/>
                <Text style={this.props.tab == 2 ? {color: '#c92e79'} : {}}>Help</Text>
              </TouchableOpacity>
            </Col>
            <Col style={styles.icon}>
              <TouchableOpacity style={styles.icon}
                onPress={() => navigate('Settings', {locale: locale, title: "More"})}
              >
                <Icon name="ios-more" style={this.props.tab == 3 ? {color: '#c92e79'} : {}}/>
                <Text style={this.props.tab == 3 ? {color: '#c92e79'} : {}}>More</Text>
              </TouchableOpacity>
            </Col>
          </Grid>
        </View>
      </View>
    );
  }
}

MainWrapper.defaultProps = {
  theme: 'dark'
}


const images = {
  dark: require('../images/backgrounds/dark.jpg'),
  light: require('../images/backgrounds/light.jpg'),
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  footer: {
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: -10,
    backgroundColor:'white',
    flexDirection:'row',
    height:80,
    alignItems:'center',
  },
  icon:{
    alignContent: 'center',
    alignItems: 'center',
    color: 'red'
  },
  bottomView:{
    width: '100%', 
    height: 60,
    paddingTop: 5,
    backgroundColor: '#ebebeb', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  textStyle:{
    color: '#fff',
    fontSize:22
  },
  backgroundImage: {
    position: 'absolute',
    top:0,
    left:0,
    alignSelf: 'stretch',
    width: '100%',
    height: '100%'
  }
});