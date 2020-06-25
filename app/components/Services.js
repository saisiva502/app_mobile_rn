// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Text,
//   View,
//   WebView
// } from 'react-native';
// import { Col, Row, Grid } from "react-native-easy-grid";
// // import DOMParser from 'react-native-html-parser';
// import config from '../config';
// import helper from '../lib/helper';
// import { overlays } from './Overlays';
// import { StyleProvider,Badge,  Thumbnail, Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
// import getTheme from '../../native-base-theme/components';
// import platform from '../../native-base-theme/variables/platform';

// export default class Services extends Component {
//   render() {
//     let mainMenu = config.MAIN_MENU;
//     return (
//       <View style={styles.gridWrapper}>
//         <ScrollView>
//           <Grid>
//             <Row>
//               {
//                     Object.keys(mainMenu).map(function (code) {
//                       let item = mainMenu[code];

//                   return (
//                     <Col style={{backgroundColor: 'white', width: '50%', height: 300, alignItems: 'center'}}>
//                       <TouchableOpacity
//                         key={code}
//                         style={styles.gridItem}
//                         // onPress={() => navigate('ArticlePage', {title: title, content: content})}
//                       >
//                         <Image
//                           style={styles.buttonBG}
//                           source={overlays[code]}
//                           resizeMode={Image.resizeMode.contain}
//                         />
//                         <Text>{config.I18n.t(`main_menu.${code}`)}</Text>
//                       </TouchableOpacity>
//                     </Col>
//                   );
//                 })
//               }
//             </Row>
//           </Grid>
//       </ScrollView>
//       </View>
//     );
//   }
// }

// let dims = helper.getElementDimentions();

// const styles = StyleSheet.create({
//   gridWrapper: {
//     backgroundColor: '#f5f5f5',
//     height: '100%',
//   },
//   container:{
//     // backgroundColor: '#f5f5f5',
//     overflow: 'scroll'
//   },
//   image:{
//     marginLeft: 20
//   },
//   icon:{
//     color: '#969696'
//   },
//   new:{
//     position:'absolute',
//     fontWeight: 'bold',
//     bottom: 160,
//     fontSize: 18,
//     color: '#000000',
//     width: '100%',
//   },

//   gridItem: {
//     margin: dims.boxMargin,
//     height: 60,
//     flexDirection: 'row',
//     borderRadius: 10,
//     marginTop: 10
//   },
//   newGrid:{
//     margin: dims.boxMargin,
//     height: 80,
//     flexDirection: 'row',
//     borderRadius: 10,
//     marginTop: 10
//   },
//   newButtonText: {
//     fontSize: 14,
//     color: '#ffffff',
//     fontFamily: config.DEFAULT_FONT,
//     paddingTop: 25,
//     paddingLeft: 15,
//     paddingRight: 15,
//     marginRight: 15
//   },
//   newButtonBG: {
//     position: 'absolute',
//     right: 10,
//     width: 30,
//     height: 30,
//     marginTop: 25,
//     opacity: 0.7,
//     paddingRight: 10,
//     marginLeft: 10
//   },
//   buttonText: {
//     fontSize: 14,
//     color: '#ffffff',
//     fontFamily: config.DEFAULT_FONT,
//     paddingTop: 15,
//     paddingLeft: 15,
//     paddingRight: 15,
//     marginRight: 15
//   },
//   buttonBG: {
//     position: 'absolute',
//     right: 10,
//     width: 30,
//     height: 30,
//     marginTop: 15,
//     opacity: 0.7,
//     paddingRight: 10,
//     marginLeft: 10
//   },
//   footer:{
//     backgroundColor: '#ffffff',
//   },
//   profileImgContainer: {
//     marginLeft: 8,
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//   },
//   profileImg: {
//     height: 60,
//     width: 60,
//     borderRadius: 40,
//     borderColor: '#dedede', 
//     borderWidth:1,
//     marginBottom: 5,
//     marginTop: 5,
//     marginLeft: 10
//   },
//   mainMenu:{
//     position: 'absolute',
//     bottom: 70,
//     paddingTop:30,
//     borderColor: '#61dafb'
//   }
// });

import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View
} from 'react-native';

import config from '../config';
import helper from '../lib/helper';

import { overlays } from './Overlays';

export default class OurServices extends Component {
  render() {
    const { navigate } = this.props.navigation;
    let mainMenu = config.MAIN_MENU;
    return (
      <ScrollView contentContainerStyle={styles.gridWrapper}>
        {
          // Object.keys(config.SERVICES).map(function (code) {
          //   let srv = config.SERVICES[code];
          //   let title = config.I18n.t(`services.${code}`);
          //   let desc = config.I18n.t(`services.${code}_desc`);
          //   let content = [<Text key={code} style={styles.content}>{desc}</Text>];
          // {
            Object.keys(mainMenu).map(function (code) {
              let item = mainMenu[code];

            return (
              <TouchableOpacity
                key={code}
                style={styles.gridItem}
                // onPress={() => navigate('ArticlePage', {title: title, content: content})}
              >
                <View style={styles.item}>
                  <View style={{backgroundColor: item.backgroundColor, padding: 10, borderRadius: 50}}>
                    <Image
                      style={styles.buttonBG}
                      source={overlays[code]}
                      resizeMode={Image.resizeMode.contain}
                    />
                  </View>
                  <Text style={styles.title}>{config.I18n.t(`main_menu.${code}`)}</Text>
                </View>
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
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    // paddingBottom: 10,
  },
  item:{
    alignContent: 'center',
    alignItems: 'center'
  },
  gridItem: {
    margin: 5,
    width: dims.boxWidth-10,
    height: dims.boxHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5
  },
  title: {
    fontSize: 16,
    fontFamily: config.DEFAULT_FONT,
    paddingTop: 15,
  },
  buttonBG: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  content: {
    fontSize: 18,
    lineHeight: 24
  }
});