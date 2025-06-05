import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
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
  View
} from 'react-native';

export default function CadastrarTecnicos() {
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [dataInicio, setDataInicio] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [dataISO, setDataISO] = useState<string>('');

  const [dataFim, setDataFim] = useState<Date | null>(null);
  const [showPickerFim, setShowPickerFim] = useState(false);
  const [dataISOFim, setDataISOFim] = useState<string>('');

  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [idCategoria, setIdCategoria] = useState<number | null>(null);
  const [knowHow, setKnowHow] = useState('');
  const [status, setStatus] = useState(true);

  useEffect(() => {
    consultaUsuario();
    consultaCategoria();
  }, []);

  const onChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDataInicio(selectedDate);
      setDataISO(selectedDate.toISOString());
    }
  };

  const onChangeFim = (_event: any, selectedDate?: Date) => {
    setShowPickerFim(Platform.OS === 'ios');
    if (selectedDate) {
      setDataFim(selectedDate);
      setDataISOFim(selectedDate.toISOString());
    }
  };

  const consultaUsuario = async () => {
    try {
      let response = await fetch('http://100.71.234.30:3000/usuario', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        alert('Erro: Categoria não encontrado - ' + response.status);
        return;
      }

      let categoria = await response.json();
      setCategorias(categoria);
    } catch (error) {
      console.error('Erro capturado: ', error);
    }
  };

  let objetoTecnicoData = {
    id_usuario: idUsuario,
    id_categoria: idCategoria,
    know_how: Number(knowHow),
    inicio_vigencia: dataISO,
    fim_vigencia: dataISOFim || null,
    status: status
  };

  const cadastraTecnico = async () => {
    try {
      let request = await fetch('http://100.71.234.30:3000/tecnico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoTecnicoData)
      });

      if (!request.ok) {
        alert('Falhou: ' + request.status);
      }

      console.log(JSON.stringify(objetoTecnicoData));

      let json = await request.json();

      console.log(json);

      limparFormulario();

      return json;
    } catch (error) {
      console.error('Erro capturado: ', error);
      return null;
    }
  };

  function limparFormulario() {
    setIdUsuario(null);
    setIdCategoria(null);
    setKnowHow('');
    setStatus(true);
    setDataInicio(null);
    setDataISO('');
    setDataFim(null);
    setDataISOFim('');
  }

  function handleSubmit() {
    cadastraTecnico();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Cadastro de Técnicos</Text>

        <Text style={styles.label}>Usuário</Text>
        <Picker
          selectedValue={idUsuario}
          onValueChange={(itemValue) => setIdUsuario(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um usuário" value={null} />
          {usuarios.length > 0 && usuarios.map((user: any) => (
              <Picker.Item
                key={user.id}
                label={`${user.nome}`}
                value={user.id}
              />
            ))}
        </Picker>

        <Text style={styles.label}>Categoria</Text>
        <Picker
          selectedValue={idCategoria}
          onValueChange={(itemValue) => setIdCategoria(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma categoria" value={null} />
          {categorias.length > 0 && categorias.map((categoria: any) => (
            <Picker.Item
              key={categoria.id}
              label={`${categoria.descricao}`}
              value={categoria.id}
            />  
          ))}
        </Picker>

        <Text style={styles.label}>Know How</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={knowHow}
          onChangeText={setKnowHow}
          placeholder="Ex: 1.5"
        />

        <Text style={styles.label}>Status:</Text>
        <Picker
          selectedValue={status}
          onValueChange={(val) => setStatus(val)}
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
              value={dataInicio ? dataInicio.toLocaleDateString('pt-BR') : ''}
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
              value={dataInicio || new Date()}
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
              value={dataFim ? dataFim.toLocaleDateString('pt-BR') : ''}
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
              value={dataFim || new Date()}
              mode="date"
              display="default"
              onChange={onChangeFim}
              locale="pt-BR"
            />
          )}
        </View>

        <View style={styles.button}>
          <Button title="Salvar Técnico" onPress={handleSubmit} />
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
