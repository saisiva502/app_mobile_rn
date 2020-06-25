import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  ActivityIndicator,
  View,
  Alert,
  Image,
  Dimensions,
  PermissionsAndroid,
  BackHandler,
  DeviceEventEmitter,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import config from '../config';
import helper from '../lib/helper';
import _ from 'lodash';
import callApi from '../lib/apiCaller.js';
import { partnerLogos } from './PartnerLogos';


import Logo from './Logo';
import InfoItem from './InfoItem';
import LocationItem from './LocationItem';
import PartnerInfo from './PartnerInfo';
import SendEmailForm from './SendEmailForm';
import PartnerText  from './PartnerText';

const window = Dimensions.get('window');

export default class FindLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      loading: true,
      loading1: false,
      try_again: false,
      partner: [],
      no_data_status: false,
      no_data_msg: '',
      locationEnabled: true,
      enable_msg: '',
      text1: config.I18n.t('loc_attr.text1'),
      text2: config.I18n.t('loc_attr.text2'),
      text22: config.I18n.t('loc_attr.text22'),
      text3: config.I18n.t('loc_attr.text3'),
      text4: config.I18n.t('loc_attr.text4'),
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.getApiData = this.getApiData.bind(this);
    this.changeLoadingStatus = this.changeLoadingStatus.bind(this);

    this.requestLocationPermission = this.requestLocationPermission.bind(this);
    
  }
  
  async componentWillMount(){
    await this.requestLocationPermission()
  }
  
  componentDidMount = () => {
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError,{ enableHighAccuracy: false, timeout: 30000, maximumAge: 5000 });
  }
  
  getLocation = () => {
      this.setState({
          loading: true,
      })
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError,{ enableHighAccuracy: false, timeout: 30000, maximumAge: 5000 });   
  }
  
  onSuccess = (position) => {
       this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
        });
        if(position.coords.latitude !==null && position.coords.longitude !== null)
        {
            this.getApiData();
        }
        else
        {
            this.requestLocationPermission();
        }
  }
  
  async requestLocationPermission() {
      try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'FTTH',
              'message': "Allow FTTH to access this device's Location.",
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location")
          } else {
            console.log("Location permission denied")
          }
      } catch (err) {
           console.log('error:',err);
      }
  }

  onError = (error) => {
      this.requestLocationPermission();
      this.setState({ 
          error: error.message,
          loading: false,
          try_again: true,
      });
      Alert.alert(
          'To use this service',
          'Please go to Setting > Privacy > Location Service',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
      )
  }
  
  getApiData = () => {
      this.setState({
          loading: !this.state.loading,
      });
      var data={geo: {'lat':this.state.latitude,'long':this.state.longitude},api_key: config.API_KEY};
      callApi('get_nearest_partner','post',data).then(response => {
          if(response.status===200){
              this.setState({
                  partner: response.data,
                  no_data_status:false,
              });
          } else {
              this.setState({
                  no_data_status: true,
                  no_data_msg: config.I18n.t('loc_attr.no_service'),
              });
          }
      });
  }

  changeLoadingStatus = () => {
      this.setState({
          loading1: !this.state.loading1,
      })
  }

  render() {
    const {goBack} = this.props.navigation;
    let locale = this.props.locale;
    let partner = this.state.partner ? this.state.partner : [];
    let phones = (this.state.partner.call_center_number || '').split(' - ');
    let logoJSX = <Logo />;
    let addresses = (_.get(partner, helper.getLocalizedField('address', locale), '') || '').split('|');
    
    if (this.state.partner.code != config.O3_PARTNER_CODE) {
      logoJSX = <Image
                    style={styles.logo}
                    source={partnerLogos[this.state.partner.code]}
                    resizeMode={Image.resizeMode.contain}
                />
    }
    if(this.state.loading){
      return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator style={styles.loader} color={this.props.theme=='dark' ? '#FFFFFF' : '#000000'} animating={this.state.loading} size='large' />
        </View>
      )
    }

    let emailForm = this.state.partner ? <SendEmailForm 
                                            partner={this.state.partner} 
                                            latitude={this.state.latitude}
                                            longitude={this.state.longitude}
                                            theme={this.props.theme}
                                            locale={this.props.locale}
                                            changeLoadingStatus={() => this.changeLoadingStatus()}
                                        /> : null;
  return (
      <View style={styles.container}>
          <ScrollView>
            <View>
                {this.state.no_data_status ? <View style={styles.no_data_container}><Text style={styles.no_data}>{this.state.no_data_msg}</Text></View> 
                 : 
                    <View style={styles.partnerInfoContainer}>
                       {logoJSX ? <View style={styles.logoContainer}>
                            {logoJSX}
                        </View> : null}
                        <Text style={styles.textContainer}>
                          {this.state.partner && this.state.partner.code !==undefined ? <LocationItem theme={this.props.theme} locale={locale}  value={[this.state.text1]}  /> : null}
                          {this.state.partner && this.state.partner.code !==undefined ? <LocationItem theme={this.props.theme} locale={locale}  value={[this.state.text2]}  /> : null}
                          {this.state.partner && this.state.partner.code !==undefined ? <LocationItem theme={this.props.theme} locale={locale}  value={[this.state.text22]}  /> : null}

                        </Text>
                        <Text style={styles.textContainer}>
                            <LocationItem theme={this.props.theme} locale={locale} title={config.I18n.t('loc_attr.name')} value={[partner.name]} />
                            <LocationItem theme={this.props.theme} locale={locale} title={config.I18n.t('loc_attr.call_center')} indent={" - "} value={phones} />
                            <LocationItem theme={this.props.theme} locale={locale} title={config.I18n.t('loc_attr.key')} indent={" - "} value={[partner.key]} />
                            <LocationItem theme={this.props.theme} locale={locale} title={config.I18n.t('loc_attr.email')} value={[partner.email]} />
                            <LocationItem theme={this.props.theme} locale={locale} title={config.I18n.t('loc_attr.address')} value={[partner.address]} />
                            <LocationItem theme={this.props.theme} locale={locale} title={config.I18n.t('loc_attr.website')} value={[partner.website]} />
                        </Text>
                        
                        {this.state.error && this.state.locationEnabled ? <View style={styles.errorContainer}>
                                                <Text>{this.state.error}</Text>
                                                <Text style={styles.try_button}>{config.I18n.t('loc_attr.try_again')}</Text>
                                            </View> 
                                          : null}
                        <Text style={styles.textContainer}>                  
                           {this.state.partner && this.state.partner.code !==undefined ? <LocationItem theme={this.props.theme} locale={locale}  value={[this.state.text3]}  /> : null}
                           {this.state.partner && this.state.partner.code !==undefined ? <LocationItem theme={this.props.theme} locale={locale}  value={[this.state.text4]}  /> : null}
                        </Text>   
                        {this.state.partner && this.state.partner.code !==undefined ? emailForm : null}
                        <View style={styles.loaderContainer1}>
                            <ActivityIndicator style={styles.loader} color={this.props.theme==='dark' ? '#FFFFFF' : '#000000'} animating={this.state.loading1} size='large' />
                        </View>
                    </View>
                }
              </View>
          </ScrollView>
          <KeyboardSpacer/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'transparent',
    width:window.width,
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  partnerInfoContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: 10,
  },
  logoContainer: {
    alignItems:'center',
  },
  textContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    textAlign: 'left',
    marginRight: 10,
    marginLeft: 10,
    marginBottom:10
  },
  titleText: {
    width: '100%',
    fontSize: 20,
    fontFamily: config.DEFAULT_FONT,
    opacity: 0.9,
    color: '#FFFFFF',
    textAlign: 'left',
    margin: 3
  },
  loaderContainer:{
    flex: 1,
    backgroundColor:'transparent',
    height: window.height,
    width:window.width,
    margin:5,
    flexDirection:'column',
    justifyContent:'center'
  },
  loaderContainer1:{
    position:'absolute',
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center',
    flex:1,
    flexDirection:'column',
    top:'50%',
    left:'50%',
  },
  logo:{
    width:200,
    height:200
  },
  errorContainer:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'transparent',
    height:window.height/20,
    width: window.width - 50,
    margin:10,
  },
  try_button:{
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    marginTop:10
  },
  enable_button:{
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  no_data_container:{
    flex: 1,
    backgroundColor:'transparent',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
    height: window.height,
    width: window.width - 50,
  },
  no_data:{
    fontWeight: 'bold',
    width: window.width - 50,
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center'
  }
});