import { FontAwesome } from '@expo/vector-icons';
import { Slot, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import {
  DrawerLayoutAndroid,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function DrawerLayout() {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const router = useRouter();

  const navigationView = () => (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Menu</Text>
      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          router.push('/');
          drawer.current?.closeDrawer();
        }}
      >
        <Text>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          router.push('/menu/tecnicos/listar_tecnicos');
          drawer.current?.closeDrawer();
        }}
      >
        <Text>Listagem de Técnicos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          router.push('/menu/tecnicos/cadastrar_tecnicos');
          drawer.current?.closeDrawer();
        }}
      >
        <Text>Cadastro de Técnicos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          router.push('/menu/alocacao/registrar_alocacao');
          drawer.current?.closeDrawer();
        }}
      >
        <Text>Alocar horas</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar/>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CapacityX</Text>
          <TouchableOpacity onPress={() => drawer.current?.openDrawer()}>
            <FontAwesome name="bars" size={24} color="#fff" />
          </TouchableOpacity>
        </View>


        <View style={{ flex: 1 }}>
          <Slot />
        </View>
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
