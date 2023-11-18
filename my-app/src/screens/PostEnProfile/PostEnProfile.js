import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { db, auth } from '../../firebase/Config';
import firebase from 'firebase';

class PostEnProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantidadDeLikes: this.props.posts.datos.likes.length
        }
    }

    componentDidMount(){
        if(this.props.posts.datos.likes.includes(auth.currentUser.email)){  /* para ver si el post ya esta likeado */
            this.setState({
                like: true
            })
        }
    }

    likear(){
        //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.
    
        //update en base de datos
        db.collection('posts').doc(this.props.posts.datos.id).update({
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
        //Quitar del array de likes al usario que está mirando el post.
        db.collection('posts').doc(this.props.posts.datos.id).update({
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

    deletePost(){
        db.collection('posts').doc(this.props.posts.datos.id).delete()
        .then( res => {
            console.log('Eliminado');
        })
        .catch( e => console.log(e))
       }
    
    render(){
        return(
            <View style={styles.container}>
                <Text>{this.props.posts.datos.textoPost}</Text>
                <Text>Likes: {this.state.cantidadDeLikes}</Text>

                <View style={styles.buttonContainer}>
                    {this.state.like ? (
                        <TouchableOpacity style={styles.likeButton} onPress={() => this.unLike()}>
                            <Text style={styles.buttonText}>Quitar like</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.likeButton} onPress={() => this.likear()}>
                            <Text style={styles.buttonText}>Like</Text>
                        </TouchableOpacity>
                    )
                    }
                    {auth.currentUser.email == this.props.posts.datos.owner && 
                        <TouchableOpacity style={styles.button} onPress={()=>this.deletePost()}>
                            <Text style={styles.buttonText}>Eliminar post</Text>
                        </TouchableOpacity>
                    }
                    {this.props.posts.datos.fotoUrl && (
                        <Image 
                            source={{uri:this.props.posts.datos.fotoUrl}}
                            style={ styles.postImage}
                        />
                        )
                    }
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
    },
    buttonContainer: {
        flexDirection: 'column',
        marginTop:8,
    },
    button: {
        backgroundColor: '#ddd',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: 8,
        borderColor: '#ddd',
    },
    likeButton: {
        backgroundColor: '#87CEEB',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        marginTop: 8,
    },
    buttonText: {
        color: '#000000', // negro
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 8,
      },
})

export default PostEnProfile; 