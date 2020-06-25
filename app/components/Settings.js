import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import config from '../config';
import LanguageSelector from '../components/LanguageSelector';

export default class Settings extends Component {

  render() {
    return (
      <ScrollView contentContainerStyle={styles.gridWrapper}>
        <View style={{paddingBottom: 30, borderBottomColor: '#d4d4d4', borderBottomWidth: 1}}>
          <Text style={styles.titleText}>{config.I18n.t('settings.language')}</Text>
          <LanguageSelector
            navigation={this.props.navigation}
            locale={this.props.locale}
          />
        </View>
        <View style={{marginTop: 50, width: '100%'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#000000'}}>Frequent Questions</Text>
          <TouchableOpacity style={{paddingLeft:10, borderRadius: 5, marginTop: 10, backgroundColor: '#e6e6e6', paddingTop: 10, paddingBottom: 10}}>
            <Text style={{color:'#000000'}}>How to change router WiFi password ?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingLeft:10, borderRadius: 5, marginTop: 10, backgroundColor: '#e6e6e6', paddingTop: 10, paddingBottom: 10}}>
            <Text style={{color:'#000000'}}>How to refill your account ?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingLeft:10, borderRadius: 5, marginTop: 10, backgroundColor: '#e6e6e6', paddingTop: 10, paddingBottom: 10}}>
            <Text style={{color:'#000000'}}>From where i can buy voucher ?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  titleText: {
    width: '100%',
    fontSize: 20,
    fontFamily: config.DEFAULT_FONT,
    opacity: 0.9,
    color: '#000000',
    textAlign: 'left',
    margin: 3
  }
});