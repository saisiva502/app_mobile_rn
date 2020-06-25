import {
  AppRegistry,
} from 'react-native';

import { StackNavigator } from 'react-navigation';
// import OneSignal from 'react-native-onesignal'; // Import package from node modules

import config from './config';
import WelcomeScreen from './screens/WelcomeScreen';
import RequestInstallationScreen from './screens/RequestInstallationScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import OurPackagesScreen from './screens/OurPackagesScreen';
import OurServicesScreen from './screens/OurServicesScreen';
import RechargeAccountScreen from './screens/RechargeAccountScreen';
import ContactPageScreen from './screens/ContactPageScreen';
import ArticlePageScreen from './screens/ArticlePageScreen';
import OurPartnersScreen from './screens/OurPartnersScreen';
import FindLocationScreen from './screens/FindLocationScreen';
import POSScreen from './screens/POSScreen';
import PartnerMapScreen from './screens/PartnerMapScreen';
import ServicesScreen from './screens/ServicesScreen';
import LanguagesScreen from './screens/LanguagesScreen';
import NotificationsScreen from './screens/NotificationsScreen';


let getNavOptions = function() {
  return {
    headerTintColor: 'lightgrey',
    headerTitleStyle: {
      fontFamily: config.DEFAULT_FONT,
      fontWeight: "200"
    },
    headerBackTitleStyle: {
      fontFamily: config.DEFAULT_FONT,
      fontWeight: "200"
    },
    headerStyle: {
      backgroundColor: '#0d1c2a',
      borderWidth: 1,
      borderBottomColor: '#999999'
    }
  }
}

const O3Telecom = StackNavigator({
  Welcome: { screen: WelcomeScreen, navigationOptions: getNavOptions() },
  RequestInstallation: { screen: RequestInstallationScreen, navigationOptions: getNavOptions() },
  Home: { screen: HomeScreen, navigationOptions: getNavOptions() },
  Settings: { screen: SettingsScreen},
  OurPackages: { screen: OurPackagesScreen, navigationOptions: getNavOptions() },
  OurServices: { screen: OurServicesScreen, navigationOptions: getNavOptions() },
  RechargeAccount: { screen: RechargeAccountScreen, navigationOptions: getNavOptions() },
  OurPartners: { screen: OurPartnersScreen, navigationOptions: getNavOptions() },
  ContactPage: { screen: ContactPageScreen },
  ArticlePage: { screen: ArticlePageScreen, navigationOptions: getNavOptions() },
  FindLocation: { screen: FindLocationScreen, navigationOptions: getNavOptions() },
  POSScreen: { screen: POSScreen, navigationOptions: getNavOptions() },
  PartnerMap: { screen: PartnerMapScreen, navigationOptions: getNavOptions() },
  ServicesScreen: { screen: ServicesScreen },
  LanguagesScreen:{screen: LanguagesScreen},
  NotificationsScreen: {screen: NotificationsScreen}
});

console.disableYellowBox = true;

AppRegistry.registerComponent('O3Telecom', () => O3Telecom);
