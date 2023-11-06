import react, { Component } from 'react-native';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { auth } from '../../firebase/config';

class Home extends Component {
    constructor(){
        super()
        this.state={

        }
    }
    
    logout(){
        auth.signOut();
         //Redirigir al usuario a la home del sitio.
         this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View >
                <Text>Home mimi!</Text>
                <TouchableOpacity  onPress={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}




export default Home;