import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListarTecnicos() {
  type Tecnico = {
    id: number;
    id_usuario: number;
    id_categoria?: number;
    email: string;
    know_how: number;
    status: boolean;
    nomeUsuario?: string;
    inicio_vigencia?: string;
    fim_vigencia?: string | null;
  };

  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const consultaUsuario = async (id_usuario: number) => {
    setLoading(true);
    try {
      let response = await fetch(`http://100.71.234.30:3000/usuario/${id_usuario}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert('Erro: Usuário não encontrado - ' + response.status);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Erro capturado: ', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /*const consultaTecnicos = async () => {
    setLoading(true);
    try {
      let response = await fetch('http://100.71.234.30:3000/tecnico', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert('Erro: Não foi possível consultar os dados de técnicos.');
        return;
      }

      let json = await response.json();

      const tecnicos = await Promise.all(
        json.map(async (tecnico: Tecnico) => {
          let usuario = await consultaUsuario(tecnico.id_usuario);
          return {
            id: tecnico.id,
            id_usuario: tecnico.id_usuario,
            email: usuario?.email,
            know_how: tecnico.know_how,
            status: tecnico.status,
            nomeUsuario: usuario?.nome,
          };
        })
      );

      console.log('json: ', json)

      setTecnicos(tecnicos);
    } catch (error) {
      console.error('Erro capturado: ', error);
      setTecnicos([]);
    } finally {
      setLoading(false);
    }
  };*/

  const consultaTecnicos = async () => {
    setLoading(true);
    try {
      let response = await fetch('http://100.71.234.30:3000/tecnico', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert('Erro: Não foi possível consultar os dados de técnicos.');
        return;
      }

      let json = await response.json();

      const tecnicos = await Promise.all(
        json.map(async (tecnico: Tecnico) => {
          let usuario = await consultaUsuario(tecnico.id_usuario);
          return {
            id: tecnico.id,
            id_usuario: tecnico.id_usuario,
            id_categoria: tecnico.id_categoria, // Adiciona id_categoria
            email: usuario?.email,
            know_how: tecnico.know_how,
            status: tecnico.status,
            nomeUsuario: usuario?.nome,
            inicio_vigencia: tecnico.inicio_vigencia, // Adiciona inicio_vigencia
            fim_vigencia: tecnico.fim_vigencia, // Adiciona fim_vigencia
          };
        })
      );

      setTecnicos(tecnicos);
    } catch (error) {
      console.error('Erro capturado: ', error);
      setTecnicos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    consultaTecnicos();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  /* const editar = (tecnico: Tecnico) => {
    const tecnicoSerializavel = {
      id: tecnico.id,
      id_usuario: tecnico.id_usuario,
      email: tecnico.email,
      know_how: tecnico.know_how,
      status: tecnico.status,
      nomeUsuario: tecnico.nomeUsuario,
    };

    router.push({
      pathname: '/menu/tecnicos/editar_tecnicos',
      params: {
        tecnico: JSON.stringify(tecnicoSerializavel),
      },
    });
  }; */

  const editar = (tecnico: Tecnico) => {
    const tecnicoSerializavel = {
      id: tecnico.id,
      id_usuario: tecnico.id_usuario,
      id_categoria: tecnico.id_categoria, // Adiciona id_categoria
      email: tecnico.email,
      know_how: tecnico.know_how,
      status: tecnico.status,
      nomeUsuario: tecnico.nomeUsuario,
      inicio_vigencia: tecnico.inicio_vigencia, // Adiciona inicio_vigencia
      fim_vigencia: tecnico.fim_vigencia, // Adiciona fim_vigencia
    };

    router.push({
      pathname: '/menu/tecnicos/editar_tecnicos',
      params: {
        tecnico: JSON.stringify(tecnicoSerializavel),
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <StatusBar />
      <Text style={styles.title}>Lista de Técnicos</Text>

      <SafeAreaView style={styles.cardDevContainer}>
        {tecnicos.map((tecnico) => (
          <View key={tecnico.id} style={styles.cardDev}>
            <View style={styles.fotoContainer}>
              <Image source={require('../../../assets/images/userdefault.jpg')} style={styles.foto} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{tecnico.nomeUsuario}</Text>
              <Text style={styles.email}>
                E-mail: <Text style={{ fontWeight: '300' }}>{' ' + tecnico.email}</Text>
              </Text>
              <Text style={styles.knowhow}>
                Know-how: <Text style={{ fontWeight: '300' }}>{tecnico.know_how ? ` ${tecnico.know_how}` : ` 0`}</Text>
              </Text>
              <Text style={styles.status}>
                Status: <Text style={{ fontWeight: '300' }}>{tecnico.status ? ' Ativo' : ' Inativo'}</Text>
              </Text>
              <TouchableOpacity style={styles.buttonEdit} onPress={() => editar(tecnico)}>
                <View style={styles.alignIcon}>
                  <FontAwesome name="edit" size={18} style={{ marginRight: 4, color: '#ffffff' }} />
                  <Text style={styles.editButtonText}>Editar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </SafeAreaView>
    </ScrollView>
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
    color: '#black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 15,
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
    borderColor: '#0d6efd',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  fotoContainer: {
    marginRight: 16,
  },
  foto: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d6efd',
  },
  email: {
    fontSize: 14,
    color: '#black',
    marginBottom: 1,
    marginRight: 2,
    fontWeight: 'bold',
  },
  knowhow: {
    fontSize: 14,
    color: '#black',
    marginBottom: 1,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#black',
    fontWeight: 'bold',
  },
  buttonEdit: {
    marginTop: 10,
    padding: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#0d6efd',
    backgroundColor: '#0d6efd',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  alignIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});