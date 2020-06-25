import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';

import config from '../../config';
import PartnerGroup from './PartnerGroup';


export default class PartnersMenu extends Component {

  render() {
    const navigation = this.props.navigation;
    const locale = this.props.locale;
    return (
      <ScrollView contentContainerStyle={styles.gridWrapper}>
        {
          config.CITY_CODES.map(function(cityCode, index) {
            if (!(config.EXCLUDED_CITIES.includes(cityCode))) {
              return (
                <PartnerGroup
                  key={index}
                  navigation={navigation}
                  locale={locale}
                  cityCode={cityCode}
                />
              );
            }
          })
        }
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});