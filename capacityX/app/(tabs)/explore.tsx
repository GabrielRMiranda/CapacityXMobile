import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';


export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        CapacityX
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
