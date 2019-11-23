import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Header, Left, Body, Right, Button, Title } from 'native-base';
import { Overlay, Icon } from 'react-native-elements';
import { AppColors, MaterialColors } from '../../theme';
import TodoService from '../../store/db';

const CustomHeader = props => {
  const {input, item} = props;

  const handleSubmit = () => {
    TodoService.update(item, input);
    props.close();
  };
  return (
  <Header
    style={{elevation: 6, height: 56, backgroundColor: AppColors.header}}
    androidStatusBarColor={AppColors.black}
    iosBarStyle="light-content">
    <Left>
      <Button transparent onPress={() => props.close()}>
        <Icon name="arrow-back" color={MaterialColors.grey[350]} />
      </Button>
    </Left>
    <Body>
      <Title style={{color: AppColors.whisper}}>Edit task</Title>
    </Body>
    <Right>
      <Button transparent onPress={() => handleSubmit()}>
        <Icon name="send" size={18} color={MaterialColors.grey[350]} />
      </Button>
    </Right>
  </Header>
  );
};

export default CustomHeader;
