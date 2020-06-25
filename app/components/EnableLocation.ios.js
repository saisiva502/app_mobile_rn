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
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import config from '../config';
import helper from '../lib/helper';
import _ from 'lodash';
import callApi from '../lib/apiCaller.js';


const window = Dimensions.get('window');

export default class EnableLocation extends Component {
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
      text3: config.I18n.t('loc_attr.text3'),
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    // this.getApiData = this.getApiData.bind(this);
    this.locationSuccess = this.locationSuccess.bind(this);
    this.changeLoadingStatus = this.changeLoadingStatus.bind(this);

    this.requestLocationPermission = this.requestLocationPermission.bind(this);
    //this.onEnableLocationPress = this.onEnableLocationPress.bind(this);
    //this.getLocationStatus = this.getLocationStatus.bind(this);
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
      navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError,{ enableHighAccuracy: true, timeout: 60000, maximumAge: 5000 });   
  }
  
  onSuccess = (position) => {
       this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
        });
        AsyncStorage.setItem('latitude', position.coords.latitude.toString());
        AsyncStorage.setItem('longitude', position.coords.longitude.toString());
        if(position.coords.latitude !==null && position.coords.longitude !== null)
        {
            this.locationSuccess();
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
  
  locationSuccess = () => {
      this.setState({
          loading: !this.state.loading,
      });
      this.props.checkLocation();
  }

  changeLoadingStatus = () => {
      this.setState({
          loading1: !this.state.loading1,
      })
  }

  render() {
    const {goBack} = this.props.navigation;
    let locale = this.props.locale;
    if(this.state.loading){
      return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator style={styles.loader} color={this.props.theme=='dark' ? '#FFFFFF' : '#000000'} animating={this.state.loading} size='large' />
        </View>
      )
    }

    
  return (
      <View style={styles.container}>
          <ScrollView>
            <View>
                {this.state.no_data_status ? <View style={styles.no_data_container}><Text style={styles.no_data}>{this.state.no_data_msg}</Text></View> 
                 : 
                    <View style={styles.partnerInfoContainer}>
                        {this.state.error && this.state.locationEnabled ? <View style={styles.errorContainer}>
                            <Text style={styles.err_msg}>{this.state.error}</Text>
                            <Text style={styles.try_button}>{config.I18n.t('loc_attr.try_again')}</Text>
                        </View> 
                      : null}
                        <View style={styles.loaderContainer1}>
                            <ActivityIndicator style={styles.loader} color={this.props.theme==='dark' ? '#FFFFFF' : '#000000'} animating={this.state.loading1} size='large' />
                        </View>
                    </View>
                }
              </View>
          </ScrollView>
          
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
  partnerInfoContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: 10,
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
  
  errorContainer:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'transparent',
    height:window.height,
    width: window.width - 50,
    margin:10,
  },
  try_button:{
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    marginTop:10,
    color:'#FFFFFF'
  },
  enable_button:{
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginTop: 10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    color:'#FFFFFF'
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
  },
  error_location: {
    color: '#FFFFFF'
  },
  err_msg: {
    color:'#FFFFFF',
  }
});