import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import _ from 'lodash';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Popup } from 'react-native-map-link';

import helper from '../lib/helper';
import config from '../config';
import LocationItem from '../components/LocationItem';
import callApi from '../lib/apiCaller.js';
// import outlets from '../json/outlets.json';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = '';//getLatitude()//36.191113;
const LONGITUDE = '';//getLongitude();//44.009167;
const LATITUDE_DELTA = 0.33;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

   
   
    

export default class PartnerMapScreen extends Component {
  static navigationOptions = {
    title: ''
  };
  constructor(props){
    super(props);
    this.state={
      region_latitude:'',
      region_longitude:'',
      region_latitudeDelta:LATITUDE_DELTA,
      region_longitudeDelta:LONGITUDE_DELTA,
      
      selected_lat:0,
      selected_long:0,
      selected_name: '',
      selected_address: '',

      outlets:[],//outlets,
      isVisible: false,
      current_lat:null,
      current_long:null,
      error: ''
    }
    this.openRoute = this.openRoute.bind(this);
    this.getMarkersData = this.getMarkersData.bind(this);
    this.getLongitude = this.getLongitude.bind(this);
    this.getLatitude = this.getLatitude.bind(this);
  }
  
   async getLatitude(){
      try {
          await AsyncStorage.getItem('latitude').then((value) => {
              if(value !== null)
              {
                  this.setState({
                      region_latitude : parseFloat(value),
                  });
              }
          });
        } catch (error) {
          console.log(error.message);
        }
        return
    
   }
   getLongitude = async () => {
    try {
      await AsyncStorage.getItem('longitude').then((value) => {
          if (value !== null) {
              this.setState({
                  region_longitude: parseFloat(value)
              })
          } 
      });
      
     } catch (error) {
       console.log('error',error);
     }
  }
 
      
  
  componentDidMount() {
    this.getLongitude();
    this.getLatitude();
    navigator.geolocation.getCurrentPosition(
       (position) => {
        this.setState({
           current_lat: position.coords.latitude,//36.191286
           current_long: position.coords.longitude,//44.008889
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 2000 },
    );
    this.getMarkersData()
  }
  

  getMarkersData = () => {
      var partner = this.props.navigation.state.params.partner ? this.props.navigation.state.params.partner.code : '';
      var data = {partner_code: partner,api_key: config.API_KEY,}
      console.log('req data:',data);
      callApi('partner_outlets','post',data).then(response => {
          console.log('response data',response)
          if(response.status === 200)
          {
              this.setState({
                  outlets: response.partner_outlets,
              })
          }
      });
  }

  openRoute(marker){
    this.setState({
        selected_lat: marker.lat,
        selected_long: marker.long,
        isVisible: !this.state.isVisible,
        selected_name: marker.name,
        selected_address:marker.address,
    });
  }

  render() {
    let defaultPartner = {};
    config.PARTNERS.map(function(partner, index) {
      if (partner.code == config.O3_PARTNER_CODE) { defaultPartner = partner; }
    });
    let theme = (this.props.navigation.state.params.theme) ? this.props.navigation.state.params.theme : this.props.theme;
    let locale = (this.props.navigation.state.params.locale) ? this.props.navigation.state.params.locale : this.props.locale;
    let partner = (this.props.navigation.state.params.partner) ? this.props.navigation.state.params.partner : defaultPartner;
    
    return (
      <View style={styles.container}>
        {this.state.region_latitude !== '' ? 
        <MapView
            provider={this.props.provider}
            style={styles.map}
            showsUserLocation={true}
            initialRegion={{latitude:this.state.region_latitude ? this.state.region_latitude : 36.191113, 
                    longitude:this.state.region_longitude ? this.state.region_longitude : 44.009167,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA}}
          >
            {this.state.outlets.map(function(marker,index){
                return(
                  <Marker
                    key={marker.id}
                    coordinate={{'latitude': marker.lat,'longitude': marker.long}}
                    image={marker.iconImage}
                >
                    <Callout onPress={()=> this.openRoute(marker)} >
                        <View style={styles.partner_itemContainer}>
                            <Text style={styles.partner_name}>{(_.get(marker, helper.getLocalizedField('name', locale), '') || '').split('|')}</Text>
                            <Text style={styles.partner_address}>{(_.get(marker, helper.getLocalizedField('address', locale), '') || '').split('|')}</Text>
                            <Text style={styles.partner_mobile}>{marker.phone_1+' - '+marker.phone_2}</Text>
                            <Text style={styles.partner_text}>{config.I18n.t('loc_attr.map_info')}</Text>
                        </View>
                    </Callout>
                </Marker>
                )
            }.bind(this))
           }
          </MapView>
         : null}
        <Popup
              isVisible={this.state.isVisible}
              onCancelPressed={() => this.setState({ isVisible: false })}
              onAppPressed={() => this.setState({ isVisible: false })}
              onBackButtonPressed={() => this.setState({ isVisible: false })}
              options={{
                latitude: this.state.selected_lat,//36.1951866974072,
                longitude: this.state.selected_long,//43.9678536885188,
                sourceLatitude: this.state.current_lat ? this.state.current_lat : 36.191286,//36.18486579,
                sourceLongitude: this.state.current_long ? this.state.current_long : 44.009167,
                title: this.state.selected_name,
                dialogTitle: 'Going to the '+this.state.selected_address+' directions',
                dialogMessage: '',
                cancelText: 'Cancel',
                appsWhiteList: ['google-maps'] 
              }}
        />
     </View>
    );
  }
}

PartnerMapScreen.defaultProps = {
  theme: 'dark',
  locale: 'en'
}

//PartnerMapScreen.propTypes = {
  //provider: ProviderPropType,
//};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  partner_itemContainer:{
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    opacity: 0.5
}
 
});