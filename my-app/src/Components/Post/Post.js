import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/Config';
import firebase from 'firebase';


class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantidadDeLikes: this.props.posts.datos.likes.length
        }
    }
//primero le muestro al usuario todos los post que hay, ahi es donde decide si likear o no
    componentDidMount(){
        //Indicar si el post ya está likeado o no.
        if(this.props.posts.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
    }

    likear(){
        db.collection("posts").doc(this.props.posts.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then( res => {
            this.setState({
                like: true,
                cantidadDeLikes: this.props.posts.datos.likes.length
            })
        })
        .catch( e => console.log(e))
        
    }

    unLike(){
        db.collection("posts").doc(this.props.posts.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then( res => {
            this.setState({
                like: false,
                cantidadDeLikes: this.props.posts.datos.likes.length
            })
        })
        .catch( e => console.log(e))

    }


    render(){
        console.log(this.props);
        return(
            <View style={styles.post}>
                <Text style={styles.texto}>Datos del Post</Text>
                <Text style={styles.texto}>Email: {this.props.posts.datos.owner}</Text>
                <Text style={styles.texto}>Texto: {this.props.posts.datos.textoPost}</Text>
                <Text style={styles.likes}>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
                {this.state.like ?
                <TouchableOpacity onPress={()=>this.unLike()}>
                    Quitar like
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> this.likear()}>
                    Like
                </TouchableOpacity>
                }
                
                
  
            </View>
        )
    }

}

const styles = StyleSheet.create({
    post:{
        textAlign: 'right',
        fontFamily: 'Roboto',
        borderStyle:'solid',
    },
    texto:{
        textAlign: 'center',
    },
    likes:{
        textAlign:'right',
    }

})

export default Post;