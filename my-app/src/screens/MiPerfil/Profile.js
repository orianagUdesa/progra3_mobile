import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { auth, db } from '../../firebase/Config';
import PostEnProfile from '../PostEnProfile/PostEnProfile';


class Profile extends Component {
    constructor(){
        super()
        this.state={
            userPost: [],
            users: [],
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
                    userPost: postsAMostrar
                })
            }
        )
    }

    logout(){
        auth.signOut()
        .then(() => {
            this.props.navigation.navigate('Login')
            console.log(auth.currentUser.email);
        })
        .catch(e => {console.log(e)})
    }

    render(){
        return(
            <View style={styles.contenedorPrin}>
            <Text style={styles.title}>Profile</Text>
            <View>
            <Text>Email:{auth.currentUser.email}</Text>
            <FlatList 
                    data= {this.state.users}
                    keyExtractor={ user => user.id }
                    renderItem={ ({item}) => <Text>Username: {item.data.userName}</Text> }
                />
            </View>
            <Text>My posts</Text>

            {
                this.state.userPost.length === 0
                ?
                <Text>Cargando...</Text>
                :
                <FlatList 
                        data= {this.state.userPost}
                        keyExtractor={ unPost => unPost.id }
                        renderItem={ ({item}) => <PostEnProfile infoPost = { item } /> }  /*hay que hacerlo renderizar */
                    />
            }
    
            <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
            </TouchableOpacity>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 'medium',
    },
    contenedorPrin: {
        flex: 1,
        borderRadius: 6,
        marginHorizontal: 20,
        marginVertical: 5
    }
})

export default Profile;