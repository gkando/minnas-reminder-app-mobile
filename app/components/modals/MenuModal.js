import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { Header, Left, Body, Right, Title, Icon, Content, List, Text, Button } from 'native-base';
import { Overlay, CheckBox, ListItem, Divider } from 'react-native-elements';
import AwesomeAlert from 'react-native-awesome-alerts';
import { AppColors, MaterialColors, Typography } from '../../theme';
import { Store } from '../../store';
import TodoService from '../../store/db'


const MenuModal = props => {
  const { dispatch, TodoActions } = useContext(Store);
  const { toggleMenu, menu, item } = props;

  const [alert, toggleAlert] = useState(false);

  const list = [
    {
      title: 'Rename task',
      icon: {name: 'pencil-outline', type: 'MaterialCommunityIcons'},
      action: 'Task',
    },{
      title: 'Move task',
      icon: {name: 'arrow-right-circle-outline', type: 'MaterialCommunityIcons'},
      action: 'Task',
    },{
      title: 'Duplicate task',
      icon: {name: 'content-duplicate', type: 'MaterialCommunityIcons'},
      action: 'Task',
    },{
      title: 'Copy link to task',
      icon: {name: 'link-variant', type: 'MaterialCommunityIcons'},
      action: 'Task',
    },{
      title: 'Show completed sub-tasks',
      icon: {name: 'check-circle-outline', type: 'MaterialCommunityIcons'},
      action: 'Task',
    },{
      title: 'Delete task',
      icon: {name: 'delete-outline', type: 'MaterialCommunityIcons', color:  AppColors.red},
      action: 'Delete',
    },
  ]

  const hideAlert = () => {
    toggleAlert(!alert)
  };

  const handlePress = () => {
    toggleAlert(!alert)

  }

  const handleDelete = () => {
    TodoService.delete(item);
    props.close();
    // TodoActions.delete(item, dispatch, navigation);
  }
  
  return(
    <View style={{flex: 1}}>
      <Overlay
        height="20%"
        borderRadius={0}
        overlayBackgroundColor={MaterialColors.grey[800]}
        overlayStyle={{ justifyContent: 'space-between'}}
        isVisible={alert}
        onBackdropPress={() => toggleAlert(!alert)}
        >
        <Text style={styles.title}>Delete "{item.title}"?</Text>
        <View style={{ flexDirection: 'row', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
          <Button transparent>
            <Text style={styles.title}>No</Text>
          </Button>
          <Button onPress={() => handleDelete()} transparent>
            <Text style={styles.title}>Yes</Text>
          </Button>
        </View>

      </Overlay>
    <Overlay
    onBackdropPress={() => {toggleMenu(!menu)}}
    overlayStyle={[ styles.overlay, styles.overlayView ]}
    isVisible={menu}
    animationType="fade"
    windowBackgroundColor='rgba(18, 18, 18, 0.8)'
    width='100%'
    borderRadius={10}
    onDismiss={() => console.log('Dismissed')}
  >

      
      <Content style={{marginTop: 20}}>
        <Text style={styles.head}>Added on Mmm dd 24:00</Text>
        <Divider style={{ height: 1.5, backgroundColor: AppColors.nightRider }} />
        <View style={styles.body}>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={<Icon name={item.icon.name} type={item.icon.type} style={{color: item.icon.color || MaterialColors.grey[350]}} />}
                containerStyle={styles.listItem}
                titleStyle={[styles.title], {color: item.icon.color || MaterialColors.grey[350]}}
                onPress={() => handlePress(item.action)}
              />
            ))
          }
        </View>
      </Content>

  </Overlay>



  </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: AppColors.background,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    padding: 0,
  },
  overlayView: {
    height: '65%'
  },
  overlayText: {
    fontSize: 20 ,
    color: 'white'
  },
  head: {
    color: AppColors.sonicSilver,
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 20
  },
  body: {
    // flex: 1,
    marginLeft: 20
  },
  viewInput: {
    paddingTop: 15,
  },
  viewOverlay: {
    flex: 1,
    flexDirection: 'column'
  },
  listItem: {
    backgroundColor: AppColors.background,
    padding: 14,
    paddingLeft: 0
  },
  title: {
    color: MaterialColors.grey[350],
  },
  button: {
    color: AppColors.background,
  }
});

export default MenuModal;
