import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {IntroScreen} from '../screens';
import {ItemModal} from '../components/'
import { SurveyScreen } from '../components/modals'

// const StackNavigator = createStackNavigator({
//     IntroScreen: {
//         screen: IntroScreen
//     }
// }, { headerMode: 'none' });

// const AppNavigator = createAppContainer(StackNavigator);
const contentNavigator = createStackNavigator({
  IntroScreen: { screen: IntroScreen },
  },
  {
    initialRouteName: 'IntroScreen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#424242'
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  });

export const StackNavigator = createStackNavigator(
  {
    content: { 
      screen: contentNavigator,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'content',

  }
);
const AppNavigator = createAppContainer(StackNavigator);
export default AppNavigator;
