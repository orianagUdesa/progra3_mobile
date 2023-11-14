import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class PostEnProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantidadDeLikes: this.props.infoPost.datos.likes.length
        }
    }

    componentDidMount(){
        if(this.props.infoPost.datos.likes.includes(auth.currentUser.email)){  /* para ver si el post ya esta likeado */
            this.setState({
                like: true
            })
        }
    }

    deletePost(){
        db.collection('posts').doc(this.props.infoPost.id).update({
            posts: firebase.firestore.FieldValue.arrayRemove(this.props.infoPost.datos, this.props.infoPost.id)
        })
        .then( res => {
            console.log('Eliminado');
        })
        .catch( e => console.log(e))
       }
    
    render(){
        return(
            <View>
            <Text>{this.props.infoPost.datos.textoPost}</Text>
            <Text>Likes: {this.state.cantidadDeLikes}</Text>
            <TouchableOpacity  onPress={()=>this.deletePost()}>
                    <Text>Eliminar post</Text>
                </TouchableOpacity>
            </View>
        )
    }


}