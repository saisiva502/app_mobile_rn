import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import config from '../config';
import MainWrapper from '../components/MainWrapper';
import OurPartners from '../components/Maps/OurPartners';
import Footer from '../components/Footer';

import EnableLocation from '../components/EnableLocation';

export default class POSScreen extends Component{
		constructor(props){
			super(props);
			this.state={
				location_status: false,
			}
			this.checkLocation = this.checkLocation.bind(this);
		}
		static navigationOptions = ({ navigation }) => ({
			title: config.I18n.t('main_menu.pos', {locale: navigation.state.params.locale})
		})
		checkLocation = () => {
			this.setState({
				location_status: !this.state.location_status
			});
		}
		render(){
			let theme = (this.props.navigation.state.params.theme) ? this.props.navigation.state.params.theme : this.props.theme;
    		let locale = (this.props.navigation.state.params.locale) ? this.props.navigation.state.params.locale : this.props.locale;
    		let defaultLocResData = {};
    		let location = (this.props.navigation.state.params.location) ? this.props.navigation.state.params.location : defaultLocResData;
	
		return(
			<MainWrapper
				navigation={this.props.navigation}
        		locale={this.props.locale}
			>
				<View style={styles.screenContainer}>
					{!this.state.location_status ? 
					    <EnableLocation
			                navigation={this.props.navigation}
			                locale={locale}
			                location={location}
			                theme={theme}
			                checkLocation= {() => this.checkLocation()}
			            /> : null }
		            {this.state.location_status ? 
					<OurPartners
						navigation={this.props.navigation}
						locale={this.props.navigation.state.params.locale}
					/> : null}
				</View>
			</MainWrapper>
		);
	}
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 10,
  }
});