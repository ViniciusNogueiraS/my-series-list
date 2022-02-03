import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

export default function Form({navigation, route}) {

  const serie = route.params.serie;
  const index = route.params.index;

  const [nome, setNome] = useState(serie.nome);
  const [estudio, setEstudio] = useState(serie.estudio);
  const [autor, setAutor] = useState(serie.autor);
  const [diretor, setDiretor] = useState(serie.diretor);
  const [ano, setAno] = useState(serie.ano);
  const [episodeos, setEpisodeos] = useState(serie.episodeos);
  const [sinopse, setSinopse] = useState(serie.sinopse);
  const [generos, setGeneros] = useState(serie.generos);
  const [poster, setPoster] = useState(serie.poster);
  const [amv, setAmv] = useState(serie.amv);

  async function salvar() {

    let series = JSON.parse(await AsyncStorage.getItem('series')) || [];
    let serie = {nome, estudio, autor, diretor, ano, episodeos, sinopse, generos, poster, amv};

    if (index === -1) series.push(serie);
    else series[index] = serie;

    AsyncStorage.setItem('series', JSON.stringify(series));
    navigation.navigate('Lista');
    route.params.setLista(series);
  } 

  return (
    <ScrollView>
      <View style={style.container}>
        <Text style={style.label}>Nome:</Text>
        <TextInput style={style.input} onChangeText={setNome} value={nome} />
        <Text style={style.label}>Estúdio:</Text>
        <TextInput style={style.input} onChangeText={setEstudio} value={estudio} />
        <Text style={style.label}>Autor:</Text>
        <TextInput style={style.input} onChangeText={setAutor} value={autor} />
        <Text style={style.label}>Diretor:</Text>
        <TextInput style={style.input} onChangeText={setDiretor} value={diretor} />
        <Text style={style.label}>Ano:</Text>
        <TextInput style={style.input} onChangeText={setAno} value={ano} keyboardType={'numeric'}/>
        <Text style={style.label}>Episódeos:</Text>
        <TextInput style={style.input} onChangeText={setEpisodeos} value={episodeos} keyboardType={'numeric'}/>
        <Text style={style.label}>Sinopse:</Text>
        <TextInput style={style.input} onChangeText={setSinopse} value={sinopse} numberOfLines={5} multiline={true}/>
        <Text style={style.label}>Gêneros:</Text><Text style={style.info}>Ex.: Ação, Drama, Comédia</Text>
        <TextInput style={style.input} onChangeText={setGeneros} value={generos} />
        <Text style={style.label}>Poster:</Text><Text style={style.info}>URL da imagem</Text>
        <TextInput style={style.input} onChangeText={setPoster} value={poster} keyboardType={'url'}/>
        <Text style={style.label}>AMV:</Text><Text style={style.info}>ID do vídeo do Youtube</Text>
        <TextInput style={style.input} onChangeText={setAmv} value={amv} keyboardType={'url'}/>
        <FontAwesome.Button
          style={style.btn}
          borderRadius={0}
          name="save"
          size={25}
          color="white"
          backgroundColor={'transparent'}
          onPress={salvar}
        >Salvar</FontAwesome.Button>
      </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    margin: 15
  },
  label: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    color: '#333',
  },
  info: {
    fontFamily: 'MontserratRegular',
    fontSize: 12,
    color: '#aaa',
  },
  input: {
    padding: 6,
    marginVertical: 6,
    backgroundColor: '#eee',
    borderColor: '#ccc',
    borderWidth: 1,

    fontFamily: 'MontserratRegular',
    fontSize: 16,
    lineHeight: 28,
    color: '#3babdf',
    textAlignVertical: 'top'
  },
  btn: {
    borderRadius: 0,
    backgroundColor: '#222',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3babdf',
    marginVertical: 10
  }
})