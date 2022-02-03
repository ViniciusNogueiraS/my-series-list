import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '@expo/vector-icons';

export default function Lista({navigation}) {

  const [lista, setLista] = useState([]);

  const serieModel = {
    nome: '',
    estudio: '',
    autor: '',
    diretor: '',
    ano: '',
    episodeos: '',
    sinopse: '',
    generos: '',
    poster: '',
    amv: ''
  }

  useEffect(async () => {
    let lista = JSON.parse(await AsyncStorage.getItem('series')) || [];
    setLista(lista);
  }, []);

  function excluir(index) {
    let newLista = lista.filter(item => item !== lista[index]);
    AsyncStorage.setItem('series', JSON.stringify(newLista));
    setLista(newLista);
  }

  return (
    <>
      <FontAwesome.Button
        style={style.buttonAdd}
        name="plus"
        size={25}
        color="white"
        backgroundColor="transparent"
        borderRadius={0}
        onPress={() => navigation.navigate('Formulário', {serie: serieModel, index: -1, setLista})}
      >Adicionar Nova Série</FontAwesome.Button>
      <ScrollView style={style.container}>
        <View style={style.lista}>
          {lista.map((item, index) => (
            <View style={style.item}>
              <Image source={{uri: item.poster}} style={style.poster}/>
              <View style={style.controls}>
                <FontAwesome.Button
                  style={style.btns}
                  borderRadius={0}
                  name="eye"
                  size={25}
                  color="#e7e7e7cf"
                  backgroundColor={'#00000000'}
                  onPress={() => navigation.navigate('Série', lista[index])}
                />
                <FontAwesome.Button
                  style={style.btns}
                  borderRadius={0}
                  name="pencil"
                  size={25}
                  color="#e7e7e7cf"
                  backgroundColor={'#00000000'}
                  onPress={() => navigation.navigate('Formulário', {serie: lista[index], index, setLista})}
                  />
                <FontAwesome.Button
                  style={style.btns}
                  borderRadius={0}
                  name="trash"
                  size={25}
                  color="#e7e7e7cf"
                  backgroundColor={'#00000000'}
                  onPress={() => excluir(index)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#444'
  },
  buttonAdd: {
    borderRadius: 0,
    backgroundColor: '#222',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lista: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    position: 'relative',
    width: 140,
    flexGrow: 1,
    marginHorizontal: 0,
    marginVertical: 10,
    fontFamily: 'MontserratBold',
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'center'
  },
  poster: {
    width: '100%',
    height: 210,
    resizeMode: "contain",
    margin: 0,
    padding: 0,
  },
  controls: {
    position: 'absolute',
    textAlign: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 3,
    bottom: 0,
    alignSelf: 'center', 
    backgroundColor: '#00000085'
  },
  btns: {
    backgroundColor: '#00000000',
    borderRadius: 0,
    padding: 0,
    marginHorizontal: 6,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})