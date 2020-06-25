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
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import KeyboardSpacer from 'react-native-keyboard-spacer';



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
      no_data_msg: "",
      text1: config.I18n.t('loc_attr.text1'),
      text2: config.I18n.t('loc_attr.text2'),
      text3: config.I18n.t('loc_attr.text3'),
    };
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
    this.locationSuccess = this.locationSuccess.bind(this);
    this.changeLoadingStatus = this.changeLoadingStatus.bind(this);

    this.requestLocationPermission = this.requestLocationPermission.bind(this);
    DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { 
        // console.log(status); 
    });
  }
  
  async componentWillMount(){
    await this.requestLocationPermission()
  }
  
  componentDidMount = () => {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<font color='#000000'>Allow <b>FTTH</b> to access this device's location?</font>",
            ok: "YES",
            cancel: "NO",
            style: {
                backgroundColor:'#FFFFFF',
                positiveButtonTextColor: '#000000',
                negativeButtonTextColor: '#000000',
                positiveButton:{color:'green',}
            },
            enableHighAccuracy: false, 
            showDialog: true, 
            openLocationServices: true,
            preventOutSideTouch: false,
            preventBackClick: false, 
            providerListener: true 
        }).then(function(success) {
                navigator.geolocation.getCurrentPosition((position) => {}, error => console.log(error), { enableHighAccuracy: false, timeout: 200000, maximumAge: 10000 });
            }.bind(this)
        ).catch((error) => {
            console.log(error.message);
        });
        
        DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { 
            console.log(status); 
        });
        
        navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError,{ enableHighAccuracy: false, timeout: 30000, maximumAge: 5000 });
  }
  
  componentWillUnmount = () => {
        LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener
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
            AsyncStorage.setItem('latitude', position.coords.latitude.toString());
            AsyncStorage.setItem('longitude', position.coords.longitude.toString());
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
           console.log('error:',error);
      }
  }

  onError = (error) => {
      this.requestLocationPermission();
      this.setState({ 
          error: error.message,
          loading: false,
          try_again: true,
      });
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
            <ActivityIndicator style={styles.loader} color={'#FFFFFF'} animating={this.state.loading} size='large' />
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
                        {this.state.error ? <View style={styles.errorContainer}>
                                                <Text style={styles.error_location} >{this.state.error}</Text>
                                                <TouchableOpacity style={styles.try_button} onPress={() => this.getLocation()}>
                                                    <Text style={styles.err_msg} >{config.I18n.t('loc_attr.try_again')}</Text>
                                                </TouchableOpacity>
                                            </View> 
                                          : null}
                        
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
  partnerInfoContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    margin: 10,
  },
  titleText: {
    width: '100%',
    fontSize: 20,
    fontFamily: config.DEFAULT_FONT,
    opacity: 0.9,
    color: '#000000',
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
    height:window.height,
    width: window.width - 50,
    margin:10,
  },
   try_button:{
    borderColor:'#FFFFFF',
    borderWidth: 1,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginTop:10,
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