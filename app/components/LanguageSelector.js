import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import config from '../config';
import helper from '../lib/helper';

export default class LanguageSelector extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.gridWrapper}>
        {
          Object.keys(config.LANGUAGES).map(function (code) {
            let lang = config.LANGUAGES[code];
            let title = config.I18n.t('global.locale', {locale: code});

            return (
              <TouchableOpacity
                key={code}
                style={[styles.gridItem, styleMe(lang.color).itemBG]}
                onPress={() => {navigate('Home', {locale: code})}}
              >
                <Text style={styles.title}>{title}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>
    );
  }
}

let dims = helper.getElementDimentions(20, 110, 0.5, 4);

let styleMe = function(color) {
  return {
    itemBG: {
      backgroundColor: color
    }
  }
};

const styles = StyleSheet.create({
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  },
  gridItem: {
    margin: dims.boxMargin,
    width: dims.boxWidth,
    height: dims.boxHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  title: {
    color: '#ffffff',
    fontFamily: config.DEFAULT_FONT
  }
});