import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { Header, Left, Body, Right, Title, ActionSheet } from 'native-base';
import { useNavigation } from 'react-navigation-hooks'
import { Overlay, Button, CheckBox, Icon } from 'react-native-elements';
import { CustomHeader } from './'
import { ViewModal, MenuModal } from './modals'
import { AppColors, MaterialColors, Typography } from '../theme';
import { Store } from '../store';
import TodoService from '../store/db'

const AddModal = props => {
  const { dispatch, TodoActions } = useContext(Store);
  const inputRef = useRef();
  const [value, onChangeText] = useState();
  const toggleKeyboard = () => {
    inputRef.current.focus()
  }
  const handleSubmit = () => {
    TodoActions.addItem(value, dispatch);
    props.close();
  }
  return(
    <View style={styles.addContainer}>
      <TextInput
        ref={inputRef}
        onChangeText={text => onChangeText(text)}
        placeholder="e.g. Call Doctor tomorrow at 1pm"
        value={value}
        selectionColor={AppColors.secondary}
        placeholderTextColor={MaterialColors.grey[300]}
        style={styles.input}
        autoFocus={true}
        onFocus={() => toggleKeyboard}
      />
      <View
        style={{
          borderBottomColor: 'transparent',
          marginTop: 2,
        }}>
        <Button
          title="Today"
          type="outline"
          titleStyle={{color: 'white', fontSize: 14}}
          buttonStyle={{
            borderColor: 'white',
            width: 100,
            height: 30,
            marginLeft: 40,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginLeft: 0,
          paddingTop: 20,
          paddingHorizontal: 10
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <Icon type='ionicon' name="md-pricetag" iconStyle={styles.icon} />
          <Icon type="ionicon" name="md-flag" iconStyle={styles.icon} />
          <Icon type="ionicon" name="md-alarm" iconStyle={styles.icon} />
          <Icon type="ionicon" name="md-text" iconStyle={styles.icon} />

        </View>
        <Icon
          reverse
          size={25}
          containerStyle={styles.iconMore}
          name='send'
          color={AppColors.red}
          disabledStyle={{backgroundColor: 'transparent'}}
          disabled={!value}
          onPress={() => handleSubmit()}
        />
        </View>
  </View>
  )
}

const ItemModal = ({ isVisible, setIsVisible, modalType, data, navigation, props }) => {
  const inputRef = useRef();
  const [item, setItem] = useState();
  const [inputR, setInputRef] = useState();
  const [menu, toggleMenu] = useState(false);
  
  const [value, onChangeText] = useState();
  const [modalHeight, setModalHeight] = useState();

  useEffect(() => {
    setItem(data);
    modalType === 'view'
      ? onChangeText(data.title)
      : null;
    modalType === 'add'
      ? setModalHeight(styles.overlayAdd)
      : setModalHeight(styles.overlayView);
    return () => {
      // console.log("cleaned up");
    };
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(!isVisible)
  }

  if (!isVisible) {
    return null;
  }
  return (
    <Overlay
    onBackdropPress={() => {setIsVisible(!isVisible)}}
    overlayStyle={[ styles.overlay, modalHeight ]}
    isVisible={isVisible}
    animationType="fade"
    windowBackgroundColor='rgba(18, 18, 18, 0.8)'
    width='100%'
    borderRadius={10}
  >
    {modalHeight === styles.overlayFull
      ? <CustomHeader input={value} item={item} close={handleClose} />
      : null}
    {modalType === 'view' 
      ? <ViewModal
          item={item}
          value={value}
          onChangeText={onChangeText}
          close={handleClose}
          setModalHeight={setModalHeight}
          menu={menu}
          toggleMenu={toggleMenu}
        />
      : <AddModal setModalHeight={setModalHeight} close={handleClose} />}
    {menu === true
      ? <MenuModal menu={menu} toggleMenu={toggleMenu} close={handleClose} item={item} />
      : null}
  </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: AppColors.background,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  overlayFull: {
    height: '100%',
    padding: 0,
  },
  overlayView: {
    height: '60%',
    padding: 0
  },
  overlayAdd: {
    height: '40%',
    paddingTop: 2
  },
  overlayText: {
    fontSize: 20 ,
    color: 'white'
  },
  addContainer: {
    paddingHorizontal: 10,
    flex: 1,
    // flexDirection: 'row'
  },
  input: {
    fontSize: 16 ,
    ...Typography.Body.dark,
  },
  viewOverlay: {
    flex: 1,
    flexDirection: 'column'
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20/2,
    borderColor: AppColors.whisper,
    borderWidth: 1
  },
  icon: {
    fontSize: 25,
    color: 'white'
  },
  iconMore: {
    flex: 1,
    flexGrow: 1,
    // marginLeft: 80,
    // marginRight: 15,
  },
});


export default ItemModal
