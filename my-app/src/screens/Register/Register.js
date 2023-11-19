import React, { Component } from 'react';
import { db, auth } from '../../firebase/Config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state={
            email:'',
            userName:'',
            password:'',
            bio:'', //nuevo campo para la mini bio
        }
    }
  
    componentDidMount(){
        console.log("Chequear si el usuario está loguado en firebase.");
        // Puse la funcionalidad aquí para probarla. No necesariamente debe ir en este componente.

        auth.onAuthStateChanged( user => {
            console.log(user)
            if( user ){
                //Redirigir al usuario a la home del sitio.
                this.props.navigation.navigate('Home')
            }

        } )

    }

    register (email, pass, userName, bio){                                                     //dentro de aca esta la conexion con firebase
        auth.createUserWithEmailAndPassword(email, pass)                        //metodo de firebase para crear un usuario    
            .then((response)=>{
                console.log('Registrado ok', response);
                
                db.collection('users').add({
                    owner: auth.currentUser.email,
                    userName: userName,
                    cratedAt: Date.now(),
                    bio: bio,
                })
                .then( res => console.log(res))                                                            //cuando firebase responde sin error, response me muestra ol con los datos que ingreso y +++
            })    
            .catch( error => {
                console.log(error);                                            // cuando firebase detecta un error
            })
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                    value={this.state.email}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='user name'
                    keyboardType='default'
                    value={this.state.userName}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                    value={this.state.password}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ bio: text })}
                    placeholder='Mini biografía (opcional)'
                    keyboardType='default'
                    value={this.state.bio}
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName, this.state.bio)}>
                    <Text style={styles.textButton}>   Registrarse  </Text>    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}> 
                    <Text style={styles.textButton}>Ya tengo cuenta. Ir a login</Text>
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
        width: 475,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 10,
      },
      button: {
        width: 475,
        alignSelf: 'center',
        backgroundColor: '#ddd',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
      },
      textButton: {
        width: 475,
        color: '#000',
        fontWeight: 'bold',
        alignSelf: 'center',
      },
      loginText: {
        marginTop: 10,
        textAlign: 'center',
        color: '#000',
      },
      title: {
        textAlign: 'center',
        fontSize: '26px',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
})


export default Register;