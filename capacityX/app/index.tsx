import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';

export default function home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar></StatusBar>
      <Text>Tela Inicial</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop : 50
  },

  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
