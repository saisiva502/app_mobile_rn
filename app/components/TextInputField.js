import React, { Component } from 'react';
import { View, Text, TextInput, Image, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import config from '../config';


const INPUT_HEIGHT = 35;
const BORDER_RADIUS = 4;

const window = Dimensions.get('window');

export default class TextInputField extends Component{
	render(){
		return(
			<View style={styles.formContainer}>
				<View style={styles.elementContainer}>
					{this.props.label ? <Text style={styles.label}>{this.props.label}</Text> : null}
					<TextInput
						style={styles.input}
						placeholder={this.props.placeholder}
						placeholderTextColor={this.props.placeholderTextColor}
						underlineColorAndroid={this.props.underlineColorAndroid}
						keyboardType={this.props.keyboardType}
						value={this.props.value}
						onChangeText={this.props.onChangeText}
						maxLength={this.props.maxLength}
					/>
				</View>
				<View style={styles.errorContainer}>
					<Text style={styles.error_msg}>{this.props.err_status ? this.props.err_msg : null}</Text>
				</View>
			</View>
		);
	}
}
	
TextInputField.propTypes = {
	onChangeText: PropTypes.func,
	value: PropTypes.any,
	keyboardType: PropTypes.string,
	placeholder: PropTypes.string,
	underlineColorAndroid: PropTypes.string,
	placeholderTextColor: PropTypes.string,
	maxLength: PropTypes.number,
	label : PropTypes.string,
}

const styles = StyleSheet.create({
	formContainer: {
		flex:1,
	},
	elementContainer:{
		justifyContent:'space-around',
		flexDirection:'row'
	},
	label: {
		flex:1,
		textAlignVertical:'center',
		justifyContent:'center',
		height : INPUT_HEIGHT,
		margin:10,
		textAlign:'left',
		fontFamily: config.DEFAULT_FONT,
	},
	input: {
		color:'#000000',
		flex: 1,
		width: '90%',
		backgroundColor:'transparent',
		height: INPUT_HEIGHT,
		paddingHorizontal: 12,
		margin:10,
		borderWidth: 1,
		borderColor:'#ccc',
		borderTopColor:'#ccc',
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		fontFamily: config.DEFAULT_FONT,
	},
	errorContainer:{
		flex: 1,
		flexDirection:'row',
		justifyContent:'flex-end',
		alignItems:'center',
		marginRight:15
	},
	error_msg: {
		color:'red'
	}
});