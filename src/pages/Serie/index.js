import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import PlayerVideo from '../../components/PlayerVideo';

const heightScreen = Dimensions.get('screen').height;
const widthScreen = Dimensions.get('screen').width;

export default function Serie({route}) {

  const serie = route.params;

  const [videoOpened, setVideoOpened] = useState(false);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    let arr = serie.generos.split(', ');
    setGeneros(arr);
  }, [])

  return (
    <SafeAreaView style={style.areaView}>
      <ScrollView style={style.container} contentContainerStyle={{justifyContent: 'center'}}>
        <View style={style.poster}>
          <Image source={{uri: serie.poster}} style={style.image} />
          <Text style={style.title} >{serie.nome}</Text>
        </View>
        <View style={style.subContainer}>
          <Text style={style.text}>Uma série de {serie.autor}</Text>
          <Text style={style.small}>Produzida pelo estúdio {serie.estudio}</Text>
          <Text style={style.small}>Lançada em {serie.ano} - {serie.episodeos} episódios</Text>
          <Text style={style.small}>Dirigida por {serie.diretor}</Text>
          <Text style={style.sinopse}>{serie.sinopse}</Text>
          <View style={style.generos}>
            {generos.map(genero => (
              <Text key={genero} style={style.genero}>{genero}</Text>
            ))}
          </View>
          <TouchableOpacity
            style={{...style.btnPrimary, ...(videoOpened ? {display: 'none'} : {display: 'flex'})}}
            onPress={() => setVideoOpened(!videoOpened)}
          >
            <Text style={style.btnText}>Assistir ao AMV</Text>
          </TouchableOpacity>
          <PlayerVideo amv={serie.amv} opened={videoOpened}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  areaView: {
    flex: 1,
    height: heightScreen
  },
  poster: {
    position: 'relative'
  },
  image: {
    width: widthScreen,
    height: 1270 / 920 * widthScreen
  },
  title: {
    fontFamily: 'MontserratBold',
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    padding: 3,
    paddingTop: 7,
    lineHeight: 28,
    fontSize: 26,
    color: '#fff',
    backgroundColor: '#000000a1'
  },
  container: {
    minHeight: heightScreen - 20
  },
  item: {
    marginHorizontal: 20,
    marginVertical: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    fontFamily: 'MontserratBold',
    fontSize: 14,
    color: '#333',
    backgroundColor: '#eee',
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  subContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 50
  },
  text: {
    fontFamily: 'MontserratBold',
    textAlign: 'left',
    width: '100%',
    fontSize: 20,
    color: '#333'
  },
  small: {
    fontFamily: 'MontserratRegular',
    textAlign: 'left',
    width: '100%',
    fontSize: 18,
    color: '#757575'
  },
  sinopse: {
    paddingVertical: 10,
    marginVertical: 20,
    textAlign: 'left',
    width: '100%',

    fontFamily: 'MontserratRegular',
    fontSize: 18,
    color: '#333',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  generos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  genero: {
    fontFamily: 'MontserratRegular',
    fontSize: 16,
    color: '#3babdf',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#3babdf',
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 3
  },
  btnPrimary: {
    backgroundColor: '#3babdf',
    padding: 10,
    width: '100%',
    height: 45,
    marginVertical: 20,
    borderRadius: 50
  },
  btnText: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  }
})