import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  Button,
  StyleSheet,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaskedTextInput } from 'react-native-mask-text';
import { categorias, usuarios } from '@/data';

export default function CadastrarTecnicos() {
  const [idUsuario, setIdUsuario] = useState<number | null>(null);
  const [idCategoria, setIdCategoria] = useState<number | null>(null);
  const [knowHow, setKnowHow] = useState('');
  const [status, setStatus] = useState(true);
  const [inicioVigencia, setInicioVigencia] = useState('');
  const [fimVigencia, setFimVigencia] = useState('');

  const nomeUsuarioSelecionado =
    usuarios.find((u) => u.id === idUsuario)?.nome || '';

  const descricaoCategoriaSelecionada =
    categorias.find((c) => c.id === idCategoria)?.descricao || '';

  function validarData(data: string) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(data);
  }

  function limparFormulario() {
    setIdUsuario(null);
    setIdCategoria(null);
    setKnowHow('');
    setStatus(true);
    setInicioVigencia('');
    setFimVigencia('');
  }

  function handleSubmit() {
    if (
      !idUsuario ||
      !idCategoria ||
      !knowHow ||
      !inicioVigencia ||
      !validarData(inicioVigencia) ||
      (fimVigencia && !validarData(fimVigencia))
    ) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }

    const tecnico = {
      id_usuario: idUsuario,
      id_categoria: idCategoria,
      know_how: parseFloat(knowHow),
      status,
      inicio_vigencia: formatarDataISO(inicioVigencia),
      fim_vigencia: fimVigencia ? formatarDataISO(fimVigencia) : null,
    };

    Alert.alert('Dados enviados', JSON.stringify(tecnico, null, 2));
    limparFormulario();
  }

  function formatarDataISO(data: string) {
    const [dd, mm, yyyy] = data.split('/');
    return `${yyyy}-${mm}-${dd}T00:00:00.000Z`;
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
          {usuarios.map((user) => (
            <Picker.Item
              key={user.id}
              label={`${user.nome} (${user.id})`}
              value={user.id}
            />
          ))}
        </Picker>
        {nomeUsuarioSelecionado ? (
          <Text style={styles.infoText}>Selecionado: {nomeUsuarioSelecionado}</Text>
        ) : null}

        <Text style={styles.label}>Categoria</Text>
        <Picker
          selectedValue={idCategoria}
          onValueChange={(itemValue) => setIdCategoria(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma categoria" value={null} />
          {categorias.map((cat) => (
            <Picker.Item
              key={cat.id}
              label={`${cat.descricao} (${cat.id})`}
              value={cat.id}
            />
          ))}
        </Picker>
        {descricaoCategoriaSelecionada ? (
          <Text style={styles.infoText}>
            Selecionado: {descricaoCategoriaSelecionada}
          </Text>
        ) : null}

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

        <Text style={styles.label}>Início Vigência (dd/mm/aaaa):</Text>
        <MaskedTextInput
          mask="99/99/9999"
          onChangeText={setInicioVigencia}
          value={inicioVigencia}
          style={styles.input}
          keyboardType="numeric"
          placeholder="dd/mm/aaaa"
        />

        <Text style={styles.label}>Fim Vigência (opcional):</Text>
        <MaskedTextInput
          mask="99/99/9999"
          onChangeText={setFimVigencia}
          value={fimVigencia}
          style={styles.input}
          keyboardType="numeric"
          placeholder="dd/mm/aaaa"
        />

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
  infoText: {
    fontStyle: 'italic',
    marginTop: 3,
  },
  button: {
    marginTop: 30,
  },
});