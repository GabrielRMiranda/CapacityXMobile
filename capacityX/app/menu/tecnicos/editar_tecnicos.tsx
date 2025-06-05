import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function EditarTecnicos() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const tecnico = useMemo(() => {
    return params?.tecnico ? JSON.parse(params.tecnico as string) : null;
  }, [params.tecnico]);

  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    idUsuario: null as number | null,
    idCategoria: null as number | null,
    knowHow: '',
    status: true,
    dataInicio: null as Date | null,
    dataISO: '',
    dataFim: null as Date | null,
    dataISOFim: '',
  });

  useEffect(() => {
    consultaUsuario();
    consultaCategoria();
  }, []);

  useEffect(() => {
    if (tecnico) {
      setFormData({
        idUsuario: tecnico.id_usuario || null,
        idCategoria: tecnico.id_categoria || null,
        knowHow: tecnico.know_how ? String(tecnico.know_how) : '',
        status: tecnico.status ?? true,
        dataInicio: tecnico.inicio_vigencia ? new Date(tecnico.inicio_vigencia) : null,
        dataISO: tecnico.inicio_vigencia ? new Date(tecnico.inicio_vigencia).toISOString() : '',
        dataFim: tecnico.fim_vigencia ? new Date(tecnico.fim_vigencia) : null,
        dataISOFim: tecnico.fim_vigencia ? new Date(tecnico.fim_vigencia).toISOString() : '',
      });
    }
  }, [tecnico]);

  const onChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData({
        ...formData,
        dataInicio: selectedDate,
        dataISO: selectedDate.toISOString(),
      });
    }
  };

  const onChangeFim = (_event: any, selectedDate?: Date) => {
    setShowPickerFim(Platform.OS === 'ios');
    if (selectedDate) {
      setFormData({
        ...formData,
        dataFim: selectedDate,
        dataISOFim: selectedDate.toISOString(),
      });
    }
  };

  const [showPicker, setShowPicker] = useState(false);
  const [showPickerFim, setShowPickerFim] = useState(false);

  const consultaUsuario = async () => {
    try {
      let response = await fetch('http://100.71.234.30:3000/usuario', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        alert('Erro: Usuário não encontrado - ' + response.status);
        return;
      }
      let usuario = await response.json();
      setUsuarios(usuario);
    } catch (error) {
      console.error('Erro capturado: ', error);
    }
  };

  const consultaCategoria = async () => {
    try {
      let response = await fetch('http://100.71.234.30:3000/categoria', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        alert('Erro: Categoria não encontrada - ' + response.status);
        return;
      }
      let categoria = await response.json();
      setCategorias(categoria);
    } catch (error) {
      console.error('Erro capturado: ', error);
    }
  };

  const objetoTecnicoData = {
    id: tecnico?.id,
    id_usuario: formData.idUsuario,
    id_categoria: formData.idCategoria,
    know_how: Number(formData.knowHow),
    inicio_vigencia: formData.dataISO || null,
    fim_vigencia: formData.dataISOFim || null,
    status: formData.status,
  };

  const editaTecnico = async () => {
    console.log(objetoTecnicoData)
    try {
      let request = await fetch(`http://100.71.234.30:3000/tecnico/${tecnico?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objetoTecnicoData),
      });

      if (!request.ok) {
        alert('Falhou: ' + request.status);
        console.log(request)
        return;
      }

      let json = await request.json();
      console.log('Técnico atualizado:', json);
      router.back();
      return json;
    } catch (error) {
      console.error('Erro capturado: ', error);
      return null;
    }
  };

  const excluirTecnico = async () => {
    if (!tecnico?.id) {
      alert('Erro: ID do técnico não encontrado.');
      return;
    }

    try {
      const response = await fetch(`http://100.71.234.30:3000/tecnico/${tecnico.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert(`Erro ao excluir técnico: ${response.status}`);
        return;
      }

      console.log('Técnico excluído com sucesso');
      router.back();
    } catch (error) {
      console.error('Erro ao excluir técnico:', error);
      alert('Erro ao excluir técnico. Tente novamente.');
    }
  }

  function handleSubmitEdit() {
    editaTecnico();
  }

  function handleRemove(){
    excluirTecnico();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Editar Técnico</Text>

        <Text style={styles.label}>Usuário</Text>
        <Picker
          selectedValue={formData.idUsuario}
          onValueChange={(itemValue) => setFormData({ ...formData, idUsuario: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um usuário" value={null} />
          {usuarios.map((user: any) => (
            <Picker.Item key={user.id} label={`${user.nome}`} value={user.id} />
          ))}
        </Picker>

        <Text style={styles.label}>Categoria</Text>
        <Picker
          selectedValue={formData.idCategoria}
          onValueChange={(itemValue) => setFormData({ ...formData, idCategoria: itemValue })}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma categoria" value={null} />
          {categorias.map((categoria: any) => (
            <Picker.Item key={categoria.id} label={`${categoria.descricao}`} value={categoria.id} />
          ))}
        </Picker>

        <Text style={styles.label}>Know How</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.knowHow}
          onChangeText={(text) => setFormData({ ...formData, knowHow: text })}
          placeholder="Ex: 1.5"
        />

        <Text style={styles.label}>Status:</Text>
        <Picker
          selectedValue={formData.status}
          onValueChange={(val) => setFormData({ ...formData, status: val })}
          style={styles.picker}
        >
          <Picker.Item label="Ativo" value={true} />
          <Picker.Item label="Inativo" value={false} />
        </Picker>

        <View style={{ marginTop: 15 }}>
          <Text style={{ marginBottom: 6 }}>Data de Início:</Text>
          <Pressable onPress={() => setShowPicker(true)}>
            <TextInput
              placeholder="Selecione a data"
              value={formData.dataInicio ? formData.dataInicio.toLocaleDateString('pt-BR') : ''}
              editable={false}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                borderRadius: 4,
              }}
            />
          </Pressable>
          {showPicker && (
            <DateTimePicker
              value={formData.dataInicio || new Date()}
              mode="date"
              display="default"
              onChange={onChange}
              locale="pt-BR"
            />
          )}
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={{ marginBottom: 6 }}>Data de Fim:</Text>
          <Pressable onPress={() => setShowPickerFim(true)}>
            <TextInput
              placeholder="Selecione a data"
              value={formData.dataFim ? formData.dataFim.toLocaleDateString('pt-BR') : ''}
              editable={false}
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                borderRadius: 4,
              }}
            />
          </Pressable>
          {showPickerFim && (
            <DateTimePicker
              value={formData.dataFim || new Date()}
              mode="date"
              display="default"
              onChange={onChangeFim}
              locale="pt-BR"
            />
          )}
        </View>

        <View style={styles.button}>
          <Button title="Atualizar Técnico" onPress={handleSubmitEdit} />
        </View>

        <View style={styles.button}>
          <Button title="Excluir Técnico" onPress={handleRemove} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    marginTop: 15,
    fontWeight: '600',
  },
  picker: {
    backgroundColor: '#eee',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 8,
    marginTop: 5,
    borderRadius: 4,
  },
  button: {
    marginTop: 30,
  },
});