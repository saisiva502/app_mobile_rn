import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import config from '../config';
import helper from '../lib/helper';
import _ from 'lodash';
import { partnerLogos } from './PartnerLogos';

import InfoItem from './InfoItem';
import Logo from './Logo';
import Footer from './Footer';

export default class PartnerInfo extends Component {

  render() {

    return (
      <View  style={{width: '100%', height: '100%'}}>
        <ScrollView>
          <View style={{marginTop: '50%', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#000000', fontSize: 18, fontWeight: 'bold'}}>We are available seven days a week from</Text>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: 'red', letterSpacing: 3, marginTop: 15}}>8AM-12AM</Text>
            <View style={{width: '100%', alignItems: 'center', marginTop: 50}}>
              <TouchableOpacity style={{backgroundColor: '#1746a3',borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingTop:10, paddingBottom: 10, width: '90%', flexDirection: 'row',}}>
                <Image source={require('../images/overlays/phone.png')} style={{marginRight:5,height: 25, width: 25}}/>
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18}}>Call Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor: '#16a7db', marginTop: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingTop:10, paddingBottom: 10, width: '90%', flexDirection: 'row',}}>
                <Image source={require('../images/overlays/messenger.png')} style={{marginRight:5,height: 25, width: 25}}/>
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18}}>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  content:{
    backgroundColor: 'red',
    alignItems:'center',
    justifyContent:'center'
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  partnerInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 10,
  },
  textContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    textAlign: 'left',
    marginTop: 10
  },
  logo: {
    width: 200,
    height: 200
  }
});