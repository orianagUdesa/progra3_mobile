import React, { Component } from 'react';
import { db, auth } from '../../firebase/Config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import MyCamera from '../../components/MyCamera/My-Camera';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
            textoPost: '',
            fotoUrl: '',
        }
    }
    

    //crearPost es un método que nos permite emular un "formulario"
    crearPost(owner, textoPost, fotoUrl, createdAt){
        //Crear la colección Users
        db.collection('posts').add({
            owner: owner, //auth.currentUser.email,
            textoPost: textoPost, //this.state.textoPost,
            fotoUrl: fotoUrl,
            createdAt: createdAt, //Date.now(), 
            likes: [],
            comments: [],
            
        })
        .then( res => 
        console.log(res),
        this.setState({
            textoPost: '',
            fotoUrl: '',
        }),
        this.props.navigation.navigate('Home')
        )
        .catch( e => console.log(e))
    }

    traerUrlDeFoto(url){
        this.setState({
            fotoUrl: url
        })
    }
   


    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.title}>New Post</Text>
                <MyCamera style={styles.camera} traerUrlDeFoto = {url => this.traerUrlDeFoto(url)}/> 
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir...'
                    keyboardType='default'
                    value={this.state.textoPost}         /* falta el campo de fotoUrl pero se hace con camera  */
                    />
                <TouchableOpacity style={styles.boton} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, this.state.fotoUrl, Date.now())}>
                    <Text style={styles.txButton}>  Postear  </Text>    
                </TouchableOpacity>
            </View>
        )}}
    
        


const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: '26px',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        width: 475,
        alignSelf: 'center',
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    boton:{
        backgroundColor:'#ccc',
        width: 475,
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'ccc'
    },
    txButton:{
        color: '#000',
        fontWeight: 'bold',
        width: 475,
        alignSelf: 'center',
    },
    camera:{
        height: 400,
        width: 475,
        alignContent: 'center',
    }

})


export default PostForm;