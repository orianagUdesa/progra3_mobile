import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList} from 'react-native';
import { Image } from 'react-native';
import { db, auth } from '../../firebase/Config';
import firebase from 'firebase';



class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantidadDeLikes: this.props.posts.datos.likes.length,
            comment: ''
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

    crearComment(){
        let nuevoComment = {
            autor: auth.currentUser.email,
            createdAt: Date.now(),
            commentText: this.state.comment
        }
        db.collection('posts').doc(this.props.posts.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion(nuevoComment)
        })
        .then(()=>{
            console.log('Comentario guardado');
            this.setState({
                comment:''
            })
        })
        .catch( e => console.log(e))
    }
    


    render() {
        console.log(this.props);
        const { datos, navigation} = this.props.posts;
        return (
          <View style={styles.post}>
            <Text style={styles.texto}>Publicado por: {datos.owner}</Text>
            <Image 
                    source={{uri:this.props.posts.datos.fotoUrl}}
                    style={ styles.estiloimagen }
                />
            <Text style={styles.texto}>{datos.textoPost}</Text>
            <Text style={styles.likes}>Likes: {this.state.cantidadDeLikes}</Text>
      
            {this.state.like ? (
              <TouchableOpacity onPress={() => this.unLike()}>
                <Text>Quitar like</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.likear()}>
                <Text>Like</Text>
              </TouchableOpacity>
            )}
      
            {datos.comments && datos.comments.length > 0 ? (
              <FlatList
              data={datos.comments.slice().reverse().slice(0, 4)} //acá limitamos a solo ver los últimos 4 comentarios
              keyExtractor={(comment) => comment.createdAt.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => this.props.navigation.navigate('OtherProfile', {user: item.autor})}>
                  <Text>
                    <Text style={styles.commentAuthor}>{item?.autor}:</Text> {item?.commentText}
                  </Text>
                </TouchableOpacity>
              )}
            />
            ) : (
              <Text>Aún no hay comentarios</Text>
            )}
      
            <View style={styles.commentButtonContainer}>
              <TextInput
                keyboardType="default"
                placeholder="Escribí tu comentario"
                onChangeText={(text) => {
                  this.setState({ comment: text });
                }}
                multiline
                value={this.state.comment}
              />
              <TouchableOpacity 
                style={styles.commentButton} 
                onPress={() => this.crearComment()}>
                <Text style={styles.commentButtonText}>Comentar</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }

}

const styles = StyleSheet.create({
    post: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
      },
      texto: {
        fontSize: 16,
        marginBottom: 8,
      },
      likes: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
      },
      commentAuthor: {
        fontWeight: 'bold',
        marginRight: 4,
      },
      commentButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8, // Espacio entre los comentarios y el botón
      },
      
      commentButton: {
        backgroundColor: '#333',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
      },
      
      commentButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      estiloimagen:{
        marginTop: 20,
        marginBottom: 10,
        height:300,
        width:"100%"
    },
})

export default Post;