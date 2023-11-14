import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { auth, db } from '../../firebase/Config';


class Profile extends Component {
    constructor(){
        super()
        this.state={
            userPost: [],
            user: [],
        }
    }

    componentDidMount(){
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot(
            docs =>{
                let users = [];
                docs.forEach( doc => {
                    users.push({
                       id: doc.id,
                       data: doc.data()
                    })
                    this.setState({
                    users: users
                })
                })
            }
        )

        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
            posteos => {
                let postsAMostrar = [];

                posteos.forEach( unPost => {
                    postsAMostrar.push(
                        {
                            id: unPost.id,
                            datos: unPost.data()
                        }
                    )
                })

                this.setState({
                    listaPost: postsAMostrar
                })
            }
        )
    }

    render(){
        return(
            <Text>Profile</Text>
        )
    }
}

export default Profile;