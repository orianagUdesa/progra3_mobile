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
<<<<<<< HEAD
    crearPost(owner, textoPost, fotoUrl, createdAt){
=======
    crearPost(owner, textoPost, createdAt, img){
>>>>>>> 6b81108fa1f5d4c04f22394b4f5f39fbf6806ab4
        //Crear la colección Users
        db.collection('posts').add({
            owner: owner, //auth.currentUser.email,
            textoPost: textoPost, //this.state.textoPost,
            fotoUrl: fotoUrl,
            createdAt: createdAt, //Date.now(), 
            likes: [],
            comments: [],
            fotoUrl: ''
        })
        .then( res => 
        console.log(res),
        this.setState({
            textoPost: '',
            fotoUrl: ''
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

    traerUrlDeFoto(url){
        this.setState({
            fotoUrl:url
        })
    }

    render(){
        return(
            <View style={styles.formContainer}>
<<<<<<< HEAD
                <Text>New Post</Text>
                <MyCamera style={styles.camera} traerUrlDeFoto = {url => this.traerUrlDeFoto(url)}/> 
=======
                <Text>New Post</Text>                    
>>>>>>> 6b81108fa1f5d4c04f22394b4f5f39fbf6806ab4
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir...'
                    keyboardType='default'
                    value={this.state.textoPost}         /* falta el campo de fotoUrl pero se hace con camera  */
                    />
<<<<<<< HEAD
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, this.state.fotoUrl, Date.now())}>
                    <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
=======
                {(this.state.fotoUrl === '' 
                ? <Text>Requiere foto para postear</Text>
                : <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now(), this.state.fotoUrl)}>
                    <Text style={styles.textButton}>Post</Text>    
                </TouchableOpacity>)}
>>>>>>> 6b81108fa1f5d4c04f22394b4f5f39fbf6806ab4
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    camera:{
        height: 400,
    }

})


export default PostForm;