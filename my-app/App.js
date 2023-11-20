import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './src/firebase/Config';
import Register from './src/screens/Register/Register'
import Login from './src/screens/Login/Login'
import Home from './src/screens/Home/Home';
import Profile from './src/screens/MiPerfil/Profile';
import Menu from '../my-app/src/components/Menu/Menu';
import OtherProfile from './src/screens/OtherProfile/OtherProfile';


const Stack = createNativeStackNavigator();

export default function App() {


  return (
    
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Registro' component={Register} options={ { headerShown: false } }/> 
          <Stack.Screen name='Login' component={Login} options={ { headerShown: false } }/>
          <Stack.Screen name='Home' component={Home} options={ { headerShown: false } }/>
          <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false}}/>
          <Stack.Screen name= 'Profile' component={Profile} options={{ headerShown: false}} />
          <Stack.Screen name= 'OtherProfile' component={OtherProfile} options={{ headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>

  );
}
