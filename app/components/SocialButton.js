import React, { Component } from 'react';
import {
  Platform,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

class SocialIcon extends Component {
  render() {
    return <Image source={this.props.img} style={styles.icon} />
  }
}

export default class SocialButton extends React.Component {
  openURL = (app, url) => {
    Linking.canOpenURL(app).then(supported => {
      if (supported) {
        Linking.openURL(app);
      } else if (url) {
        this.openURL(url);
      }
    });
  }

  handleClick = () => {
    let key = this.props.name;
    let links = [];
    if ((Platform.OS === 'ios') && (key in iosUrls)) {
      links.push(iosUrls[key]);
    } else if ((Platform.OS === 'android') && (key in androidUrls)) {
      links.push(androidUrls[key]);
    }
    links.push(urls[key]);
    this.openURL(...links);
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <SocialIcon img={images[this.props.name]} />
      </TouchableOpacity>
    );
  }
}

const androidUrls = {
  fb: 'fb://page/170721689962978?referrer=app_link',
  in: 'https://www.instagram.com/_u/o3.telecom/'
}

const iosUrls = {
  fb: 'fb://page/?id=170721689962978',
  in: 'instagram://user?username=o3.telecom'
}

const urls = {
  fb: 'https://www.facebook.com/O3telecom',
  in: 'https://www.instagram.com/o3.telecom',
  ln: 'https://www.linkedin.com/company/o3-telecom',
  tw: 'https://www.twitter.com',
  yt: 'https://www.youtube.com/channel/UCxghM9XAkl0NrgzvdUtJhFw'
}

const images = {
  fb: require('../images/icons/facebook.jpg'),
  in: require('../images/icons/instagram.jpg'),
  ln: require('../images/icons/linkedin.jpg'),
  tw: require('../images/icons/twitter.jpg'),
  yt: require('../images/icons/youtube.jpg')
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    margin: 5
  }
});