import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/Config';
import firebase from 'firebase';


class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantidadDeLikes: this.props.infoPost.datos.likes.length
        }
    }
//primero le muestro al usuario todos los post que hay, ahi es donde decide si likear o no
    componentDidMount(){
        //Indicar si el post ya está likeado o no.
        if(this.props.infoPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
    }

    likear(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then( res => {
            this.setState({
                like: true,
                cantidadDeLikes: this.props.infoPost.datos.likes.length
            })
        })
        .catch( e => console.log(e))
        
    }

    unLike(){
        db.collection("posts").doc(this.props.infoPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then( res => {
            this.setState({
                like: false,
                cantidadDeLikes: this.props.infoPost.datos.likes.length
            })
        })
        .catch( e => console.log(e))

    }


    render(){
        console.log(this.props);
        return(
            <View>
                <Text>Datos del Post</Text>
                <Text>Email: {this.props.infoPost.datos.owner}</Text>
                <Text>Texto: {this.props.infoPost.datos.textoPost}</Text>
                <Text>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
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

export default Post;