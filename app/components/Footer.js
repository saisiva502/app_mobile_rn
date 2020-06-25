import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import SocialButton from './SocialButton';


export default class Footer extends Component {
  render() {
    return(
      <View style={styles.footer}>
        <SocialButton name={'fb'} />
        <SocialButton name={'in'} />
        <SocialButton name={'ln'} />
        <SocialButton name={'yt'} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 80
  }
});