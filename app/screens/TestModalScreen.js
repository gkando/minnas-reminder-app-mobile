import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';


function TestModalScreen() {
  return (
    <View style={styles.container}>
    <View style={{ height: "50%" ,width: '100%', backgroundColor:"grey", justifyContent:"center"}}>
      <Text>Testing a modal with transparent background</Text>
    </View>
</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  innerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 100,
    backgroundColor: 'red',
  },
});

export default TestModalScreen;