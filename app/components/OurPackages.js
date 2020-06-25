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
import InfoItem from './InfoItem';

import { overlays } from './Overlays';

export default class OurPackages extends Component {

  render() {
    const { navigate } = this.props.navigation;
    let locale = this.props.locale;

    return (
      <ScrollView>
        {
          Object.keys(config.PACKAGES).map(function (code) {
            let pkg = config.PACKAGES[code];
            let pkgName = helper.renderDigits(config.I18n.t(`packages.${code}`), locale);
            let pkgPrice = helper.renderDigits(pkg.price, locale);
            let title = `${pkgName} (${pkgPrice})`;
            let content = [];

            Object.keys(pkg).map(function(k) {
              if (!(['name', 'desc', 'color'].includes(k))) {
                let key = config.I18n.t(`package_attrs.${k}`)
                let value = [];
                if (pkg[k] instanceof Array) {
                  pkg[k].map(function(x) {
                    value.push(config.I18n.t(`package_values.${x}`));
                  })
                } else if (k == 'price') {
                  value.push(helper.renderDigits(`${pkg[k]} ${config.I18n.t('global.dinar')}`, locale));
                } else if (k == 'ips') {
                  if (pkg[k] != '0') { value.push(helper.renderDigits(pkg[k], locale)); }
                } else {
                  value.push(helper.renderDigits(config.I18n.t(`package_values.${pkg[k]}`), locale));
                }

                if (value.length > 0) {
                  content.push(<InfoItem key={k} theme={'light'} title={key} value={value} locale={locale} />);
                }
              }
            });

            return (
              <TouchableOpacity
                key={code}
                style={[styles.gridItem, styleMe(pkg.color).itemBG]}
                onPress={() => navigate('ArticlePage', {title: title, content: content, locale: locale})}
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
    fontSize: 17,
    fontFamily: config.DEFAULT_FONT,
    paddingTop: 15,
  },
  buttonBG: {
    width: '50%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7
  }
});
