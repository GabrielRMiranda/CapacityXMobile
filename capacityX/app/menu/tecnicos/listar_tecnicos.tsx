import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usuarios, tecnicos as tecnicosData } from '../../../data';

export default function ListarTecnicos() {

  type Tecnico = {
    id: number;
    email: string,
    id_usuario: number;
    know_how: number;
    status: boolean;
    nomeUsuario?: string;
    [key: string]: any;
  };

  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tecnicosComNome = tecnicosData
      .filter(tecnico => typeof tecnico.id_usuario === 'number')
      .map(tecnico => {
        const usuario = usuarios.find(u => u.id === tecnico.id_usuario);
        return {
          ...tecnico,
          email: usuario ? usuario.email : 'Email não encontrado',
          nomeUsuario: usuario ? usuario.nome : 'Nome não encontrado',
        };
      }) as Tecnico[];
    setTecnicos(tecnicosComNome);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar />
      <Text style={styles.title}>Lista de Técnicos</Text>

      <SafeAreaView style={styles.cardDevContainer}>
        {tecnicos.map((tecnico) => (
          <View key={tecnico.id} style={styles.cardDev}>
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{tecnico.nomeUsuario}</Text>
              <Text style={styles.prof}>{tecnico.email}</Text>
              <Text style={styles.prof}>Know-how: {tecnico.know_how}</Text>
              <Text style={styles.bio}>Status: {tecnico.status ? 'Ativo' : 'Inativo'}</Text>
            </View>
          </View>
        ))}
      </SafeAreaView>

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          CapacityX - Todos os direitos reservados
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50
  },
  title: {
    color: '#black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scrollContainer: {
    padding: 20,
  },
  cardDevContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardDev: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: '100%',
    minHeight: 150,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  prof: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  bio: {
    fontSize: 10,
    color: '#666',
  },
  bottom: {
    padding: 40,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  bottomText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
