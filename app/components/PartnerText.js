import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class PartnerText extends Component{

	render(){
    let locale = this.props.locale;
		return(
			<View style={styles.container}>
				<Text style={this.props.bold ? styles.bold : styles.normal_text} >{this.props.text}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  	container:{
  		marginTop: 5,
  		marginBottom:5,
  	},
  	bold: {
  		color:'#000000',
  		fontWeight:'bold'
  	},
  	normal_text: {
  		color:'#000000',
  		fontWeight:'normal'
  	}
});