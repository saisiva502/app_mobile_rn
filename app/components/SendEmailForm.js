import React, { Component } from 'react';

import { 
	View, 
	Text, 
	Form, 
	StyleSheet,
	Button,
	Alert,
	Dimensions,
	TouchableOpacity,
	ActivityIndicator,
	UIScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import TextInputField from './TextInputField';
import callApi from '../lib/apiCaller.js';
import config from '../config';

const window = Dimensions.get('window');

export default class SendEmailForm extends Component{
	constructor(props){
		super(props);
		this.state={
			name:'',
			mobile:'',
			name_err_status: false,
			name_err_msg:'',
			mobile_err_status:false,
			mobile_err_msg: '',
			loading: true,
		}
		this.onChangeName = this.onChangeName.bind(this)
		this.onChangeMobile = this.onChangeMobile.bind(this);
		this.sendMail = this.sendMail.bind(this);
	}
	
	onChangeName = (text) => {
		this.setState({
			name: text,
			name_err_status:false,
		})
	}
	
	onChangeMobile = (number) => {
		this.setState({
			mobile: number.replace(/[^0-9]/g, ''),
			mobile_err_status: false,
		});
	}
	
	sendMail =() => {
		let flag= 1;
		let mobile = this.state.mobile;
		let name = this.state.name;
		let regex = /^(((0))[0-9]{10})$/;
		if(name ==='')
		{
			flag=0;
			this.setState({
				name_err_status: true,
				name_err_msg:config.I18n.t('errors.name_err_empty'),
			});
		}
		if(name !=='' && name.length < 3)
		{
			flag=0;
			this.setState({
				name_err_status: true,
				name_err_msg: config.I18n.t('errors.name_err_min'),
			});
		}
		if(mobile === '')
		{
			flag= 0;
			this.setState({
				mobile_err_status: true,
				mobile_err_msg:config.I18n.t('errors.mob_err_empty'),
			});
		}
		if(mobile !== '' && mobile.length < 11)
		{
			flag= 0;
			this.setState({
				mobile_err_status: true,
				mobile_err_msg: config.I18n.t('errors.mob_err_min'),
			});
		}
		if(mobile !== '' && mobile.length === 11 && !regex.test(mobile))
		{
			flag = 0;
			this.setState({
				mobile_err_status: true,
				mobile_err_msg: config.I18n.t('errors.mob_err_zero'),
			});
		}
		if(flag===1)
		{
			this.setState({
				loading: true,
			});
			var data={first_name: name,mobile: mobile,key:this.props.partner.key,code:this.props.partner.code,latitude:this.props.latitude,longitude: this.props.longitude,api_key: config.API_KEY};
			callApi('submit_user_details','post',data).then(response => {
				if(response.status===200)
				{
					this.setState({
						name:'',
						mobile:'',
						loading:false,
					});
					Alert.alert('',config.I18n.t('loc_attr.submit_success'))
				}
				else
				{
					Alert.alert('',config.I18n.t('loc_attr.submit_err'));
				}
			});
		}
	}

	render(){
		return(
			<View style={styles.container}>
				<TextInputField 
					keyboardType="default"
					onChangeText = {this.onChangeName}
					value={this.state.name}
					placeholder=""
					underlineColorAndroid="transparent"
					placeholderTextColor="#ccc"
					label={config.I18n.t('loc_attr.first_name')}
					err_status={this.state.name_err_status}
					err_msg={this.state.name_err_msg}
				/>
                <TextInputField 
					keyboardType="phone-pad"
					onChangeText = {this.onChangeMobile}
					value={this.state.mobile}
					placeholder=""
					maxLength={11}
					underlineColorAndroid="transparent"
					placeholderTextColor="#ccc"
					label={config.I18n.t('loc_attr.mob_number')}
					err_status={this.state.mobile_err_status}
					err_msg={this.state.mobile_err_msg}
				/>
                <View style={styles.buttonContainer}>
                 	<TouchableOpacity 
                 		onPress={this.sendMail} 
                 		style={styles.submitButton}
                 	>
                 		<Text style={styles.sendBtn}>{config.I18n.t('loc_attr.send')}</Text>
                 	</TouchableOpacity>
                </View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		minWidth:window.width - 50,
		marginTop:10,
		backgroundColor:'transparent'
	},
	buttonContainer:{
		alignItems:'center',
		justifyContent:'center',
		paddingLeft:10,
		marginTop:10,
		marginBottom:40,
	},
	submitButton:{
		borderRadius: 5,
		borderWidth: 1,
		borderColor:'#ccc',
		borderBottomColor: '#ccc',
		paddingLeft:20,
		paddingRight: 20,
		paddingTop:10,
		paddingBottom:10
	},
	loaderContainer:{
	    position: 'absolute',
	    backgroundColor:'#ccc',
	    alignItems:'center',
	    justifyContent:'center',
	},
	sendBtn:{
          fontFamily: config.DEFAULT_FONT,
	}
});