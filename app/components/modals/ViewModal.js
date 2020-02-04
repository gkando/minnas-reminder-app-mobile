import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  FlatList
} from 'react-native';
import { Header, Left, Body, Right, Title, Icon } from 'native-base';
import { Overlay, Button, CheckBox, Divider, ListItem } from 'react-native-elements';
import { ItemList, Item } from '../'
import { AppColors, MaterialColors, Typography } from '../../theme';
import { Store } from '../../store';
import TodoService from '../../store/db'

const data = [{id: '101', title: 'subtask 1'}, {id: '102', title: 'subtask 2'}]

const ViewModal = props => {
  const { setModalHeight, value, onChangeText, menu, toggleMenu } = props;
  const [checked, setchecked] = useState(true)

  const onSelect = useCallback(
    (type, item) => {
        // console.log(type, 'title:  ', item.title)
        // setModalType(type)
        // setItemData(item)
        // setIsVisible(true)
},[],);

  return (
    <View style={styles.viewOverlay}>
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity>
            <Icon name="pricetag" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="flag" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="alarm" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="text" style={styles.icon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => toggleMenu(!menu)}>
          <Icon name="more" style={styles.iconMore} />
        </TouchableOpacity>
      </View>
      <Divider style={{ padding: 0, height: 1.5, backgroundColor: AppColors.nightRider }} />
      <View style={{flex: 6, justifyContent: 'flex-start',  paddingHorizontal: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5}}>
          <Icon name="file-tree" type="MaterialCommunityIcons" style={{color: MaterialColors.grey[350]}} />
          <Text style={styles.subtitle}>Sub-tasks</Text>
        </View>
        <View>
          <FlatList
            data={data}
            style={styles.list}
            numColumns={1}
            ListFooterComponent={<Item title='Add sub-item' id='add' onSelect={onSelect} />}
            renderItem={({item}) => (
                <Item
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  onSelect={() => onSelect('view', item)}
                />
              )}
              renderSectionHeader={({section: {title}}) => (
                <Text style={styles.header}>{title}</Text>
              )}
              keyExtractor={item => item.id}
            />
        </View>

        {/* <ItemList onSelect={onSelect} data={data} footer={} /> */}

      </View>
    </View>
  );
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
  },
  icon: {
    fontSize: 25,
    color: 'white'
  },
  iconMore: {
    flex: 1,
    color: 'white',
    flexGrow: 1,
    marginLeft: 80,
    marginRight: 15,
  },
  subtitle: {
    paddingTop: 2,
    paddingLeft: 8,
    flexWrap: 'wrap',
    textAlign: 'left',
    // alignSelf: 'flex-start',
    flexShrink: 1,
    textAlignVertical: 'top',
    ...Typography.Body.dark
  },
  list: {
    flexDirection: 'column',
    backgroundColor: AppColors.background,
  },
});

export default ViewModal;
