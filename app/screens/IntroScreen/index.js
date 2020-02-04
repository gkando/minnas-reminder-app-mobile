import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, SectionList } from 'react-native';
import { FAB } from 'react-native-paper';
import { Container, H1 } from 'native-base';
import { AppColors, MaterialColors, Typography, spacing } from '../../theme';
import { Store } from '../../store';
import TodoService from '../../store/db';
import { Item, ItemModal, ItemList } from '../../components'

const IntroScreen = props => {
  const {state, dispatch, TodoActions} = useContext(Store);

  var {height, width} = Dimensions.get('window');

  const [data, setData] = useState();
  useEffect(() => {
    state.items.length === 0 && TodoActions.fetchData(dispatch);
    setData(state.items);
  }, [state]);

  const [itemData, setItemData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState();
  const [clicked, setClicked] = useState();

  const onSelect = useCallback((type, item) => {
    setModalType(type);
    setItemData(item);
    setIsVisible(true);
  }, []);

  const toggleAdd = () => {
    setModalType('add');
    setIsVisible(true);
  };

  return (
    <Container>
      <View style={styles.full}>
        <View style={styles.container}>
          {/* <ItemList onSelect={onSelect} data={data} /> */}
          <SectionList
            sections={data}
            style={styles.list}
            numColumns={1}
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
          <FAB
            style={styles.fab}
            icon="plus"
            color="#fff"
            onPress={() => toggleAdd()}
          />
          <ItemModal
            modalType={modalType}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            data={itemData}
            navigation={props.navigation}
          />
        </View>
      </View>
    </Container>
  );
};

IntroScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Today')
});

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.tiny,
    // flexWrap: 'wrap',
    backgroundColor: AppColors.background
  },
  headerContainer: {
    marginLeft: 10,
    alignItems: 'center',
  },
  heading: {
    ...Typography.Body.dark,
    fontSize: 24
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    // paddingTop: 10,
    marginTop: 25,
    marginBottom: 12,
    marginLeft: 20,
    ...Typography.Body.dark,
    
  },
  body: {
    ...Typography.Body.dark,
    color: MaterialColors.grey[500],
    fontSize: 16
  },
  list: {
    flexDirection: 'column',
    backgroundColor: AppColors.background,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'rgba(242,86,76,1)',
  },
});

export default IntroScreen;