import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import config from '../../config';
import helper from '../../lib/helper';

import { partnerLogos } from '../PartnerLogos';

export default class PartnerGroup extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const cityCode = this.props.cityCode;
    let locale = this.props.locale;

    return (
      <View style={styles.gridWrapper}>
        <View style={{width: '100%'}}>
          <Text style={styles.titleText}>{config.I18n.t(`cities.${cityCode}`)}</Text>
        </View>
        {
          config.PARTNERS.map(function(partner) {
            if (partner.aaa_name && !(config.EXCLUDED_BEIS.includes(partner.business_entity_index)) && partner.code.substring(4,7) == cityCode) {
              return (
                <TouchableOpacity
                  key={partner.code}
                  style={[styles.gridItem, styles.itemBG]}
                  onPress={() => navigate('PartnerMap', {partner: partner, locale: locale, theme: 'light'})}
                >
                  <Image
                    style={styles.buttonBG}
                    source={partnerLogos[partner.code.toLowerCase()]}
                    resizeMode={Image.resizeMode.contain}
                  />
                </TouchableOpacity>
              )
            }
          })
        }
      </View>
    );
  }
}

let dims = helper.getElementDimentions(20, 130, 1, 4);

const styles = StyleSheet.create({
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridItem: {
    margin: dims.boxMargin,
    width: dims.boxWidth,
    height: dims.boxHeight,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonBG: {
    width: '100%',
    height: '100%'
  },
  itemBG: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
});