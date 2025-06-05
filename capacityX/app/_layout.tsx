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
      <View>
        <Text style={
          {
            textAlign: 'center',
            marginTop: -30, 
            fontWeight: 'bold', 
            fontSize: 24,
            color: '#0d6efd',
            marginBottom: 20
          }}>
          CapacityX
        </Text>
      </View>

      <Text style={styles.drawerTitle}>Menu</Text>
      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          router.push('/');
          drawer.current?.closeDrawer();
          //drawer.current?.onDrawerSlide()
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name='home' size={24} color="#0d6efd" style={{ marginRight: 10 }} />
          <Text style={styles.drawerButtonText}>Início</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          router.push('/menu/tecnicos/listar_tecnicos');
          drawer.current?.closeDrawer();
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name='list' size={20} color="#0d6efd" style={{marginRight: 10}}></FontAwesome>
          <Text style={styles.drawerButtonText}>Listagem de Técnicos</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          router.push('/menu/tecnicos/cadastrar_tecnicos');
          drawer.current?.closeDrawer();
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name='user' size={20} color="#0d6efd" style={{marginRight: 15}}></FontAwesome>
          <Text style={styles.drawerButtonText}>Cadastro de Técnicos</Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          router.push('/menu/tecnicos/editar_tecnicos');
          drawer.current?.closeDrawer();
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name='edit' size={24} color="#0d6efd" style={{marginRight: 10}}/>
            <Text style={styles.drawerButtonText}>
              Editar Técnico
            </Text>
          </View>
      </TouchableOpacity> */}
      
      <TouchableOpacity
        style={styles.drawerButton}
        onPress={() => {
          router.push('/menu/alocacao/registrar_alocacao');
          drawer.current?.closeDrawer();
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name='home' size={24} color="#0d6efd" style={{marginRight: 10}}/>
            <Text style={styles.drawerButtonText}>
              Alocar horas
            </Text>
          </View>
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
            <FontAwesome name="bars" size={24} color="#0d6efd" />
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
    marginBottom: 5,
  },

  drawerButton: {
    marginTop: 2,
    padding: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
  },

  drawerButtonText: {
    fontSize: 16,
    color: '#black',
    fontWeight: '500'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fffff',
    borderBottomColor: '#dee2e6',
    borderStyle: 'solid',
    borderWidth: 0.2
  },

  headerTitle: {
    color: '#0d6efd',
    fontSize: 20,
    fontWeight: 'bold',
  },

  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: 'transparent',
  },

  bottomText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },

});
