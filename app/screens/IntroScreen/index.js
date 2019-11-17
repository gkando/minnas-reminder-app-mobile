import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import { AppColors, MaterialColors, Typography, spacing } from '../../theme';
import { Store } from '../../store';
import TodoService from '../../store/db';
import { Item, ItemModal, Screen } from '../../components'

const IntroScreen = () => {
    var {height, width} = Dimensions.get('window');
    const status = "NEW"
    const { state, dispatch, TodoActions } = useContext(Store);

    const [data, setData] = useState();
    useEffect(() => {
        state.items.length === 0 && TodoActions.fetchData(dispatch);
        setData(state.items);
    }, [state]);
    
    // useEffect(() => {
    //     // const dataList = TodoService.findAll();
    //     const dataList = TodoService.findAll();
    //     setData(dataList);
    //     // TodoActions.testAction();
    // }, []);

    const [modalData, setModalData] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [modalType, setModalType] = useState();
    
    const onSelect = useCallback(
        (type, title) => {
            console.log(type, 'title:  ', title)
            setModalType(type)
            setModalData(title)
            setIsVisible(true)
    },[],);

    const toggleAdd = () => {
        console.log('toggle add')
        setModalType('add')
        setIsVisible(true)
    }

    const info = data
    ? 'Number of items in this new Realm: ' + data.length
    : 'Loading...';

    return (
        <View style={styles.full}>
            {/* <Screen style={styles.container} preset="scroll"> */}
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Today</Text>
                <Text style={styles.body}>Robust boilerplate to kickstart your next app</Text>
            </View>
            <Text style={styles.item}>Realm <Text style={{ color: MaterialColors.blue[800] }}>{info}</Text></Text>
        
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
                        // selected={!!selected.get(item.id)}
                        onSelect={() => onSelect('view', item.title)}
                    />
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
            <FAB
                style={styles.fab}
                icon="plus"
                color='#fff'
                onPress={() => toggleAdd()}
                // onPress={() => alert('Pressed')}
            />
            <ItemModal
                modalType={modalType}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                modalData={modalData} />
            </View>
        </View>
    );
};

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
    body: {
        ...Typography.Body.dark,
        color: MaterialColors.grey[500],
        fontSize: 16
    },
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

export default IntroScreen;