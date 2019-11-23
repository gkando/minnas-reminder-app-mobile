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
import { Header, Left, Body, Right, Title, Icon } from 'native-base';
import { useNavigation } from 'react-navigation-hooks'
import { Overlay, Button, CheckBox } from 'react-native-elements';
import { CustomHeader } from './'
import { AppColors, MaterialColors, Typography } from '../theme';
import { Store } from '../store';
import TodoService from '../store/db'

const MenuModal = props => {
  const { setModalHeight, value, onChangeText } = props;

  return(
    <View style={styles.input}>
      <TextInput
      style={{ height: 40 }}
      onChangeText={text => onChangeText(text)}
      onFocus={() =>  setModalHeight(styles.overlayFull)}
      value={value}
      selectionColor={AppColors.secondary}
      placeholderTextColor={MaterialColors.grey[300]}
      style={styles.input}
    />
  </View>
  )
}

const ViewModal = props => {
  const { setModalHeight, value, onChangeText } = props;

  const [checked, setchecked] = useState(true)
  return (
    <View style={styles.viewOverlay}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {/* <CheckBox style={{marginRight: 10}} checked={true} /> */}
        <TouchableHighlight style={styles.checkbox} onPress={() => setchecked(!checked)}>
          <View />
          </TouchableHighlight>
        <TextInput
          style={{height: 40}}
          onChangeText={text => onChangeText(text)}
          onFocus={() => setModalHeight(styles.overlayFull)}
          value={value}
          selectionColor={AppColors.secondary}
          placeholderTextColor={MaterialColors.grey[300]}
          style={styles.input}
        />
      </View>

      <View
        style={{
          borderBottomColor: 'transparent',
          marginTop: 0,
          paddingTop: 10,
        }}>
        <Button
          title="Today"
          type="outline"
          titleStyle={{color: 'white', fontSize: 20}}
          buttonStyle={{
            borderColor: 'white',
            width: 100,
            height: 35,
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
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity>
            <Icon name="pricetag" style={{color: 'white'}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="flag" style={{color: 'white'}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="alarm" style={{color: 'white'}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="text" style={{color: 'white'}} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Icon
            name="more"
            style={{
              flex: 1,
              color: 'white',
              flexGrow: 1,
              marginLeft: 80,
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const AddModal = props => {
  const inputRef = useRef();
  const [value, onChangeText] = useState();
  const { dispatch, TodoActions } = useContext(Store);
  const toggleKeyboard = () => {
    inputRef.current.focus()
  }
  const handleSubmit = () => {
    TodoActions.addItem(value, dispatch);
    props.close();
  }
  return(
    <View style={styles.input}>
      <TextInput
        ref={inputRef}
        style={{ height: 40 }}
        onChangeText={text => onChangeText(text)}
        placeholder="e.g. Call Doctor tomorrow at 1pm"
        value={value}
        selectionColor={AppColors.secondary}
        placeholderTextColor={MaterialColors.grey[300]}
        style={styles.input}
        autoFocus={true}
        onFocus={() => toggleKeyboard}
      />
      <Icon
      reverse
      size={16}
      name='send'
      type='material'
      color={AppColors.secondary}
      disabledStyle={{backgroundColor: 'transparent'}}
      disabled={!value}
      onPress={() => handleSubmit()} />
  </View>
  )
}

const ItemModal = ({ isVisible, setIsVisible, modalType, data, navigation, props }) => {
  const inputRef = useRef();
  const [item, setItem] = useState();
  const [inputR, setInputRef] = useState();
  
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
      console.log("cleaned up");
    };
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(!isVisible)
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
    onDismiss={() => console.log('Dismissed')}
  >
    {modalHeight === styles.overlayFull ? <CustomHeader input={value} item={item} close={handleClose} /> : null}
    {modalType === 'view' ? <ViewModal item={item} value={value} onChangeText={onChangeText} close={handleClose} setModalHeight={setModalHeight} /> : <AddModal setModalHeight={setModalHeight} />}
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
    height: '60%'
  },
  overlayAdd: {
    height: '40%'
  },
  overlayText: {
    fontSize: 20 ,
    color: 'white'
  },
  input: {
    padding: 10,
    fontSize: 20 ,
    color: 'white',
    fontFamily: 'sans-serif-light'
  },
  viewInput: {
    paddingTop: 15,
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
  }
});


export default ItemModal
