import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  View,
  TouchableHighlight,
} from 'react-native';
import { AppColors, Typography, MaterialColors } from '../theme';
import { SearchBar, CheckBox, Overlay, Button } from 'react-native-elements';
import { Toast, Icon } from 'native-base';
import { Store } from '../store';
import TodoService from '../store/db'


var {height, width} = Dimensions.get('window');
const Item = ({ id, title, onSelect }) => {
  const { state, dispatch, TodoActions } = useContext(Store);
  const [checked, setChecked] = useState(false);

  const toastr = {
    showToast: (message, duration = 2500) => {
      Toast.show({
        text: message,
        duration,
        position: 'bottom',
        textStyle: { textAlign: 'left' },
        buttonText: 'Undo',
        buttonTextStyle: {color: AppColors.red},
        style: {backgroundColor: AppColors.nightRider},
        onClose: handleToast
      });
    },
  };

  const handleToast = (reason) => {
    // console.log(Object.keys(reason));
    reason === 'user'
      ? TodoActions.undoHideItem(id, dispatch)
      : 
    console.log(reason)
  }

  const toggleCheck = props => {
    setChecked(!checked)
    TodoActions.hideItem(id, dispatch);
    toastr.showToast('Completed')
  }
  const icon = id !== 'add' ? (<View style={styles.unchecked} />) : (<Icon style={{color: MaterialColors.grey[550]}} name='plus' type='MaterialCommunityIcons' />);
  return (
    <TouchableOpacity onPress={() => onSelect(title)} style={styles.itemContainer}>
      <CheckBox
          uncheckedIcon={icon}
          containerStyle={styles.checkbox}
          onPress={toggleCheck}
          checked={checked}
        />
      <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: AppColors.background,
    padding: 16,
    // paddingBottom: 10,
    paddingHorizontal: 4,
    width: width,
    borderBottomColor: '#343434',
    borderBottomWidth: 0.75,
    borderTopColor: '#343434',
    borderTopWidth: 0.75,
    // marginBottom: 10,
  },
  title: {
    // paddingTop: 2,
    flexWrap: 'wrap',
    textAlign: 'left',
    // alignSelf: 'flex-start',
    flexShrink: 1,
    textAlignVertical: 'top',
    ...Typography.Body.dark
  },
  checkbox: {
    marginBottom: 5,
    marginTop: 0,
    marginLeft: 10,
    padding: 5,
    // alignSelf: 'flex-start'
  },
  unchecked: {
    borderColor: MaterialColors.grey[550],
    borderWidth: 1.2,
    width: 22,
    height: 22,
    borderRadius: 22/2
  },
})

export default Item;
