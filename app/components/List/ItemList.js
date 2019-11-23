import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import { Container, H1 } from 'native-base';
import Item from '../Item'
import { AppColors, MaterialColors, Typography, spacing } from '../../theme';

const ItemList = props => {
  const { onSelect, data } = props;
  return (
    <View style={{flex: 1, flexWrap: 'wrap', width: Dimensions.get('window').width }}>
    <FlatList
        data={data}
        style={styles.list}
        numColumns={1}
        renderItem={({ item }) => (
        <Item
            key={item.id}
            id={item.id}
            style={styles.listItem}
            title={item.title}
            onSelect={() => onSelect('view', item)}
        />
        )}
        keyExtractor={item => item.id}
    />
</View>
  )
}

const styles = StyleSheet.create({
  item: {
      ...Typography.Body.dark,
      marginTop: 10,
      fontSize: 16
  },
  list: {
      flexDirection: 'column',
      backgroundColor: AppColors.background,
  },
  listItem: {
      // padding: 20,
      // marginVertical: 8,
      // marginHorizontal: 16,
  },
  fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor:'rgba(242,86,76,1)',
  },
});

export default ItemList
