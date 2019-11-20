import React, { Component, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';
import { AppColors } from '../../theme';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import Item from '../Item'


const data = [
  { key: 1, label: 'Label 1', leftLabel: 'Left 1', rightLabel: 'Right 1' },
  { key: 2, label: 'Label 2', leftLabel: 'Left 2', rightLabel: 'Right 2' },
  { key: 3, label: 'Label 3', leftLabel: 'Left 3', rightLabel: 'Right 3' },
  { key: 4, label: 'Label 4', leftLabel: 'Left 4', rightLabel: 'Right 4' },
  { key: 5, label: 'Label 5', leftLabel: 'Left 5', rightLabel: 'Right 5' },
];

const SwipeableList = () => {
  const [flatListData, setFlatListData] = useState(data)
  // const rowSwipeAnimatedValues = {};
  // flatListData
  //   .fill('')
  //   .forEach((_, i) => {
  //       rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
  //   });


        return (
          <SwipeListView
          useFlatList={true}
          data={flatListData}
          renderItem={ (rowData, rowMap) => (
            <Item
            key={rowData.item.key}
            id={rowData.item.key}
            style={styles.listItem}
            title={rowData.item.label}
            onSelect={() => onSelect('view', rowData.item.label)}
            />
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <Text>Left</Text>
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft,]}
                onPress={() => closeRow(rowMap, data.item.key)}
              >
                <Text style={styles.backTextWhite}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight,]}
                  onPress={() => deleteRow(rowMap, data.item.key)}
              >

                        <Image
                            source={require('./trash.png')}
                            style={styles.trash}
                        />
                </TouchableOpacity>
            </View>
        )}
          leftOpenValue={75}
          rightOpenValue={-150}
          onRowOpen={(rowKey, rowMap) => {
              setTimeout(() => {
                  rowMap[rowKey].closeRow()
              }, 2000)
          }}
          previewRowKey={flatListData[0].key}
      />
  )
}

// class SwipeableList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             listType: 'FlatList',
//             listViewData: Array(20)
//             sectionListData:
//         };

//     }

//     closeRow(rowMap, rowKey) {
//         if (rowMap[rowKey]) {
//             rowMap[rowKey].closeRow();
//         }
//     }

//     deleteRow(rowMap, rowKey) {
//         this.closeRow(rowMap, rowKey);
//         const newData = [...this.state.listViewData];
//         const prevIndex = this.state.listViewData.findIndex(
//             item => item.key === rowKey
//         );
//         newData.splice(prevIndex, 1);
//         this.setState({ listViewData: newData });
//     }

//     deleteSectionRow(rowMap, rowKey) {
//         this.closeRow(rowMap, rowKey);
//         const [section] = rowKey.split('.');
//         const newData = [...this.state.sectionListData];
//         const prevIndex = this.state.sectionListData[section].data.findIndex(
//             item => item.key === rowKey
//         );
//         newData[section].data.splice(prevIndex, 1);
//         this.setState({ sectionListData: newData });
//     }

//     onRowDidOpen = rowKey => {
//         console.log('This row opened', rowKey);
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.standalone}>
//                     <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
//                         <View style={styles.standaloneRowBack}>
//                             <Text style={styles.backTextWhite}>Left</Text>
//                             <Text style={styles.backTextWhite}>Right</Text>
//                         </View>
//                         <View style={styles.standaloneRowFront}>
//                             <Text>I am a standalone SwipeRow</Text>
//                         </View>
//                     </SwipeRow>
//                 </View>
//                 {this.state.listType === 'FlatList' && (
//                     <SwipeListView
//                         data={this.state.listViewData}
//                         renderItem={data => (
//                             <TouchableHighlight
//                                 onPress={() => console.log('You touched me')}
//                                 style={styles.rowFront}
//                                 underlayColor={'#AAA'}
//                             >
//                                 <View>
//                                     <Text>
//                                         I am {data.item.text} in a SwipeListView
//                                     </Text>
//                                 </View>
//                             </TouchableHighlight>
//                         )}
//                         renderHiddenItem={(data, rowMap) => (
//                             <View style={styles.rowBack}>
//                                 <Text>Left</Text>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.backRightBtn,
//                                         styles.backRightBtnLeft,
//                                     ]}
//                                     onPress={() =>
//                                         this.closeRow(rowMap, data.item.key)
//                                     }
//                                 >
//                                     <Text style={styles.backTextWhite}>
//                                         Close
//                                     </Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     style={[
//                                         styles.backRightBtn,
//                                         styles.backRightBtnRight,
//                                     ]}
//                                     onPress={() =>
//                                         this.deleteRow(rowMap, data.item.key)
//                                     }
//                                 >
//                                     <Animated.View
//                                         style={[
//                                             styles.trash,
//                                             {
//                                                 transform: [
//                                                     {
//                                                         scale: this.rowSwipeAnimatedValues[
//                                                             data.item.key
//                                                         ].interpolate({
//                                                             inputRange: [
//                                                                 45,
//                                                                 90,
//                                                             ],
//                                                             outputRange: [0, 1],
//                                                             extrapolate:
//                                                                 'clamp',
//                                                         }),
//                                                     },
//                                                 ],
//                                             },
//                                         ]}
//                                     >
//                                         <Image
//                                             source={require('./trash.png')}
//                                             style={styles.trash}
//                                         />
//                                     </Animated.View>
//                                 </TouchableOpacity>
//                             </View>
//                         )}
//                         leftOpenValue={75}
//                         rightOpenValue={-150}
//                         previewRowKey={'0'}
//                         previewOpenValue={-40}
//                         previewOpenDelay={3000}
//                         onRowDidOpen={this.onRowDidOpen}
//                     />
//                 )}
                
//             </View>
//         );
//     }
// }

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    list: {
      flexDirection: 'column',
      backgroundColor: AppColors.background,
      borderWidth: 3,
      borderColor: 'red',
      width: Dimensions.get('window').width
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: Dimensions.get('window').width / 4,
    },
    trash: {
        height: 25,
        width: 25,
    },
});

export default SwipeableList;