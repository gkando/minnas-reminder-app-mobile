import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
import Item from '../Item'
import { AppColors, MaterialColors, Typography, spacing } from '../../theme';

const ItemList = (props) => {
  const {onSelect, data} = props;
  const footer = (typeof props.footer !== 'undefined') ?  props.footer : null;
  // const { onSelect, data } = props;
  return (
    <View style={styles.container}>
      <SectionList
          sections={data}
          style={styles.list}
          numColumns={1}
          ListFooterComponent={footer}
          renderItem={({ item }) => (
          <Item
              key={item.id}
              id={item.id}
              title={item.title}
              onSelect={() => onSelect('view', item)}
          />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          keyExtractor={item => item.id}
      />
</View>
  )
}

ItemList.whyDidYouRender = true

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    width: Dimensions.get('window').width,
  },
  list: {
    flexDirection: 'column',
    backgroundColor: AppColors.background,
  },
  divider: {
    backgroundColor: '#343434',
    height: 1.75,
  },
  header: {
    fontSize: 32,
    color: 'red'
  },
});

export default ItemList
