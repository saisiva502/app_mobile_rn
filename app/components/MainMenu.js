import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Alert,
  View,
  WebView
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
// import DOMParser from 'react-native-html-parser';

import config from '../config';
import helper from '../lib/helper';
import { overlays } from './Overlays';
import { StyleProvider,Badge,  Thumbnail, Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Divider  from 'react-native-elements';

export default class MainMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      our_network: "",
      net_load: false
    }
  }

  componentWillMount() {
    this.timeouts = [];
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout);
  }
  
  render() {
    const { navigate } = this.props.navigation;
    let locale = config.I18n.locale = this.props.locale;
    let mainMenu = config.MAIN_MENU;
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    const html = '<div style="background-color:#ed6180; color: #ffffff"><div>Welcome <b>Khaled Ali</b></div> <div class="alert alert-info bg-info">SIP Number: <b>0662190039</b>.<br />Account status: <b>Active</b>.<br />Current package: <b>39K</b>.<br />Expiry time: <b>2020-06-30 14:44:33</b>.</div></div>'
    const err_html = '<div style="background-color:#ed6180; color: #ffffff"><b>You are not belong our network</b></div>'
    
    // const parser = new DOMParser.DOMParser();
    // const htmlParser = parser.parseFromString(html, 'text/html');
    return (
        <View style={styles.container}>
        <ScrollView>
          <View style={{height:0, width: 0}}>
            <WebView
              source={{uri: `${config.QUICK_RECHARGE_URL}?lang=${locale}&ref=app`}}
              onLoadStart={() => {
                this.timeouts.push(setTimeout(() => {
                  this.setState({our_network: "false"})
                  Alert.alert( //could not load page, show error popup
                    config.I18n.t('global.error'), //title
                    config.I18n.t('errors.not_ftth_user'), //content
                    [ { text: config.I18n.t('global.ok') } ] //buttons
                  );
                }, 3000));
              }}
              onLoad={()=>{}}
              onError={() => { this.setState({our_network: "false"}) }}
              renderLoading={this.renderLoading}
              startInLoadingState={false}
            />
          </View>
          <View style={{ width: '100%', height: 50, borderBottomColor: '#d4d4d4', borderBottomWidth: 1 }}>
            <View style={{flex: 1, top: 5, flexDirection: 'row', position:'absolute', right: 10}}>
              <TouchableOpacity style={{marginRight: 10}}
                onPress={()=>navigate('NotificationsScreen', {locale: locale} )}
              >
                <Image
                  style={{height: 30, width: 30, marginTop: 5}}
                  source={require('../images/overlays/email.png')}
                  resizeMode={Image.resizeMode.contain}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{marginLeft: 10}}>
                <Badge style={{backgroundColor: '#ed6180', marginTop: 5}}>
                  <Text style={{color: 'white', paddingTop: 2}}>{this.props.locale}</Text>
                </Badge>
              </TouchableOpacity>
            </View>
          </View>
          {
            this.state.our_network === "true" ?
            <View style={{borderBottomColor: '#d4d4d4', borderBottomWidth: 1 }}>
              <View style={{padding: 20, marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10, height: 150, width: '94%', borderRadius: 10, backgroundColor: '#ed6180'}}>
                <WebView style={{padding: 10, backgroundColor: '#ed6180', color: 'white'}} source={{html: html}} />
              </View>
            </View> : null
          }

          {
            this.state.our_network === "false" ?
            <View style={{borderBottomColor: '#d4d4d4', borderBottomWidth: 1 }}>
              <View style={{padding: 10, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 10, height: 50, width: '94%', borderRadius: 10, backgroundColor: '#ed6180'}}>
                <WebView style={{padding: 10, backgroundColor: '#ed6180', color: 'white'}} source={{html: err_html}} />
              </View>
            </View> : null
          }
          <View>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10, marginTop: 10}}>What's New</Text> 
              <Text style={{color: 'red', marginTop: 15,fontSize: 16, position: 'absolute', right: 10}}>See all</Text>
            </View>
            <ScrollView style={{paddingBottom: 15, borderBottomColor: '#d4d4d4', borderBottomWidth: 1 }} showsHorizontalScrollIndicator={false} horizontal={true}>
              {
                Object.keys(mainMenu).map(function (code) {
                  let item = mainMenu[code];
                  return(
                      <TouchableOpacity
                        key={code}
                        style={[styles.newGrid, {backgroundColor: item.backgroundColor}]}
                        onPress={() => navigate(item.screen, {locale: locale})}
                      >
                      <Grid>
                        <Row>
                          <Col>
                            <Text style={styles.newButtonText}>{config.I18n.t(`main_menu.${code}`)}</Text>
                          </Col>
                          <Col style={styles.image}>
                            <Image
                              style={styles.newButtonBG}
                              source={overlays[code]}
                              resizeMode={Image.resizeMode.contain}
                            />
                          </Col>
                        </Row>
                      </Grid>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 10, marginTop: 10, marginBottom: 10}}>Quick Links</Text>
            <Grid style={{paddingBottom: 10, paddingBottom: 10, paddingTop: 5, borderBottomColor: '#d4d4d4', borderBottomWidth: 1}}>
            <View style={{marginTop: 5}}>
              <TouchableOpacity
                        // key={code}
                        // style={[styles.gridItem, {backgroundColor: item.backgroundColor}]}
                        // onPress={() => navigate(item.screen, {locale: locale})}
                  >
                <Row size={1} style={{marginRight: 10}}>
                    <Col style={{width: 90}}>
                      <Image
                        style={styles.profileImg}
                        source={require('../images/overlays/mobile.png')}
                      />
                    </Col>
                    <Col style={{borderBottomColor: '#d4d4d4', borderBottomWidth: 1}}>
                      <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10, marginTop: 5 }}>Recharge</Text>
                      <Text style={{color: '#c7c9c8', marginLeft: 10, marginTop: 5, marginBottom: 15}}>Instantly recharge your account via our quick recharge system </Text>
                    </Col>

                </Row>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 5}}>
               <TouchableOpacity
                      // key={code}
                      // style={[styles.gridItem, {backgroundColor: item.backgroundColor}]}
                      // onPress={() => navigate(item.screen, {locale: locale})}
                >
              <Row size={1} style={{marginRight: 10}}>
                <Col style={{width: 90}}>
                  <Image
                    style={styles.profileImg}
                    source={require('../images/overlays/router.png')}
                  />
                </Col>
                <Col style={{borderBottomColor: '#d4d4d4', borderBottomWidth: 1}}>
                  <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10, marginTop: 5 }}>Access your router</Text>
                  <Text style={{color: '#c7c9c8', marginLeft: 10, marginTop: 5, marginBottom: 15}}>Instantly recharge your account via our quick recharge system </Text>
                </Col>
              </Row>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 5}}>
             <TouchableOpacity
                    // key={code}
                    // style={[styles.gridItem, {backgroundColor: item.backgroundColor}]}
                    // onPress={() => navigate(item.screen, {locale: locale})}
              >
              <Row size={1} style={{marginRight: 10}}>
                <Col style={{width: 90}}>
                  <Image
                    style={styles.profileImg}
                    source={require('../images/overlays/location.png')}
                  />
                </Col>
                <Col>
                  <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10, marginTop: 5 }}>Access your router</Text>
                  <Text style={{color: '#c7c9c8', marginLeft: 10, marginTop: 5, marginBottom: 15}}>Instantly recharge your account via our quick recharge system </Text>
                </Col>
              </Row>
              </TouchableOpacity>
            </View>
            <Row size={1} style={{marginRight: 10}}>
            </Row>
            </Grid>
          </View>
          <ScrollView style={{paddingTop: 15, paddingBottom: 15}} showsHorizontalScrollIndicator={false} horizontal={true}>
            {
              Object.keys(mainMenu).map(function (code) {
                let item = mainMenu[code];
                return(
                    <TouchableOpacity
                      key={code}
                      style={[styles.gridItem, {backgroundColor: item.backgroundColor}]}
                      onPress={() => navigate(item.screen, {locale: locale})}
                    >
                    <Grid>
                      <Row>
                        <Col>
                          <Text style={styles.buttonText}>{config.I18n.t(`main_menu.${code}`)}</Text>
                        </Col>
                        <Col style={styles.image}>
                          <Image
                            style={styles.buttonBG}
                            source={overlays[code]}
                            resizeMode={Image.resizeMode.contain}
                          />
                        </Col>
                      </Row>
                    </Grid>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}

let dims = helper.getElementDimentions();

const styles = StyleSheet.create({
  gridWrapper: {
    backgroundColor: '#f5f5f5'
  },
  container:{
    // backgroundColor: '#f5f5f5',
    overflow: 'scroll'
  },
  image:{
    marginLeft: 20
  },
  icon:{
    color: '#969696'
  },
  new:{
    position:'absolute',
    fontWeight: 'bold',
    bottom: 160,
    fontSize: 18,
    color: '#000000',
    width: '100%',
  },

  gridItem: {
    margin: dims.boxMargin,
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10
  },
  newGrid:{
    margin: dims.boxMargin,
    height: 80,
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10
  },
  newButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: config.DEFAULT_FONT,
    paddingTop: 25,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 15
  },
  newButtonBG: {
    position: 'absolute',
    right: 10,
    width: 30,
    height: 30,
    marginTop: 25,
    opacity: 0.7,
    paddingRight: 10,
    marginLeft: 10
  },
  buttonText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: config.DEFAULT_FONT,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 15
  },
  buttonBG: {
    position: 'absolute',
    right: 10,
    width: 30,
    height: 30,
    marginTop: 15,
    opacity: 0.7,
    paddingRight: 10,
    marginLeft: 10
  },
  footer:{
    backgroundColor: '#ffffff',
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: 40,
    borderColor: '#dedede', 
    borderWidth:1,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10
  },
  mainMenu:{
    position: 'absolute',
    bottom: 70,
    paddingTop:30,
    borderColor: '#61dafb'
  }
});