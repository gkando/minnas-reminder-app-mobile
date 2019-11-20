import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

function FooScreen(props) {
  console.log('foo nav id: ', props.navigation.state)

  return (
<View style={{ position: "absolute", backgroundColor: 'rgba(255,0,0,0.4)', top: 0, bottom: 0, left: 0, right: 0 }}>
  <Text>FOO</Text>
  <Button
  title="Main"
  onPress={() => props.navigation.navigate('TestModal')}
/>
  <Button
  title="Bottom Sheet"
  onPress={() => props.navigation.navigate('Bottom')}
/>
</View>
  )
}

export default FooScreen
