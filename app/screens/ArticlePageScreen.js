import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import _ from 'lodash';
import config from '../config';
import MainWrapper from '../components/MainWrapper';


export default class ArticlePageScreen extends Component {
  static navigationOptions = {
    title: ''
  };

  render() {
    let theme = _.get(this, 'props.navigation.state.params.theme', this.props.theme);
    let title = _.get(this, 'props.navigation.state.params.title', this.props.title);
    let content = _.get(this, 'props.navigation.state.params.content', this.props.content);
    let locale = _.get(this, 'props.navigation.state.params.locale', this.props.locale);

    return (
      <MainWrapper theme={theme}
        navigation={this.props.navigation}
        locale={this.props.locale}
      >
        <View style={styles.screenContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
      </MainWrapper>
    );
  }
}

ArticlePageScreen.defaultProps = {
  theme: 'light',
  title: 'Title',
  content: 'Content',
  locale: 'en'
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    margin: 25,
  },
  title: {
    fontSize: 22,
    fontFamily: config.DEFAULT_FONT,
    textAlign: 'left',
    marginBottom: 10
  },
  content: {
    textAlign: 'left',
  }
});