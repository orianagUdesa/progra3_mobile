import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../../firebase/Config';
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

    likear(){
        //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.
    
        //update en base de datos
        db.collection('posts').doc(this.props.infoPost.id).update({
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
        //Quitar del array de likes al usario que está mirando el post.
        db.collection('posts').doc(this.props.infoPost.id).update({
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

    deletePost(){
        db.collection('posts').doc(this.props.infoPost.id).delete()
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

            {this.state.like ? 
                <TouchableOpacity onPress={()=>this.unLike()}/>
                :
                <TouchableOpacity onPress={()=>this.likear()}></TouchableOpacity>
            }

            {auth.currentUser.email == this.props.infoPost.datos.owner && 
                <TouchableOpacity style={styles.button} onPress={()=>this.deletePost()}>
                    <Text>Eliminar post</Text>
                </TouchableOpacity>
                }
            
            </View>
        )
    }


}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
})

export default PostEnProfile; 