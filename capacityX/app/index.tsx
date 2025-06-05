import React, { useState } from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';

export default function Home() {
  const [carregando, setCarregando] = useState(false);

  const consultaTec = async () => {
    setCarregando(true);
    try {
      const response = await fetch('http://100.71.234.30:3000/tecnico', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na consulta de técnicos: ${response.status}`);
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Erro no catch:", error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Tela Inicial</Text>
      <Button
        title={carregando ? 'Carregando...' : 'Consultar Técnicos'}
        onPress={consultaTec}
        disabled={carregando}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});