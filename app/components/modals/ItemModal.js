import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { Overlay, Icon } from 'react-native-elements';
import { AppColors, MaterialColors, Typography } from '../../theme';
import TodoActions from '../../store/actions';
import { Store } from '../../store';



const ViewModal = props => {
  return(
    <Text style={styles.overlayText}>{props.data}</Text>
  )
}
const AddModal = props => {
  const inputRef = useRef();
  const [value, onChangeText] = useState();
  const { state, dispatch } = useContext(Store);
  const toggleKeyboard = () => {
    inputRef.current.focus()
  }
  return(
    <View style={styles.input}>
        {/* <input
          id="task"
          type="text"
          />
        <button className="input-button" type="button" onClick={handleSubmit}>✓</button>
        <button className="input-button btn-clear" type="button" onClick={handleClear}>✗</button> */}
    
    <TextInput
      style={{ height: 40 }}
      onChangeText={text => onChangeText(text)}
      placeholder="e.g. Call Doctor tomorrow at 1pm"
      value={value}
      selectionColor={AppColors.secondary}
      placeholderTextColor={MaterialColors.grey[300]}
      style={styles.input}
      autoFocus={true}
      ref={inputRef}
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
    onPress={() => TodoActions.addItem(value, dispatch)} />
  </View>
  )
}


const ItemModal = ({ isVisible, setIsVisible, modalData, modalType }) => {

  // const [isVisible, setIsVisible] = useState(false);

  return (
    <Overlay
    onBackdropPress={() => {setIsVisible(!isVisible)}}
    // overlayStyle={styles.overlay}
    overlayStyle={[
      styles.overlay,
      modalType === 'add' ?
      { height: '40%' } 
      : { height: '60%' }
    ]}
    isVisible={isVisible}
    animationType="fade"
    windowBackgroundColor='rgba(18, 18, 18, 0.8)'
    width='98%'
    borderRadius={15}
    // fullScreen={false}
  >
    {modalType === 'view' ? <ViewModal data={modalData} /> : <AddModal data={modalData} />}
  </Overlay>
  )
}

const styles = StyleSheet.create({
  overlayContainer: {
    // flex: 2,
    height: '30%',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop: '50%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    backgroundColor: AppColors.background,
    borderColor: AppColors.background,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  overlayText: {
    fontSize: 20 ,
    color: 'white'
  },
  input: {
    fontSize: 16 ,
    color: 'white'
  }
});

export default ItemModal;
