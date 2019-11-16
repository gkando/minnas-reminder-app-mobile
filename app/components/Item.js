import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  View,
  TouchableHighlight
} from 'react-native';
import { AppColors, Typography } from '../theme';
import { SearchBar, CheckBox, Overlay } from 'react-native-elements';

var {height, width} = Dimensions.get('window');
const Item = ({ id, title, onSelect }) => {
  
  const [checked, setChecked] = useState(false);

  const toggleCheck = props => {
    setChecked(!checked)
  }

  // const { id, title } = props;

  return (
    <TouchableOpacity
      // style={styles.itemContainer}
      onPress={() => onSelect(title)}
      style={styles.itemContainer}
    >
      <CheckBox
        onPress={toggleCheck}
        checked={checked}
      />
      <Text style={styles.title}>{title}</Text>

    {/* <TouchableOpacity
      onPress={() => onSelect(title)}
      style={styles.item}
    > */}
    {/* </TouchableOpacity> */}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background,
    paddingVertical: 10,
    width: width,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    
  },
  title: {
    flexWrap: 'wrap',
    textAlign: 'left',
    flexShrink: 1,
    ...Typography.Body.dark
  },
})

export default Item;
