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
        const { datos } = this.props.posts;
        return (
          <View style={styles.post}>
            <Text style={styles.texto}>Datos del Post</Text>
            <Text style={styles.texto}>Email: {datos.owner}</Text>
            <Text style={styles.texto}>Texto: {datos.textoPost}</Text>
            <Text style={styles.likes}>Cantidad de likes: {this.state.cantidadDeLikes}</Text>
      
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
                data={datos.comments}
                keyExtractor={(comment) => comment.createdAt.toString()}
                renderItem={({ item }) => (
                  <Text>
                    <Text style={styles.commentAuthor}>{item.autor}:</Text> {item.commentText}
                  </Text>
                )}
              />
            ) : (
              <Text>Aún no hay comentarios</Text>
            )}
      
            <View>
              <TextInput
                keyboardType="default"
                placeholder="Escribí tu comentario"
                onChangeText={(text) => {
                  this.setState({ comment: text });
                }}
                multiline
                value={this.state.comment}
              />
              <TouchableOpacity onPress={() => this.crearComment()}>
                <Text>Comentar</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
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
    },
    commentAuthor: {
        fontWeight: 'bold', // Podemos ajustar este estilo según la app que tomemos de referencia, lo hice para que destaque
      },
    estiloimagen:{
        marginTop: 20,
        marginBottom: 10,
        height:300,
        width:"100%"
    }

})

export default Post;