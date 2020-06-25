import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';

import config from '../config';
import helper from '../lib/helper';

import { overlays } from './Overlays';

export default class OurServices extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        {
          Object.keys(config.SERVICES).map(function (code) {
            let srv = config.SERVICES[code];
            let title = config.I18n.t(`services.${code}`);
            let desc = config.I18n.t(`services.${code}_desc`);
            let content = [<Text key={code} style={styles.content}>{desc}</Text>];

            return (
              <TouchableOpacity
                key={code}
                style={[styles.gridItem, styleMe(srv.color).itemBG]}
                onPress={() => navigate('ArticlePage', {title: title, content: content})}
              >
                <Image
                  style={styles.buttonBG}
                  source={overlays[code]}
                  resizeMode={Image.resizeMode.contain}
                />
                <Text style={styles.title}>{title}</Text>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
    );
  }
}

let dims = helper.getElementDimentions();

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
    flexWrap: 'wrap'
  },
  gridItem: {
    margin: dims.boxMargin,
    width: dims.boxWidth,
    height: dims.boxHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: config.DEFAULT_FONT,
    paddingTop: 15,
  },
  buttonBG: {
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7
  },
  content: {
    fontSize: 18,
    lineHeight: 24
  }
});