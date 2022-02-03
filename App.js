import { StatusBar, SafeAreaView, AppState, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { NavigationContainer } from '@react-navigation/native';

import Serie from './src/pages/Serie';
import Lista from './src/pages/Lista';
import Form from './src/pages/Form';
import { series } from './src/data/series';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="Formulário" component={Form} initialParams={null}/>
        <Stack.Screen name="Série" component={Serie} initialParams={series[0]}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {

  let [fonts] = useFonts({
    MontserratRegular: Montserrat_400Regular,
    MontserratBold: Montserrat_700Bold
  })

  if (!AppState || !fonts) return <AppLoading/>

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStack/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}