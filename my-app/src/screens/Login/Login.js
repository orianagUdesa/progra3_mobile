import React, { Component } from 'react';
import { auth } from '../../firebase/Config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';


class Login extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            password:'',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if(user){
                this.setState({email: auth.currentUser.email})
                this.setState({password: auth.currentUser.password})
                this.login(this.state.email,this.state.password)
            }
        })
    }

    login (email, pass){
        auth.signInWithEmailAndPassword(email, pass)
            .then( response => {
                //Cuando firebase responde sin error
                console.log('Login ok', response);

                //Cambiar los estados a vacío como están al inicio.
                //ir response != null? limpiar los estados, value = null??

                //Redirigir al usuario a la home del sitio cuando el login sea correcto
                this.props.navigation.navigate('Menu')

            })
            .catch( error => {
                //Cuando Firebase responde con un error.
                console.log(error);
            })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='default'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}> {/* cuando se ejecute el to tiene que llamar al metodo login */}
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Registro')}>
                   <Text>No tengo cuenta. Registrarme.</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
      },
      input: {
        height: 40,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 10,
      },
      button: {
        backgroundColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
      },
      textButton: {
        color: '#000', // Negro
        fontWeight: 'bold',
      },
      registerText: {
        marginTop: 10,
        textAlign: 'center',
        color: '#000',
      },
})


export default Login;