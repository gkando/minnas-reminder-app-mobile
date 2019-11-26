import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Dimensions, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import { Container, H1 } from 'native-base';
import { AppColors, MaterialColors, Typography, spacing } from '../../theme';
import { Store } from '../../store';
import TodoService from '../../store/db';
import { Item, ItemModal, ItemList } from '../../components'

const IntroScreen = (props) => {
    // const navigation = useNavigation();
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

    const [itemData, setItemData] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [modalType, setModalType] = useState();
    const [clicked, setClicked] = useState()
    const onSelect = useCallback(
        (type, item) => {
            console.log(type, 'title:  ', item.title)
            setModalType(type)
            setItemData(item)
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
        <Container>
        <View style={styles.full}>
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                <H1 style={Typography.Heading.h1}>Today</H1>
                <Text style={styles.body}>Robust boilerplate to kickstart your next app</Text>
            </View>
            <Text style={styles.item}>Realm <Text style={{ color: MaterialColors.blue[800] }}>{info}</Text></Text>

            <ItemList onSelect={onSelect} data={data} />
            <FAB
                style={styles.fab}
                icon="plus"
                color='#fff'
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