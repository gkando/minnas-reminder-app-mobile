import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { IntroScreen } from '../screens';
import FooScreen from '../screens/FooScreen'
import TestModalScreen from '../screens/TestModalScreen'
import BottomSheet from '../screens/BottomSheet'
import { ItemModal } from '../components'
// const StackNavigator = createStackNavigator({
//     IntroScreen: {
//         screen: IntroScreen
//     }
// }, { headerMode: 'none' });

// const AppNavigator = createAppContainer(StackNavigator);
const contentNavigator = createStackNavigator({
  IntroScreen: { screen: IntroScreen },
  FooScreen: { screen: FooScreen},
},
  {
    
    initialRouteName: 'IntroScreen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#424242',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      },
    }
  });

export const StackNavigator = createStackNavigator(
  {
    content: contentNavigator,
},
  {
    headerMode: 'none',
    mode: 'modal',
    cardStyle:{
      backgroundColor:"transparent",
      opacity:0.99
    },
    
    transparentCard: true,
    initialRouteName: 'content',

  }
);
const AppNavigator = createAppContainer(StackNavigator);
export default AppNavigator;