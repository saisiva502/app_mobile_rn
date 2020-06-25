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

export default class Notifications extends Component {

  render() {

    return (
      <View  style={{width: '100%', height: '100%', paddingTop: 20}}>
        <ScrollView>
          <TouchableOpacity style={{marginLeft: 15, marginRight: 15, paddingBottom: 20, borderBottomColor: '#c7c9c8', borderBottomWidth: 1}}>
            <Text style={{marginTop: 10, color: '#000000', fontSize: 20, fontWeight: 'bold'}}>19 May 2020</Text>
            <Text style={{color: '#c7c9c8', fontSize: 16, marginTop: 10}}>Instantly Recharge your account via our quick recharge system.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15, marginRight: 15, paddingBottom: 20, borderBottomColor: '#c7c9c8', borderBottomWidth: 1}}>
            <Text style={{marginTop: 10, color: '#000000', fontSize: 20, fontWeight: 'bold'}}>19 May 2020</Text>
            <Text style={{color: '#c7c9c8', fontSize: 16, marginTop: 10}}>Instantly Recharge your account via our quick recharge system.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15, marginRight: 15, paddingBottom: 20, borderBottomColor: '#c7c9c8', borderBottomWidth: 1}}>
            <Text style={{marginTop: 10, color: '#000000', fontSize: 20, fontWeight: 'bold'}}>19 May 2020</Text>
            <Text style={{color: '#c7c9c8', fontSize: 16, marginTop: 10}}>Instantly Recharge your account via our quick recharge system.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15, marginRight: 15, paddingBottom: 20, borderBottomColor: '#c7c9c8', borderBottomWidth: 1}}>
            <Text style={{marginTop: 10, color: '#000000', fontSize: 20, fontWeight: 'bold'}}>19 May 2020</Text>
            <Text style={{color: '#c7c9c8', fontSize: 16, marginTop: 10}}>Instantly Recharge your account via our quick recharge system.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15, marginRight: 15, paddingBottom: 20, borderBottomColor: '#c7c9c8', borderBottomWidth: 1}}>
            <Text style={{marginTop: 10, color: '#000000', fontSize: 20, fontWeight: 'bold'}}>19 May 2020</Text>
            <Text style={{color: '#c7c9c8', fontSize: 16, marginTop: 10}}>Instantly Recharge your account via our quick recharge system.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15, marginRight: 15, paddingBottom: 20, borderBottomColor: '#c7c9c8', borderBottomWidth: 1}}>
            <Text style={{marginTop: 10, color: '#000000', fontSize: 20, fontWeight: 'bold'}}>19 May 2020</Text>
            <Text style={{color: '#c7c9c8', fontSize: 16, marginTop: 10}}>Instantly Recharge your account via our quick recharge system.</Text>
          </TouchableOpacity>

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