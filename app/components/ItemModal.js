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
import { Container, Header, Left, Body, Right, Button, Title } from 'native-base';
import { useNavigation } from 'react-navigation-hooks'
import { Overlay, Icon } from 'react-native-elements';
import { AppColors, MaterialColors, Typography } from '../theme';
// import TodoActions from '../store/actions';
import CustomHeader from './header/CustomHeader'
import { Store } from '../store';

// const CustomHeader = () => {
//   return (
//     <Header>
//           <Left>
//             <Button transparent>
//               <Icon name='arrow-back' />
//             </Button>
//           </Left>
//     <Body>
//       <Title>Header</Title>
//     </Body>
//     <Right />
//   </Header>
//   )
// }



const ViewModal = props => {
  const { setModalHeight } = props;
  const [value, onChangeText] = useState(props.data);

  return(
    <View style={styles.input}>

    <TextInput
    style={{ height: 40 }}
    onChangeText={text => onChangeText(text)}
    onFocus={() => setModalHeight(styles.overlayFull)}
    value={value}
    selectionColor={AppColors.secondary}
    placeholderTextColor={MaterialColors.grey[300]}
    style={styles.input}
  />

    {/* <Text style={styles.overlayText}>{props.data}</Text> */}
    </View>
  )
}
const AddModal = (props, handleClose) => {
  // useEffect(() => {
  // props.setModalHeight({height: '40%'})
  //   return () => {
  //   };
  // }, [])
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
    onPress={() => handleSubmit()} />
  </View>
  )
}

const ItemModal = ({ isVisible, setIsVisible, modalData, modalType, navigation, props }) => {
  
  // const [isVisible, setIsVisible] = useState(false);
  const handleClose = () => {
    setIsVisible(!isVisible)
  }
  const [editing, setEdit] = useState(false);
  const [modalHeight, setModalHeight] = useState();

  useEffect(() => {
    modalType === 'add'
    ? setModalHeight(styles.overlayAdd)
    : setModalHeight(styles.overlayView)
    
    return () => {
      console.log("cleaned up");
    };
  }, [isVisible])

  return (
    <Overlay
    onBackdropPress={() => {setIsVisible(!isVisible)}}
    overlayStyle={[ styles.overlay, modalHeight ]}
    isVisible={isVisible}
    // isVisible={true}
    animationType="fade"
    windowBackgroundColor='rgba(18, 18, 18, 0.8)'
    width='100%'
    borderRadius={10}
    onDismiss={() => console.log('Dismissed')}
  >
    {modalHeight === styles.overlayFull ? navigation.push('ItemModal') : null}
    {modalType === 'view' ? <ViewModal data={modalData} setModalHeight={setModalHeight} /> : <AddModal data={modalData} close={handleClose} setModalHeight={setModalHeight} />}
  </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 1,
    backgroundColor: AppColors.background,
    borderColor: AppColors.background,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  overlayFull: {
    height: '100%',
    borderColor: 'red',
    borderRadius: 2
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
  }
});


export default ItemModal
