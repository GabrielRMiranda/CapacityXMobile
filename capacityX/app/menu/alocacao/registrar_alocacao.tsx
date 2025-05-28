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
import { tecnicos, categorias, contratos, usuarios } from '@/data';

export default function RegistrarAlocacao() {
  const [idTecnico, setIdTecnico] = useState<number | null>(null);
  const [idContrato, setIdContrato] = useState<number | null>(null);
  const [categoriaPai, setCategoriaPai] = useState<number | null>(null);
  const [qtdHrsAlocadas, setQtdHrsAlocadas] = useState('');
  const [qtdHrsComerciais, setQtdHrsComerciais] = useState('');
  const [dataExclusao, setDataExclusao] = useState('');

  const tecnicoSelecionado = tecnicos.find((t) => t.id === idTecnico);
  const usuarioTecnico = usuarios.find((u) => u.id === tecnicoSelecionado?.id_usuario);
  const nomeTecnicoSelecionado = usuarioTecnico?.nome || '';

  const descricaoCategoriaPaiSelecionada =
    categorias.find((c) => c.id === categoriaPai)?.descricao || '';

  function validarHora(hora: string) {
    const regex = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
    return regex.test(hora);
  }

  function validarData(data: string) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(data);
  }

  function limparFormulario() {
    setIdTecnico(null);
    setIdContrato(null);
    setCategoriaPai(null);
    setQtdHrsAlocadas('');
    setQtdHrsComerciais('');
    setDataExclusao('');
  }

  function handleSubmit() {
    if (
      !idTecnico ||
      !idContrato ||
      !categoriaPai ||
      !qtdHrsAlocadas ||
      !qtdHrsComerciais ||
      !validarHora(qtdHrsAlocadas) ||
      !validarHora(qtdHrsComerciais) ||
      (dataExclusao && !validarData(dataExclusao))
    ) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }

    const alocacaoRegistro = {
      id_tecnico: idTecnico,
      id_contrato: idContrato,
      categoriaPai,
      qtd_hrs_alocadas: qtdHrsAlocadas,
      qtd_hrs_comerciais: qtdHrsComerciais,
      data_exclusao: dataExclusao ? formatarDataISO(dataExclusao) : null,
    };

    Alert.alert('Alocado: ', JSON.stringify(alocacaoRegistro, null, 2));
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
        <Text style={styles.title}>Registro de Alocação</Text>

        <Text style={styles.label}>Técnico</Text>
        <Picker
          selectedValue={idTecnico}
          onValueChange={(itemValue) => setIdTecnico(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um técnico" value={null} />
          {tecnicos.map((tecnico) => {
            const usuario = usuarios.find((u) => u.id === tecnico.id_usuario);
            return (
              <Picker.Item
                key={tecnico.id}
                label={`${usuario?.nome || 'Usuario ausente'}`}
                value={tecnico.id}
              />
            );
          })}
        </Picker>

        <Text style={styles.label}>Contrato</Text>
        <Picker
          selectedValue={idContrato}
          onValueChange={(itemValue) => setIdContrato(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um contrato" value={null} />
          {contratos.map((contrato) => (
            <Picker.Item
              key={contrato.id}
              label={`Contrato ${contrato.id} - Carga Horaria: ${contrato.carga_horaria}`}
              value={contrato.id}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Categoria Pai</Text>
        <Picker
          selectedValue={categoriaPai}
          onValueChange={(itemValue) => setCategoriaPai(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma categoria" value={null} />
          {categorias.map((cat) => (
            <Picker.Item
              key={cat.id}
              label={`${cat.descricao} (ID: ${cat.id})`}
              value={cat.id}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Horas Alocadas (hh:mm):</Text>
        <MaskedTextInput
          mask="99:99"
          style={styles.input}
          keyboardType="numeric"
          value={qtdHrsAlocadas}
          onChangeText={setQtdHrsAlocadas}
          placeholder="Ex: 08:00"
        />

        <Text style={styles.label}>Horas Comerciais (hh:mm):</Text>
        <MaskedTextInput
          mask="99:99"
          style={styles.input}
          keyboardType="numeric"
          value={qtdHrsComerciais}
          onChangeText={setQtdHrsComerciais}
          placeholder="Ex: 08:00"
        />

        <Text style={styles.label}>Data de Exclusão (opcional):</Text>
        <MaskedTextInput
          mask="99/99/9999"
          onChangeText={setDataExclusao}
          value={dataExclusao}
          style={styles.input}
          keyboardType="numeric"
          placeholder="dd/mm/aaaa"
        />

        <View style={styles.button}>
          <Button title="Registrar Alocação" onPress={handleSubmit} />
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
