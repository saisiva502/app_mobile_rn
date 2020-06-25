import React, { Component } from 'react';
import {
  Text,
  Linking
} from 'react-native';

import config from '../config';

export default class LocationItem extends Component {
  static navigationOptions = {
    header: null
  };
  
  render() {
    let info = [];
    let theme = this.props.theme;
    let locale = this.props.locale;
    let defaultIndent = `\n${(locale == "en" ? config.LRM : config.RLM)}     `;
    let indent = this.props.indent || defaultIndent;
    let values = this.props.value.filter(function(n) { return n != '' }); //remove empty strings

    values.map(function (value, index) {
      if (value) {
        if (index > 0) {
          info.push(
            <Text
              key={`indent_${index}`}
              style={styleMe(theme).valueText}
            >{indent}</Text>
          );
        }
        info.push(
          <Text
            key={index}
            style={styleMe(theme, linkMe(value, false)).valueText}
            onPress={() => linkMe(value)}
          >{value}</Text>
        );
      }
    });

    if (info.length > 0) {
      info.unshift(
        <Text
          key={'title'}
          style={styleMe(theme).titleText}
        ><Text style={{lineHeight: 15}}>{"\n\n"}</Text>{this.props.title}</Text>
      );
    }

    return (
      <Text>{info}</Text>
    );
  }
}

LocationItem.defaultProps = {
  theme: 'dark',
}


const emailTemplate = {
  subject: 'FTTH Service',
  body: `Dear all,

Please find my Request below:

My Full Name: 
Mobile Number: 
Full Address: 
Request/Issue: 

Best Regards

`
}

let styleMe = function(theme, linked = false) {
  let valueColor = ((theme == 'dark') ? '#FFFFFF' : '#000000');
  valueColor = (linked ? "#4477FF" : valueColor);
  return {
    titleText: {
      color: ((theme == 'dark') ? '#AAAAAA' : '#999999'),
      fontFamily: config.DEFAULT_FONT,
    },
    valueText: {
      color: valueColor,
      textDecorationLine: (linked ? "underline" : "none"),
      fontFamily: config.DEFAULT_FONT,
    }
  }
};

let linkMe = function(value, link = true) {
  value = String(value);
  if (value.substring(0,4) == 'http') {
    if (link) { Linking.openURL(value); }
  } else if (value.substring(0,5) == 'info@') {
    if (link) { Linking.openURL(`mailto:${value}${jsonToQS(emailTemplate)}`); }
  } else if (/^[\d]{6,}$/.test(value)) {
    if (link) { Linking.openURL(`tel:${value}`); }
  } else {
    return false;
  }
  return true;
}

let jsonToQS = function(json) {
  return '?' +  Object.keys(json).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
  }).join('&');
}