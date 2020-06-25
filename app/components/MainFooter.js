import React, {Component} from 'react';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import { StyleProvider, Thumbnail, Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';


export default class MainFooter extends Component {
	render(){
		return(
			<View style={{position: 'absolute', bottom: 0}}>
        <StyleProvider style={getTheme(platform)}>
          <Footer>
            <FooterTab>
              <Button vertical active>
                <Icon name="apps" active />
                <Text>Home</Text>
              </Button>
              <Button vertical>
                <Icon name="ios-calendar"/>
                <Text>Services</Text>
              </Button>
              <Button vertical>
                <Icon name="ios-help-circle-outline"/>
                <Text>Help</Text>
              </Button>
              <Button vertical>
                <Icon name="ios-more"/>
                <Text>More</Text>
              </Button>
            </FooterTab>
          </Footer>
        </StyleProvider>
      </View>
		)
	}
}